
var allTracks = [];
var reccTracks = [];
var moodsInfoTracks = [];
var alterTracks = [];
var idIndex = {};
var trackIdsString = "";
var access_token = sessionStorage.getItem("access_token");

var trackValence = {};
var trackDance = {};
var trackEnergy = {};

var happyTracks = [];
var neutralTracks = [];
var sadTracks = [];
var angryTracks = [];

var audio_features = [];
var inOrder = [];
var user = sessionStorage.getItem("user");

var happyURI = "";
var sadURI = "";
var neutralURI = "";
var angryURI = "";

window.addEventListener("load", () => {
    main();
    getUserId();
   
})

const main = () => {

     $.ajax({
        url: 'https://api.spotify.com/v1/me/top/tracks?limit=100&time_range=medium_term',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success:  (response) => {
             
            const res = response.items;
            console.log(res);
            allTracks = res;
            moodsInfoTracks = res;    
            assignIdsNumber(res);
        
        },
        error: () => {
            console.log("error :");
        }
    })
}

const assignIdsNumber = (tracks) => {
    
    for(let i = 0; i < tracks.length; i++)
    {  
      idIndex[tracks[i].id] = i; 
      trackIdsString += String(tracks[i].id);
      trackIdsString += ",";

    }
    assignMoodsFeature(allTracks);
}


const assignMoodsFeature  = (allTracks) => {
   
    
        $.ajax({
            url: 'https://api.spotify.com/v1/audio-features?ids='+ encodeURIComponent(trackIdsString),
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
          
            success: (response) => {
                const res = response.audio_features;
                //audio_features = JSON.parse(res);
                sessionStorage.setItem("audio_features", JSON.stringify(res));
               
            },
            error: () => {
                console.log("error fetching audio_features!");
            }
            })

        if(sessionStorage.getItem("audio_features") != undefined)
        {
            audio_features = JSON.parse(sessionStorage.getItem("audio_features"));
               
            for(let i = 0; i < audio_features.length; i++)
            {
                trackDance[i] = (audio_features[i].danceability);
                trackValence[i] = (audio_features[i].valence);
                trackEnergy[i] = (audio_features[i].energy);
            }
                 console.log(audio_features);
                 for(let i = 0; i < allTracks.length; i++)
                 console.log(trackValence[i], trackDance[i], trackEnergy[i]);
        }
       
            //trackValence[]
        //  console.log(idIndex[allTracks[i].id]);

          getUsersMoods();
           
    
}

const categorizeTracks = () => {
    
    for(let i = 0; i < allTracks.length; i++)
    {
        if(trackValence[i] > 0.6 && trackEnergy[i] > 0.3)
        happyTracks.push(segregate(allTracks[i])), happyURI += String(allTracks[i].id) + ",";
        else if(trackValence[i] < 0.3 && trackEnergy[i] < 0.6)
        sadTracks.push(segregate(allTracks[i])), sadURI += String(allTracks[i].id) + ",";
        else if(trackEnergy[i] > 0.8 || trackValence[i] > 0.3 && trackDance[i] > 0.75)
        angryTracks.push(segregate(allTracks[i])), angryURI += String(allTracks[i].id) + ",";
        else
        neutralTracks.push(segregate(allTracks[i])), neutralURI += String(allTracks[i].id) + ",";
    }
}

const arr = [];
const getUsersMoods = () => {
    const userMoods = JSON.parse(sessionStorage.getItem("detections"));
    console.log(userMoods);
    categorizeTracks();
    // for(let i = 0; i < happyTracks.length; i++)
    // {
    //     console.log(happyTracks[i]);
    // }
    if(userMoods.angry)
    arr.push(userMoods.angry);
    if(userMoods.sad)
    arr.push(userMoods.sad);
    if(userMoods.neutral)
    arr.push(userMoods.neutral);
    if(userMoods.happy)
    arr.push(userMoods.happy);
    arr.sort((a, b) => b - a);
    console.log(arr);
    inOrder.push([angryTracks, getNumber(userMoods.angry), "angry"]);
    inOrder.push([happyTracks, getNumber(userMoods.happy), "happy"]);
    inOrder.push([neutralTracks, getNumber(userMoods.neutral), "neutral"]);
    inOrder.push([sadTracks, getNumber(userMoods.sad), "sad"]);
    inOrder.sort((a, b) => a[1] - b[1]);
   // console.log(angryTracks.length);
    console.log(inOrder);
   setSongsList(inOrder);
   console.log(happyURI);
   setMoodsReport();
  
    
}

const segregate = (track) => {
    
    const res = {};
    res['image'] = track.album.images[2];
    res['name'] = track.name;
    res['artists'] = track.album.artists;
    res['id'] = track.id;
   // console.log(res);
    return res;

}

const getNumber = (num) => {
      
    for(let i = 0; i < arr.length; i++)
    {
        if(Math.round(arr[i]) == Math.round(num))
        return i;
    }
}


//---------------DOM part------------//

$reccList = document.querySelector(".songs-list");
$moodsReport = document.querySelector(".mood-report");
$savePlaylistButton = document.querySelector(".save-playlist-button");

//-----------------------------------//


const notValid = (mood) => {
   
    if(mood == 'fearful' || mood == 'disgusted' || mood == 'surprised')
    return true;
    return false;
}
const setMoodsReport = () => {

    const userMoods = JSON.parse(sessionStorage.getItem("detections"));
    const list = document.createElement("ul");
   

    if(userMoods)
    {   
        const list = document.createElement("ul");
        
        for(moods in userMoods)
        {   
            if(notValid(moods))
            continue;
            const liElement = document.createElement("li");
            liElement.innerHTML = `${moods} : ${userMoods[moods]}`;
            list.append(liElement);
            
        }
        $moodsReport.append(list);
    }
}
const setSongsList = (inOrder) => {

    for(let i = 0; i < inOrder.length; i++)
    {
        const curr = inOrder[i][0];

        for(let i = 0; i < curr.length; i++)
        {  
            const child = document.createElement("li");
            child.innerHTML = `${curr[i].name}`;
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", curr[i].image.url);
            child.appendChild(imgElement);
            $reccList.append(child);
        }
    }
}


const getUserId = () => {

    $.ajax({
        url: 'https://api.spotify.com/v1/me/',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
           console.log(response);
           user = response;
           sessionStorage.setItem("user", user);
         
           
        }
    })
   
}

var first = true;
$savePlaylistButton.addEventListener("click", () => {
    
    if(user && first)
    {
        saveAsPlaylist();
        first = false;
    }
    else
    alert("There is an error please try again!");
})
const saveAsPlaylist = () => {

    $.ajax({
        type: 'POST',
        url: 'https://api.spotify.com/v1/users/' + encodeURIComponent(user.id) + '/playlists',
        data: JSON.stringify({
            "name": "2 playlist demo", 
            "description": "demo playlist",
  
         }),
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json'
        },
        success: function(result) {
          console.log('Woo! :)');
          console.log(result);
         
         addHappyTracks(result);
          
        },
        error: function() {
          console.log('Error! :(');
        }
      })
}


// const addHappyTracks = (playlist) => {

//     $.ajax({
//         type: 'POST',
//         url: 'https://api.spotify.com/v1/playlists/' + encodeURIComponent(playlist.id) + '/tracks?uris=' + happyURI,
//         headers: {
//           'Authorization': 'Bearer ' + access_token,
//           'Content-Type': 'application/json'
//         },
//         success: function(result) {
//           console.log('Woo! :)');
//           //showSnackbar();
//         },
//         error: function() {
//           console.log('Error! :(');
//         }
//       })
  
// }

var id = '1fZSEDgHomhPmiDk1cyV2n';
function addHappyTracks(playlist){
    $.ajax({
        type: 'POST',
        url: 'https://api.spotify.com/v1/playlists/' + encodeURIComponent(playlist.id) + '/tracks?uris=spotify:track:' + id ,
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json'
        },
        success: function(result) {
          console.log('Woo! :)');
          //showSnackbar();
        },
        error: function() {
          console.log('Error! :(');
        }
      })
}
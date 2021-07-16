
// var access_token;

window.addEventListener("load", (function() { 

    console.log("ready");

    // const urlParams = new URLSearchParams(window.location.search);
    const s = window.location.hash.substr(1);
    console.log(s.split);
    const access_hash = window.location.hash.substr(1).split('&');
     console.log(access_hash);
    var key = {};
    // access_token = access_hash.substr(access_hash.search(/(?<=^|&)access_token=/))
    //               .split('&')[0]
    //               .split('=')[1];

    for (i=0; i<access_hash.length; i++) {
        var tmp = access_hash[i].split('=');
        key[tmp[0]] = tmp[1];
      }
       
    // console.log(key['access_token']);
    // console.log("hello");
    access_token = key['access_token'];
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem("login", true);
    window.location.href = "http://localhost:3000/newPage";
}));
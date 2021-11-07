

const video = document.querySelector("#video")

const body = document.querySelector("body");


// buttons
const $onOff = document.querySelector(".onbutton");
const $detectmyface = document.querySelector(".detectmyface");
const $capture = document.querySelector(".capture");
// const $fileToUpload = document.querySelector(".fileToUpload");
const $go = document.querySelector(".go");
// const $uploadbutton = document.querySelector(".uploadbutton");
// const $form = document.querySelector("#form");

var firstTime = true;

window.addEventListener("load", () => {
  if(sessionStorage.getItem("login"))
  {
    $go.innerHTML = "Recommend Songs";
  }
  else
  $go.innerHTML = "Get Mood Report";

  
})
// $form.addEventListener("submit", (e) => {
//   e.preventDefault();
// })
// $uploadbutton.addEventListener("click", (e) => {
//   const files = e.target.$fileToUpload;

//   console.log(files);
// })
var yes = false;


$go.addEventListener("click", () => {
  if(sessionStorage.getItem("login") && yes)
  location.href = "/detection";
  else if(yes)
  {
    location.href = "/moodReport";
  }
  else 
  {
    alert("Your face is not detected yet!");
  }
  
})

$onOff.addEventListener("click", () => {
  
  captured = (captured) ? false : true;

  if(video.paused)
  {
    video.play();
    video.poster = "placeholder.jpg";
  }
  else{
  //  video.load();
    video.pause();
    
    video.poster = "placeholder.jpg";
  }
   
    
})
var capture = false;
$capture.addEventListener("click", () => {
   
  var canva = document.createElement("canvas");
  canva.width = 1000;
  canva.height = 1000;

  var ctx = canva.getContext("2d");
  ctx.drawImage(video, 0, 0);

  var dataURL = canva.toDataURL("image/png");
  

  if(dataURL)
  {
    video.poster = dataURL;
    video.pause();
    localStorage.setItem("userImage", dataURL);
    captured = true;
   // dataURL = null;
  }
  
  console.log(dataURL);

})
var detectionOn = false;

$detectmyface.addEventListener("click", () => {
   detectionOn = detectionOn ? false : true;
})
const startVideo = function(){
    navigator.getUserMedia({ video: {}}, (stream) => video.srcObject = stream, err => console.log(err))
}


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
]).then(startVideo);

var canvas = null;


const main = () => {
  video.addEventListener('play', () => {
          
    if(firstTime)
    {
      canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      firstTime = false;
    }
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    if(detections.length > 0)
    { 
      video.classList.remove("border-red");
      video.classList.add("border-blue");
    }
    else
    { 
      video.classList.remove("border-blue");
      video.classList.add("border-red");
    }
    
    console.log(detections.length);
    if(detectionOn)
    { 
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }
    else{
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
   
     console.log(detections);
     const d = JSON.stringify(detections[0].expressions);
     if(d)
     sessionStorage.setItem("detections", d), yes = true;
     else 
     d = false;
   
    }
  , 100)
})


}

main();





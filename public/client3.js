const body = document.querySelector("body");
const userImage = localStorage.getItem("userImage");
const image = document.createElement("img");
const imgWrapper = document.querySelector(".image-section");

if(!userImage)
{
    image.setAttribute("src", "placeholder.jpg");
    imgWrapper.append(image);
}
else{

    const imageSrc = userImage;
    image.setAttribute("src", imageSrc);
    image.setAttribute("height", "300px");
    image.setAttribute("width", "300px");
   // body.append(image);
    imgWrapper.append(image);
    localStorage.removeItem("userImage");
}

// Promise.all([

//     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),

// ]).then(main);

// const $img = document.querySelector("img");
// var firstTime = true;

// const main = () => {

//     if(firstTime)
//     {
//       canvas = faceapi.createCanvasFromMedia($img);
//       document.body.append(canvas);
//       firstTime = false;
//     }
//     const displaySize = { width: $img.width, height: $img.height };
//     faceapi.matchDimensions(canvas, displaySize);
//     const detections = await faceapi.detectAllFaces($img, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
//     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); 
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
// }



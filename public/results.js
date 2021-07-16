
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    // faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
]).then(init);

const init = () => {
  //setInterval(func, 100);
  func();
}
var canvas = null;
const func = () => {
    
     
    document.querySelector(".image").addEventListener('load', () => {
          
       
      canvas = faceapi.createCanvasFromMedia($img);
      document.body.append(canvas);
        
      const displaySize = { width: $img.width, height: $img.height };
      faceapi.matchDimensions(canvas, displaySize);
      // setInterval(async () => {
        
        const detections = await faceapi.detectAllFaces($img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // if(detectionOn)
        // { 
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        //}
       
        console.log(detections);
        console.log("Hello");
      //   }     
      // , 100) 
    });
}

const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const upload = multer();
app.set('view engine', 'ejs');
app.use(express.static("public"));

const publicPath = __dirname + "/public";
app.get("/", (req, res) => {
    res.render(publicPath + "./index.html");
})
app.post("/upload", upload.single("fileToUpload"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body); 
     const fileBuffer = req.file.buffer.toString("base64");
    // console.log(fileBuffer);
     req.fileBuffer = fileBuffer;
     const imageSrc = 'data:image/jpeg;base64,' + fileBuffer;
    // res.send("results.html");
    // res.send(imageSrc);
   //  res.send("done");
     
     res.render("./results.ejs", {imageSrc});
    // res.redirect("/results.ejs", {imageSrc});
   
 });
 
app.post("/convert", (req, res) => {
  console.log(req.body);
  res.send("done");
})
app.get("/app", (req, res) => {
  res.sendFile("./app.html", {root: publicPath});
})
app.get("/callback", (req, res) => {
  res.sendFile("./callback.html", {root: publicPath});
})
app.get("/newPage", (req, res) => {
    
  res.sendFile("./newPage.html", {root: publicPath});
})
app.get("/detection", (req, res) => {
  res.sendFile("./detectionPage.html", {root: publicPath});

})
app.listen(3000, () => {
    //console.log(newPagePath);
    console.log("server is up and running on port 3000");
   
})
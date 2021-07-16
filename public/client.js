
const $redirectButton = document.querySelector(".only__moods");


// window.addEventListener("load", () => {
//     var prev = "red";
//     setInterval(() => {
        
//         $h1.style.color = prev;
//         if(prev == "red")
//         prev = "blue";
//         else
//         prev = "red";
//     }, 100);
// });

// window.addEventListener("load", () => {
//     console.log("hello");
//     const s = "https://accounts.spotify.com/authorize?client_id=cde538bfe1454a9b9cd59f0a872e65f0&redirect_uri=https:%2F%2Fmoooodify.com%2Fcallback.html%3F&scope=user-top-read%20playlist-modify-public&response_type=token&state=123"
//     console.log(s.hash.substr(1).split('&'));
// })
$redirectButton.addEventListener("click", () => {
    location.href = "http://localhost:3000/newPage";
})
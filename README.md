# MoodifyMe
...


## Description:

#### Moodify as the name suggets is a project that involves mood, this web application detects user's mood via the use of [face-api.js]() and maps the user's mood to the 50 songs user have listened to in the recent times using [spotify-web-api](https://developer.spotify.com/documentation/web-api/) and sorts the songs in the order of decreasing dominating moods.


## Features: 

- Detection of user's mood.
- Face-landmarks detection.
- Mood Report.
- Sorts songs on the basis of moods.
- Saves user's image instance in session storage and canvas api.
- User's can save the current playlist in their spotify applications after logging in.


## Demo:

![](deo.gif)



### Tech Used:

- `FrontEnd:` HTML, CSS, Javascript, Ajax, Jquery
- `BackEnd:` Node.js, Express.js
- `Apis:` [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html), [spotify-web-api](https://developer.spotify.com/documentation/web-api/), (HTMLCanvasApi)[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API]


### How to setup project locally:

- Clone this Repo.
- Once downloaded locally, open the folder and in terminal type this command: `npm install` to install all the dependencies.
- After doing the above step, type the following command: `npm run dev` to get the application started at `http//:localhost:3000`.



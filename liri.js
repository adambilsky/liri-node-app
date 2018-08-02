require('dotenv').config();
var fs = require("fs");

// The following should satisfy instruction #9 = "access keys information"
fs.readFile("keys.js", "utf8", function(error,data) {
    if (error) {
        return console.log(error);
      }
      var keysArr = data.split(",");

      // We will then print the contents of data
      console.log(data);
    //   console.log(keysArr);
    
});

// var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var request = require("request"); 
var spotify = new Spotify(
    {
  id: "c52b0418f12a41c881124f86c978ea5b",
  secret: "eefd1f85179b465eab1ce4bad1aa3c94"
  });
  var spotifyQuery = "";
 

var command = process.argv[2];

function myTweets() {

}

function spotifyThis () {
    spotify.search({ 
        type: 'track', 
        query: spotifyQuery 
    }, 
        function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          console.log(data); 
        });
    
}

function movieThis () {

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        console.log(data);
        // spotifyQuery = data;
        spotifyThis();
    })
}
if (command === "my-tweets") {

}
else if(command === "spotify-this-song") {

}
else if(command === "movie-this") {
    // must parse the below command out with specifics and process.argv 
    // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

}
else if(command === "do-what-it-says") {
    doWhatItSays();
}
else {
    console.log("Please enter a valid command.")
}
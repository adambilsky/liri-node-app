
// Step 8
require('dotenv').config();
var fs = require("fs");
var keysArr = [];

// Step 9 = "access keys information"
var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log(client);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

function myTweets() {

}

function spotifyThis() {
    spotifyQuery = process.argv[3]
    spotify.search({
        type: 'track',
        query: term
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data, null, 2));
            console.log("Song name: ", spotifyQuery);
            console.log("Artist: ", data.tracks.items[3].artists[0].name);
            console.log("Link: ", data.tracks.items[3].preview_url);
            console.log("Album: ", data.tracks.items[3].name);

        });

}

function movieThis() {

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        spotifyQuery = dataArr[1];
        spotifyThis();
    })
}

switch (command) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please enter a valid command.")
}
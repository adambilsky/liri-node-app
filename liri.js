var request = require("request");
// Step 8
require('dotenv').config();
var fs = require("fs");

// Step 9 = "access keys information"
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// take in the command
var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
var separator = "-----------";

console.log(term);

function myTweets() {
    if(term === ""){
        term = "boot_sky";
    }
    var params = { screen_name: term };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            // console.log(response);
            var tweetNum = tweets.length;
            var showTweet = []

            if (tweetNum < 20) {
                for (i = 0; i < tweetNum; i++) {
                    showTweet.push(
                        "Date: " + tweets[i].created_at,
                        "Text: " + tweets[i].text
                    );
                    // console.log(showTweet);
                }
            }
            else {
                for (i = 0; i < 20; i++) {
                    showTweet.push(
                        "Date: " + tweets[i].created_at,
                        "Text: " + tweets[i].text
                    );
                    // console.log(showTweet);
                }
            };
            console.log(command + " " + term + "\n" + separator);
            fs.appendFile("log.txt", command + " " + term + "\n" + separator, function (err) {
                if (err) throw err;
              });
            for (a = 0; a < showTweet.length; a++){
                console.log(showTweet[a] + "\n")
                fs.appendFile("log.txt", showTweet[a] + "\n", function (err) {
                    if (err) throw err;
                  });
    
            }

        }
    });
};

function spotifyThis() {
    spotify.search({
        type: 'track',
        query: term
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var returnItem = data.tracks.items[3];
            var showSong = [
                separator,
                "Song name: " + term,
                "Artist: " + returnItem.artists[0].name,
                "Link: " + returnItem.preview_url,
                "Album: " + returnItem.name
            ].join("\n");
            console.log(showSong);
            fs.appendFile("log.txt", "\n" + command + " " + term + "\n" + separator + showSong, function (err) {
                if (err) throw err;
              });

        });

}

function movieThis() {
    var request = require("request");
    if (term === ""){
        term = "Mr.+Nobody";
    }
    request("http://www.omdbapi.com/?t=" + term + "&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // console.log(body);
            var jsonData = JSON.parse(body);
            var showData = [
                separator,
                "Title: " + jsonData.Title,
                "Release Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Languages,
                "Plot Summary: " + jsonData.Plot,
                "Cast: " + jsonData.Actors
            ].join("\n\n");
            console.log(showData);
            fs.appendFile("log.txt", separator + "\n" + command + " " + term + "\n" + showData + "\n", function (err) {
                if (err) throw err;
              });

            // console.log(jsonData);
        }
        else {
            console.log("We're sorry, please try with a different title.")
        }
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var randomArray = data.split(",");
        term = randomArray[1];
        console.log(term);
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
require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

var axios = require('axios');

var fs = require('fs'); // used to read the random.txt file required functions.
var command = process.argv[2]; //send commands to switch arguments.
var value = process.argv[3]; //send BIT functions 

switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

var divider = "\n---------------------------------------------------------------------\n";

//--------------------------------------CONCERT THIS/BANDS IN TOWN-------------------------------

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=609dd5528abc9aa7755ea693f5e8fde9")
        .then(function (response) {
            console.log(response.data)

            for (var i = 0; i < response.data.length; i++) {

                var dateTime = response.data[i].dateTime;
                var dataArr = dateTime.splice([1]);

                var concertResults =



                    "\nVenue Name:" + response.data[1].venue.name +
                    "\nVenue location:" + response.data[1].venue.location +
                    "\nDate of Concert:" + moment(dataArr[0], "MM-DD-YYYY")
                console.log(concertResults)

            }
        })

        .catch(function (error) {
            console.log(error);
        });

}
//------------------------------------SPOTIFY-------------------
function spotifySong(value) {
    if(!value){
        value = "I want it that way";
    }
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 8; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    
                    
            console.log(spotifyResults);
        }
    })
}
    

//---------------------------MOVIE THIS-----------------------


function movieThis(value) {
    if(!value){
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);

    })

    .catch(function (error) {
        console.log(error);
    })
}
//---------------------------DO THIS-------------------
function doThis(value) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.splice([i]);
        spotifySong(dataArr[0], dataArr[1]);
    })
}
    

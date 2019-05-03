require("dotenv").config();

var keys = require("./keys.js");
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

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=trilogy")
    .then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            
        }
    })
}
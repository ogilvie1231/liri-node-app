require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require('fs');

var input = process.argv[2];
var topic = process.argv.slice(3).join(' ');
console.log('topic: ', topic);

function takeInput(command) {
    if (command === 'concert-this') {
        concertSearch(topic);
    } else if (command === 'spotify-this-song') {
        spotifySearch(topic);
    } else if (command === 'movie-this') {
        movieSearch(topic);
    } else {
        doWhatItSays();
    }

};

takeInput(input);

function concertSearch(artistName) {
    var bandSearch = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    axios.get(bandSearch)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
};

function spotifySearch(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });
};

function movieSearch(movieName) {
    var movieURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    axios.get(movieURL)
        .then(function(response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error)
        });
};

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            return console.log(error)
        }
        console.log(data)
        spotifySearch(data.split(',')[1])
    });
};
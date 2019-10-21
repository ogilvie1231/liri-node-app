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
            // log the name of the venue
            // log venue location
            // log the date of the show
            // use moment to format the date in MM/DD/YYYY
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
        // log the artist
        // log the song name
        // log a preview link
        // log the album
        // create a default if no song is returned
    });
};

function movieSearch(movieName) {
    var movieURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    axios.get(movieURL)
        .then(function(response) {
            console.log(response.data)
                // log movie title
                // log year released 
                // log the imdb ratings
                // log the rotten tomato ratings
                // log the country where the movie was made 
                // log the movie language
                // log the plot
                // log the actors
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
// *BONUS*
// us fs append to put the returned information into a file titled log.txt
// log the command as well

// *readme* create a visually stunning readme with gifs that show all functionallity
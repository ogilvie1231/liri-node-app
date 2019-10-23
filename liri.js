require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');

var input = process.argv[2];
var topic = process.argv.slice(3).join(' ');
console.log('topic: ', topic);

function takeInput(command) {
    if (command === 'concert-this') {
        // concertSearch(topic);
        // if (topic === '') {
        //     concertSearch('queen')
        // } else {
        concertSearch(topic);
        // }
    } else if (command === 'spotify-this-song') {
        if (topic === '') {
            spotifySearch('the sign by ace of base')
        } else {
            spotifySearch(topic);
        }
    } else if (command === 'movie-this') {
        if (topic === '') {
            movieSearch('Mr.Nobody')
            console.log('if you have not watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>')
        } else
            movieSearch(topic);
    } else {
        doWhatItSays();
    }

};

takeInput(input);

function concertSearch(artistName) {
    var bandSearch = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    axios.get(bandSearch)
        .then(function(data) {
            console.log(data)
                // // log the name of the venue
                // console.log('Venue: ', response.data[0].venue.name)
                //     // log venue location
                // console.log('Location: ', response.data[0].venue.city + ', ' + response.data[0].venue.region)
                //     // log the date of the show
                // console.log('Date: ', moment(response.data[0].datetime).format('MM/DD/YYYY'));
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
        // log the artist
        console.log('Artist Name: ', data.tracks.items[0].album.artists[0].name)
            // log the song name
        console.log('Song Title: ', data.tracks.items[0].name)
            // log a preview link -- if preview link is null, log 'This song has no preview
        if (data.tracks.items[0].preview_url === null) {
            console.log('Preview URL: This song has no preview')
        } else {
            console.log('Song Preview: ', data.tracks.items[0].preview_url);
        }
        // log the album
        console.log('Album: ', data.tracks.items[0].album.name)
            // create a default if no song is returned
    });
};

function movieSearch(movieName) {
    var movieURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    axios.get(movieURL)
        .then(function(response) {
            // log movie title
            console.log('Movie title: ', response.data.Title)
                // log year released 
            console.log('Year Released: ', response.data.Year)
                // log the imdb ratings
            console.log('IMDB Rating: ', response.data.Ratings[0].Value)
                // log the rotten tomato ratings
            console.log('Rotten Tomatoes Rating: ', response.data.Ratings[1].Value)
                // log the country where the movie was made 
            console.log('Country: ', response.data.Country)
                // log the movie language
            console.log('Movie Language: ', response.data.Language)
                // log the plot
            console.log('Plot: ', response.data.Plot)
                // log the actors
            console.log('Actors: ', response.data.Actors)
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
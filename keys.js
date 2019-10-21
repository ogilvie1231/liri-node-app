console.log('this is loaded');

module.exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

console.log(this.spotify.id)
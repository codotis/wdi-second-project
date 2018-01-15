const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = 'mongodb://localhost/wdi-second-project';
mongoose.connect(dbURI);

const Track = require('../models/track');

Track.collection.drop();

Track
  .create([{
    artist: 'Octavian',
    title: 'Party Here',
    image: 'https://media.pitchfork.com/photos/5a4d04807b99d20aa3c4a365/1:1/w_500/octavian%20party%20here.jpg',
    review: 'Over a minimal, bass-heavy beat that nods subtly toward garage and dancehall, Octavian holds court with a delivery that bridges grime’s hardscrabble tone with the melodic, half-sung style of U.S. pop rap. His voice cracks as he reaches for notes, but this only adds to his everyman charm. '
  },{
    artist: 'Archy Marshall',
    title: 'Buffed Sky',
    image: 'http://netstorage.metrolyrics.com/albums/2016/08/1153466jpg.jpg',
    review: 'Marshall\'s own words are haunting but elusive, ripples moving across the surface of his music that dissipate before your ear focuses on their meaning. But you get a peek into a mind state and a mood with every legible phrase'
  },{
    artist: 'Rex Orange County',
    title: 'Edition',
    image: 'https://images-na.ssl-images-amazon.com/images/I/31lVGCcUxaL._SS500.jpg',
    review: 'Enter Rex Orange County. With his excellent 2017 album Apricot Princess and contributions to Tyler, The Creator\'s new album fresh in our minds, he\'s back with a new song that showcases his emotional depth and honest songwriting. Over somber piano chords, he sings of a crumbling relationship in a charmingly relatable way: "I understand you had a bad day and shit / So I say something dumb as fuck."'
  },{
    artist: 'Eliza',
    title: 'Wasn\'t Looking',
    image: 'https://i1.sndcdn.com/artworks-000246990060-txy93t-t500x500.jpg',
    review: 'Pinned by a funk-filled bassline, ELIZA\'s soaring vocal glides all over the plodding instrumental, equal parts seductive and soothing.'
  },{
    artist: 'HEX',
    title: 'Limitless',
    image: 'https://i1.sndcdn.com/artworks-000213078414-viwso8-t500x500.jpg',
    review: 'Hex\'s fluid style crosses genre boundaries over soft strings and 808s. With the video also a slick merger between gritty/dark and slick/clean, Hex appears to have streamlined his style into a neat package at such an early stage of his career.'
  }])
  .then((track) => {
    console.log(`${track.length} new singles created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });

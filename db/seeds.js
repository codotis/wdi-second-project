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
    link: 'dz7eyvAMOpA',
    blip: 'Over a minimal, bass-heavy beat that nods subtly toward garage and dancehall, Octavian holds court with a delivery that bridges grime’s hardscrabble tone with the melodic, half-sung style of U.S. pop rap. His voice cracks as he reaches for notes, but this only adds to his everyman charm. '
  },{
    artist: 'Archy Marshall',
    title: 'Buffed Sky',
    link: 'm_WtEHz0PHI',
    blip: 'Marshall\'s own words are haunting but elusive, ripples moving across the surface of his music that dissipate before your ear focuses on their meaning. But you get a peek into a mind state and a mood with every legible phrase'
  },{
    artist: 'Rex Orange County',
    title: 'Edition',
    link: '8ECLpFVE5pE',
    blip: 'Enter Rex Orange County. With his excellent 2017 album Apricot Princess and contributions to Tyler, The Creator\'s new album fresh in our minds, he\'s back with a new song that showcases his emotional depth and honest songwriting. Over somber piano chords, he sings of a crumbling relationship in a charmingly relatable way: "I understand you had a bad day and shit / So I say something dumb as fuck."'
  },{
    artist: 'Eliza',
    title: 'Wasn\'t Looking',
    link: '0nplzEY0IXA',
    blip: 'Pinned by a funk-filled bassline, ELIZA\'s soaring vocal glides all over the plodding instrumental, equal parts seductive and soothing.'
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

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const Track = require('../models/track');
const User = require('../models/user');

Track.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'Otis',
    email: 'otisvickersgraver@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'Life',
    email: 'life@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'Hacker123',
    email: 'hacker@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Track
      .create([{
        artist: 'Octavian',
        title: 'Party Here',
        link: 'dz7eyvAMOpA',
        blip: 'Over a minimal, bass-heavy beat that nods subtly toward garage and dancehall, Octavian holds court with a delivery that bridges grime’s hardscrabble tone with the melodic, half-sung style of U.S. pop rap. His voice cracks as he reaches for notes, but this only adds to his everyman charm. ',
        createdBy: users[0]
      },{
        artist: 'Archy Marshall',
        title: 'Buffed Sky',
        link: 'm_WtEHz0PHI',
        blip: 'Marshall\'s own words are haunting but elusive, ripples moving across the surface of his music that dissipate before your ear focuses on their meaning. But you get a peek into a mind state and a mood with every legible phrase',
        createdBy: users[1]
      },{
        artist: 'Rex Orange County',
        title: 'Edition',
        link: '8ECLpFVE5pE',
        blip: 'Enter Rex Orange County. With his excellent 2017 album Apricot Princess and contributions to Tyler, The Creator\'s new album fresh in our minds, he\'s back with a new song that showcases his emotional depth and honest songwriting. Over somber piano chords, he sings of a crumbling relationship in a charmingly relatable way: "I understand you had a bad day and shit / So I say something dumb as fuck."',
        createdBy: users[2]
      },{
        artist: 'Eliza',
        title: 'Wasn\'t Looking',
        link: '0nplzEY0IXA',
        blip: 'Pinned by a funk-filled bassline, ELIZA\'s soaring vocal glides all over the plodding instrumental, equal parts seductive and soothing.',
        createdBy: users[2]
      },{
        artist: 'James Vincent McMorrow',
        title: 'Rising Water (A.K. Paul Remix)',
        link: 'QvZT6RLSWKs',
        blip: 'A.K. Paul, the reclusive-but-not-in-comparison-to-brother-Jai producer, has remixed James Vincent McMorrow\'s "Rising Water".',
        createdBy: users[0]
      },{
        artist: 'LION BABE (ft. Moe Moks)',
        title: 'Rockets',
        link: 'QaLdSfZ10WA',
        blip: 'For a track about being happy and self-confident in your own style and personality, this really couldn’t have been matched with a better duo and Lion Babe do seem to set thier own style path and follow it, daring us to come along.',
        createdBy: users[1]
      },{
        artist: 'Jadu Heart (ft. Mura Masa)',
        title: 'U Never Call Me',
        link: 'Tn1uf-HU5U4',
        blip: 'After racking up starry collabs with A$AP Rocky, Charli XCX and Damon Albarn on his debut album, Mura Masa – AKA Guernsey-born production polymath Alex Crossan – pays it forward with Jadu Heart, the masked duo signed to his own label. The resulting team-up is a deluxe tiramisu of accusatory whisperpop that, in the early running at least, seems to incorporate a squeaky toy into its seductive cosmic tropicalia.',
        createdBy: users[2]
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

  });

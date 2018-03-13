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
  },{
    username: 'Robotduck112',
    email: 'robot@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Track
      .create([{
        artist: 'J Dilla (ft. Common & D\'Angelo)',
        title: 'So Far To Go',
        link: 'AdZK0HeYkwM',
        blip: 'Dillatronic',
        createdBy: users[0]
      },{
        artist: 'Slum Village',
        title: 'Fall In Love',
        link: 's732BigTxZk',
        blip: 'FANTASTIC',
        createdBy: users[0]
      },{
        artist: 'Nina Simone',
        title: 'Sinnerman',
        link: 'QH3Fx41Jpl4',
        blip: 'What\'s the matter with you, rock?',
        createdBy: users[1]
      },{
        artist: 'Erykah Badu',
        title: 'Other Side Of The Game',
        link: '3qpyDUfMq-8',
        blip: 'Pretty smooth if I say so myself',
        createdBy: users[2]
      },{
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
        artist: 'LION BABE (ft. Moe Moks)',
        title: 'Rockets',
        link: 'QaLdSfZ10WA',
        blip: 'In a world full of chaos it’s a breath of fresh air to hear harmonious vocals, over a 70’s bassline, and hip-hop influenced chants.Lion Babe just released their new single titled Rockets featuring Moe Moks, and it is everything I love about the feel-good duo. The beat is a perfect vibe setter, mellow and fresh with vocals from Jillian taking us on a ride through the sky.',
        createdBy: users[3]
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
        artist: 'Finn Foxell',
        title: 'Buddha',
        link: 'BvMbfiugraI',
        blip: 'wavey.',
        createdBy: users[1]
      },{
        artist: 'Jadu Heart (ft. Mura Masa)',
        title: 'U Never Call Me',
        link: 'Tn1uf-HU5U4',
        blip: 'After racking up starry collabs with A$AP Rocky, Charli XCX and Damon Albarn on his debut album, Mura Masa – AKA Guernsey-born production polymath Alex Crossan – pays it forward with Jadu Heart, the masked duo signed to his own label. The resulting team-up is a deluxe tiramisu of accusatory whisperpop that, in the early running at least, seems to incorporate a squeaky toy into its seductive cosmic tropicalia.',
        createdBy: users[2]
      },{
        artist: 'Cosmo Pyke',
        title: 'Chronic Sunshine',
        link: 'iOSSAQPt-Ro',
        blip: 'Half slinking lift jazz, and half velvet-edged croon, Cosmo Pyke’s latest is a smoothly inventive slice of chameleon-shifting sunshine.',
        createdBy: users[3]
      },{
        artist: 'A.K. Paul',
        title: 'Be Honest',
        link: 'H7ccAWPBwyc',
        blip: 'Rare',
        createdBy: users[3]
      },{
        artist: 'HEX',
        title: 'Gene Kelly',
        link: 'oBT29qICFDA',
        blip: 'In this climate where fusion of music styles is becoming more and more prominent Hex manages to remain unique. In Gene Kelly there’s almost afro-swing vibes akin to the likes of a Yxng Bane, Kojo Funds or Not3s.',
        createdBy: users[3]
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

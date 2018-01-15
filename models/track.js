const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  blip: { type: String, required: true }
});

module.exports = mongoose.model('Track', trackSchema);

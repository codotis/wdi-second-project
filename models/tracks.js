const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  Artist: { type: String, required: true },
  Track: { type: String, required: true },
  Link: { type: String, required: true },
  Blip: { type: String, required: true },
  Mood: String
});

module.exports = mongoose.model('Track', trackSchema);

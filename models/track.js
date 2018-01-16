const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});


const trackSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  blip: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [ commentSchema ]
});



trackSchema.methods.belongsTo = function belongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Track', trackSchema);


// , required: true

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var todoSchema = new Schema({
  text: {
    type: String,
    default: ''
  },
});

var userSchema = new Schema({
  text: {
    type: String,
    default: ''
  },
  todo:[todoSchema]
});

module.exports = mongoose.model('user',userSchema);

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var GameSchema = new Schema({
  gameName : {
    type : String, required: true, trim: true
  },
  gameDesc : {
    type : String, required: true, trim: true
  },
  date : {
    type : Date, required: false, trim: true
  },
  score : {
    type : Number, required: false
  },
  cost : {
    type : Number, required: false
  },
  id : {
    type : Number, required: true, unique: true
  },
  pic : {
    type : String, required: false, trim: true
  },
  genre :{
    type :String
  }

});

GameSchema.index({ id: 1, type: 1 }); // schema level

// I make sure this is the last pre-save middleware (just in case)
GameSchema.pre('save', function(next) {
  var doc = this;
  // Calculate the next id on new Customers only.
  if (this.isNew) {
    doc.id = Math.floor(Math.random() * 1000000) + 1 ; // substract 1 because I need the 'current' sequence number, not the next
    next();
  } else {
    next();
  }
});

exports.GameSchema = GameSchema;
module.exports = mongoose.model('Game', GameSchema);

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var GameReviewSchema = new Schema({
  title : {
    type : String, required: true, trim: true
  },
  gameName : {
    type : String, required: true, trim: true
  },
  score : {
    type : Number, min: 0, max: 100
  },
  content : {
    type : String
  },
  userId : {
    type : Number
  },
  id : {
    type : Number, required: true, unique: true
  },
  date : {
    type : String
  }
});

GameReviewSchema.index({ id: 1, type: 1 }); // schema level

GameReviewSchema.pre('save', function(next) {
  var doc = this;
  // Calculate the next id on new Customers only.
  if (this.isNew) {
    doc.id = Math.floor(Math.random() * 1000000) + 1 ;
    next();
  } else {
    next();
  }
});

exports.GameSchema = GameReviewSchema;
module.exports = mongoose.model('GameReview', GameReviewSchema);

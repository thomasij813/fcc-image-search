var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
  search_term: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', SearchSchema);

var Search = require('../search.js');

exports.saveSearch = function(req, res) {
  var searchDoc = new Search({ search_term: req.params.searchTerm});
  searchDoc.save(function(err, savedSearchDoc) {
    if (err)
      res.send(err);
    else
      res.json(savedSearchDoc);
  });
};

exports.getLatestSearches = function(req, res) {
  Search.find().limit(10).sort({ created_at: -1}).exec(function(err, results) {
    if (err)
      res.send(err);
    else
      res.json(results);
  });
};

exports.deleteAll = function(req, res) {
  Search.remove({}, function() {
    res.send('All documents have been deleted from the db.');
  });
};

exports.count = function(req, res) {
    Search.count({}, function(err, results) {
      if (err)
        res.send(err);
      else
        res.json({ count: results});
    });
};

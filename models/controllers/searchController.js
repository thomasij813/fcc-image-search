var Search = require('../search.js');
var Bing = require('node-bing-api')({ accKey: process.env.BING_KEY });

exports.saveSearch = function(req, res) {
  var offset = req.query.offset || 0;
  var searchDoc = new Search({ search_term: req.params.searchTerm});
  searchDoc.save(function(err, savedSearchDoc) {
    if (err)
      res.send(err);
    else
      bingSearch(req, res, offset);
  });
};

exports.getLatestSearches = function(req, res) {
  Search.find().limit(10).sort({ created_at: -1}).exec(function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.json(results.map(function(searchObj) {
          return {term: searchObj.search_term, when: searchObj.created_at};
      }));
    }
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

function bingSearch(req, res, offset) {
  Bing.images(req.params.searchTerm, {top: 10, skip: offset}, function(err, apiRes, body) {
    if (err){
      res.send(err);
    } else {
      var results = body.d.results;
      res.json(
        results.map(function(searchObj) {
          return {
            url: searchObj.MediaUrl,
            snippet: searchObj.Title,
            thumbnail: searchObj.Thumbnail.MediaUrl,
            context: searchObj.SourceUrl
          };
        })
      );
    }
  });
}

var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ purpose: 'Will return index view' });
});

router.get('/latest', function(req, res) {
  res.json({ purpose: 'Will return the latest image searches' });
});

router.get('/:searchItem', function(req, res) {
  res.json({
    purpose: 'Will return the results of a Bing image search using <' +
              req.params.searchItem + '> as the search parameter'
  });
});

module.exports = router;

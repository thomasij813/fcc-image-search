var express = require('express');
var searchController = require('../models/controllers/searchController.js');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ purpose: 'Will return index view' });
});

router.get('/latest', searchController.getLatestSearches);

router.get('/deleteAll', searchController.deleteAll);

router.get('/count', searchController.count);

router.get('/search/:searchTerm', searchController.saveSearch);

module.exports = router;

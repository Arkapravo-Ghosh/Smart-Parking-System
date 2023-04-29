var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Smart Parking System API', messagex: 'Send a GET Request to /api to fetch data', author: 'Arkapravo Ghosh' });
});

module.exports = router;

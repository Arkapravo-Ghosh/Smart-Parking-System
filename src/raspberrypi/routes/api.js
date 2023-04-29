var express = require('express');
var router = express.Router();
var fs = require('fs');
var rateLimit = require("express-rate-limit");

// Define the rate limiter options
const limiter = rateLimit({
  windowMs: 100, // 0.1 seconds
  max: 10 // limit each IP to 10 requests per windowMs
});

/* GET data. */
router.get('/', limiter, function (req, res, next) {
  var data = fs.readFileSync('/tmp/sps-data.json');
  res.json(JSON.parse(data));
});

module.exports = router;

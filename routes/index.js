var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ga', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('WOOTS');
});

module.exports = router;

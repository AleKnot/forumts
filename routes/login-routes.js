var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource - Login');
  res.render("login-view\\login")
});

module.exports = router;
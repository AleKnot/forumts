var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/listar', function(req, res, next) {
  // res.send('respond with a resource - Login');
  res.render(".\\thread-view\\listar-threads")
});

router.get('/cadastrar', function(req, res, next) {
    // res.send('respond with a resource - Login');
    res.render(".\\thread-view\\cadastrar-thread")
  });

module.exports = router;
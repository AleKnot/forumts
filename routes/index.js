var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const usuario = req.session.sessaoUsuario;

  res.render('index', { title: 'Express', usuario });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const loginController = require('../Controller/login-controller')

//middleware para verificar se está logado
// module.exports = function (req, res, next) {
//   if (req.session.usuario) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// };

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render("login-view\\login")
});

router.post("/", async (req, res, next) => {
  const { usuario, senha } = req.body;

  try {
  const usuarioEncontrado = await loginController.efetuarLogin({ usuario, senha });
  
  //cria a sessão com o usuário encontrado
  req.session.sessaoUsuario = usuarioEncontrado;
    
  // res.render("index", {message: 'Login aceito - Bien Venido!'});

  res.redirect("/");
  
  } catch (error) {

    res.render("login-view\\login", {message: error.message})
  }

});

router.post("/logout", function (req, res, next) {
  const { session } = req;

  delete session.userId;

  res.redirect("/");
});

module.exports = router;

//middleware para verificar se está logado
module.exports = function (req, res, next) {
  if (req.session.sessaoUsuario) {
    next();
  } else {
    res.redirect("/");
  }
};
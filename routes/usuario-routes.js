const express = require('express');
const router = express.Router();
const usuariosController = require('../Controller/usuario-controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource - Usuários');
});

/* GET listar usuario listing. */
router.get('/listar', async (req, res, next) => {
  // res.send('respond with a resource - Usuários');

  const usuarios = await usuariosController.listarTodos();
 
  res.render('usuario-view\\listar-usuarios', { usuarios })
});

/* GET listar usuario listing. */
router.get('/cadastrar', async (req, res, next) => {
  console.log('Cadastrar GET >>>>>>')
  // const editar = false;
  const usuarios = {
    // nome:"B",usuario:"B", email:"B@B.com.br", senha:"BBB", data_nascimento:"1987-12-22",foto:"BBB"
    nome:"",usuario:"", email:"", senha:"", data_nascimento:"",foto:""


  }
  console.log('testeee')
  // res.send('respond with a resource - Usuários');

  res.render('usuario-view\\cadastrar-usuario',{editar:false,usuarios})
});



/* POST cadastrar usuario listing. */
router.post('/cadastrar', async (req, res) => {

  const { nome, usuario, email, senha, data_nascimento,foto} = req.body;

  const now = new Date;
  const data_cadastro = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() ;

  console.log('Data cadastro >>>>' + data_cadastro);

  console.log(nome + ' ' + usuario + ' ' + email + ' ' + senha + ' ' + data_nascimento + ' ' + data_cadastro + ' ' + foto )

  await usuariosController.cadastrarUsuario({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });

  console.log('Chegou no Routes - Usuários!!')
  res.redirect("/usuario/listar");
  // res.render('usuario-view\\listar-usuarios')

});


router.get('/editar/:idusuario', async (req, res, next) => {

  const { idusuario } = req.params;
  
  console.log('ID USUARIO >>> ' + idusuario);

  const usuarios = await usuariosController.buscarUsuarioPorId(idusuario);

  res.render('usuario-view\\cadastrar-usuario', {editar:true,usuarios})
  // res.redirect('usuario-view\\cadastrar-usuario', {editar:true,usuarios})
  
});


router.post('/alterar/:idusuario', async (req, res) => {

  const { idusuario } = req.params;

  const { nome, usuario, email, senha, data_nascimento,foto} = req.body;

  console.log('EDTAR ID USUARIO >>> ' + idusuario);
  console.log('USUARIO NOMEEE >>> ' + nome);

   await usuariosController.atualizarUsuario({idusuario, nome, usuario, email, senha, data_nascimento, foto });

   const usuarios = await usuariosController.buscarUsuarioPorId(idusuario);
  
  usuarios.forEach(usuario => {
  console.log(usuario)
  });

  res.render('usuario-view\\listar-usuario')
  // res.redirect("/usuario/listar");
  
});



/* GET Deletar usuario listing. */
router.get('/deletar/:idusuario', async (req, res, next) => {

  const { idusuario } = req.params;

  console.log('ID USUARIO >>>' + idusuario);

  await usuariosController.deletarUsuario(idusuario);

  const usuarios = await usuariosController.listarTodos();

  res.render('usuario-view\\listar-usuarios', {usuarios})
  // res.send('respond with a resource - Usuários');
  
});

module.exports = router;


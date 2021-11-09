const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment= require('moment') 


const bcryptjs = require("bcryptjs");

const usuariosController = require('../Controller/usuario-controller');
const loginController = require('../Controller/login-controller')
const validarLogin = require('../Middleware/validar-login');

router.use(validarLogin);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'imagens-uploaded/')
  },
  filename: function (req, file, cb) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.mimetype.split('/')[1];
     

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = require('crypto')
          .randomBytes(8)
          .toString('hex');

          const nomeArquivoCompleto = novoNomeArquivo + '.' + extensaoArquivo;

      // Indica o novo nome do arquivo:
      cb(null, nomeArquivoCompleto)
  }
});
const upload = multer({storage});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource - Usuários');
});

/* GET listar usuario listing. */
router.get('/listar', async (req, res, next) => {
  
  //pegar a sessão ativa do ususario
 
  const usuarios = await usuariosController.listarTodos();

  const message = ''
 
  res.render('usuario-view\\listar-usuarios', { message, usuarios })
});

// ------------------------------------------------------------------------------------------------------------------------
router.get('/cadastrar', async (req, res, next) => {
  console.log('Cadastrar GET >>>>>>')
  
  res.render('usuario-view\\cadastrar-usuario')

});

// ------------------------------------------------------------------------------------------------------------------------

/* POST cadastrar usuario listing. */
router.post('/cadastrar', upload.single('foto') , async (req, res) => {

  let { nome, usuario, email, senha, data_nascimento} = req.body;

  const senhaCrua = senha;

  senha = bcryptjs.hashSync(senha)
  
  const  data_cadastro = moment().format('L');

  //salvar o caminho completo para a foto
  const foto = req.file.filename;

  console.log('Mime Type >>>>' + req.file.mimetype);
  
  console.log('Data cadastro >>>>' + data_cadastro);
  console.log(nome + ' - ' + usuario + ' - ' + email + ' - ' + senha + ' - ' + data_nascimento + ' - ' + data_cadastro + ' - ' + foto )
  
  await usuariosController.cadastrarUsuario({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });
  console.log('Chegou no Routes - Usuários!!')

  res.redirect("/login");

});

// ------------------------------------------------------------------------------------------------------------------------

router.get('/editar/:idusuario', async (req, res, next) => {

  const { idusuario } = req.params;
  
  console.log(' get ID USUARIO >>>  ' + idusuario);

  const usuarios = await usuariosController.buscarUsuarioPorId(idusuario);

  res.render('usuario-view\\editar-usuario', {usuarios})
  // res.redirect('usuario-view\\cadastrar-usuario', {editar:true,usuarios})
  
});

// ------------------------------------------------------------------------------------------------------------------------


  router.post('/editar', upload.single('foto') , async (req, res) => {

  const {idusuario, nome, usuario, email, senha, data_nascimento} = req.body;

  console.log('Mime Type >>>>' + req.file.mimetype);

  const foto = req.file.filename;

  console.log(idusuario + ' ' + nome + ' ' +   usuario + ' ' +   email + ' ' +   senha + ' ' +   data_nascimento + ' ' +  foto )

  console.log(' postss ID USUARIO >>>  ' + idusuario);

  await usuariosController.atualizarUsuarioPorId({idusuario, nome, usuario, email, senha, data_nascimento, foto });

  const usuarios = await usuariosController.listarTodos();

  const message = 'Usuário atualizado com sucesso!!!'
  
  // res.render("usuario-view\\listar-usuario");
  // res.redirect("/usuario/listar");
  res.render('usuario-view\\listar-usuarios', { message,usuarios })


});


// ------------------------------------------------------------------------------------------------------------------------

/* GET Deletar usuario listing. */
router.get('/deletar/:idusuario', async (req, res, next) => {

  const { idusuario } = req.params;

  await usuariosController.deletarUsuario(idusuario);

  const usuarios = await usuariosController.listarTodos();

  // res.render('usuario-view\\listar-usuarios', {usuarios})
  // res.send('respond with a resource - Usuários');
  res.redirect("/usuario/listar");
  
});


// ------------------------------------------------------------------------------------------------------------------------

router.post('/pesquisar', async (req, res, next) => {

  console.log('entrou no search +++++++')
  const { keyword } = req.body;
  console.log('entrou no search +++++++ >> ' + keyword)
  
  // console.log(' get ID USUARIO >>>  ' + campo);

  const usuarios = await usuariosController.buscarTodosUsuarios(keyword);

  const message = 'Usuário Encontrado'

  if(usuarios.lenght == 0 ){
    message = 'Usuário não encontrado';
  }

  res.render('usuario-view\\listar-usuarios', { message,usuarios })
  // res.render('usuario-view\\listar-usuario', {usuarios})
  // res.redirect('usuario-view\\listar-usuarios', {usuarios})
  // res.redirect("/usuario/listar", { message,usuarios });
});





module.exports = router;


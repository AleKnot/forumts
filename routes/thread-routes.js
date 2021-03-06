var express = require('express');
var router = express.Router();
const moment= require('moment');
const multer = require('multer');
const threadsController = require('../Controller/thread-controller');
const likeController = require('../Controller/like-controller');
const comentarioController = require('../Controller/comentario-controller');
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


router.get('/listar', async (req, res, next) => {

  // const threads = await threadsController.listarTodosComLike();
  const threads = await threadsController.listarTodos();

  console.log(threads)

  threads.forEach(element => {
    const idthread = element.idthread
    console.log(idthread)
  });

  const message = ''


  res.render(".\\thread-view\\listar-threads",{message, threads})

});

router.get('/cadastrar', function(req, res, next) {

  const usuario = req.session.sessaoUsuario;
    // res.send('respond with a resource - Login');
    // res.render('index', { title: 'Express', usuario });
    res.render(".\\thread-view\\cadastrar-thread", { title: 'Express Cadastrar Thread Title Paramiter!', usuario });
  });


router.post('/cadastrar', upload.single('foto') , async (req, res) =>{
  //({ titulo, assunto, descricao,foto, data_criacao, idusuario })

  const { titulo, assunto, descricao} = req.body;

  const data_criacao = moment().format('L');

  //salvar o caminho completo para a foto
  const foto = req.file.filename;
  
  console.log('Data criacao >>>> ' + data_criacao);

  const usuario = req.session;

  const idusuario = usuario.sessaoUsuario.idusuario;

  console.log(titulo + ' - ' + assunto + ' - ' + descricao + ' - ' +  data_criacao + ' - ' + foto + ' - ' + idusuario)

  await threadsController.cadastrarThread({ titulo, assunto, foto, descricao, idusuario, data_criacao });

  console.log('Chegou no Routes - Thread!!')

  const message = 'Thread cadastrada com sucesso do usuário ' + usuario.sessaoUsuario.nome; 
  res.render(".\\thread-view\\cadastrar-thread",{message})
});

router.get('/like/:idthread', async (req, res) => {

  const { idthread } = req.params;

  const usuarioDaSessao = req.session;
  const idusuario = usuarioDaSessao.sessaoUsuario.idusuario;
  
  const like = 1;
 
  const data_like = moment().format('YYYY-MM-DD hh:mm:ss');

  await likeController.cadastrarLike({like, data_like, idusuario, idthread});

  const message = 'Like Like Like That! idusuário: '+ idthread

  // res.redirect("/thread/listar")
  // res.render(".\\thread-view\\listar-thread",{message})
  res.redirect("/thread/comentarios/"+idthread)

  
});


router.get('/dislike/:idthread', async (req, res) => {

  const { idthread } = req.params;

  const usuarioDaSessao = req.session;
  const idusuario = usuarioDaSessao.sessaoUsuario.idusuario;
  
  const like = 2;
 
  const data_like = moment().format('YYYY-MM-DD hh:mm:ss');

  await likeController.cadastrarLike({like, data_like, idusuario, idthread});

  
  res.redirect("/thread/listar")
  // res.render(".\\thread-view\\listar-thread",{message})
  
});



router.get('/comentarios/:idthread', async (req, res) => {

  const { idthread } = req.params;

  // console.log('entrou no comentários id da thred >>>> ' + idthread );

  // const message = ('entrou no comentários id da thred >>>> ' + idthread );
  const message = null;

  
  const threads = await threadsController.buscarThreadPorId(idthread);

  const comentarios = await comentarioController.buscarComentarioPorThreadId(idthread);

  const likes = await likeController.buscarLikePorThreadId(idthread);

  console.log('LIKES COUNT ____------>>>>>>> '+likes);

  // console.log(threads)

  res.render(".\\thread-view\\thread-coment-thread",{message, threads,likes, comentarios})

});

router.post('/comentarios/adicionar', async (req, res) => {

  const { idthread, texto } = req.body;

  const usuarioDaSessao = req.session;
  const idusuario = usuarioDaSessao.sessaoUsuario.idusuario;
 
  const message = ('entrou no comentários id da thred >>>> ' + idthread );

  const data_comentario = moment().format('YYYY-MM-DD hh:mm:ss');

  await comentarioController.cadastrarComentario({texto, data_comentario, idthread, idusuario})
  
  // res.redirect("/thread/listar")
  res.redirect("/thread/comentarios/"+idthread)

});


router.get('/contarComentarios', function(req, res, next) {
  console.log('entrou no contar Thread Router Thread mtf');

  try {
    const contarComentarios = comentarioController.contarTodosComentarios().then(ret_val => {
    
    return res.status(200).json({
      qtd_msg: ret_val
    });
  
   });
    
  } catch (error) {
    return res.status(400).json({
      error: true,
      msg: "Erro na requisição tente novamente!",
    });
  }

 
});


router.get('/contarThreads', function(req, res, next) {
  
  try {
    const contarThreads = threadsController.contarTodasThreads().then(ret_val => {
    
    return res.status(200).json({
      qtd_msg: ret_val
    });
  
   });
    
  } catch (error) {
    return res.status(400).json({
      error: true,
      msg: "Erro na requisição tente novamente!",
    });
  }
 
});

router.get('/buscarlikedathread/:idhreads', function(req, res, next) {

  const param = req.query.idthreadparam;
  
  try {
    const qtdLikeThread = likeController.buscarLikePorThreadId(param).then(ret_val => {
    
    return res.status(200).json({
      qtd_msg: ret_val
    });
  
   });
    
  } catch (error) {
    return res.status(400).json({
      error: true,
      msg: "Erro na requisição tente novamente!",
    });
  }
 
});


module.exports = router;
var express = require('express');
var router = express.Router();
const moment= require('moment') 
const multer = require('multer');
const threadsController = require('../Controller/thread-controller');
const likeController = require('../Controller/like-controller')
const comentarioController = require('../Controller/comentario-controller')



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


module.exports = function (req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect("/");
  }
};

/* GET login listing. */
router.get('/listar', async (req, res, next) => {

  const threads = await threadsController.listarTodos();

  const message = ''
  // res.send('respond with a resource - Login');
  res.render(".\\thread-view\\listar-threads",{message, threads})
});

router.get('/cadastrar', function(req, res, next) {

  const usuario = req.session.sessaoUsuario;
    // res.send('respond with a resource - Login');
    // res.render('index', { title: 'Express', usuario });
    res.render(".\\thread-view\\cadastrar-thread", { title: 'Express Cadastrar Thread Title Paramiter!', usuario });
  });


router.post('/cadastrar', upload.single('foto') , async (req, res) =>{
  //({ titulo, assunto, descricao,foto, data_criacao, usuario_idusuario })

  const { titulo, assunto, descricao} = req.body;

  const data_criacao = moment().format('L');

  //salvar o caminho completo para a foto
  const foto = req.file.filename;
  
  console.log('Data criacao >>>> ' + data_criacao);

  const usuario = req.session;

  const usuario_idusuario = usuario.sessaoUsuario.idusuario;

  console.log(titulo + ' - ' + assunto + ' - ' + descricao + ' - ' +  data_criacao + ' - ' + foto + ' - ' + usuario_idusuario)

  await threadsController.cadastrarThread({ titulo, assunto, foto, descricao, usuario_idusuario, data_criacao });

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

  res.redirect("/thread/listar")
  // res.render(".\\thread-view\\listar-thread",{message})
  
});


router.get('/dislike/:idthread', async (req, res) => {

  const { idthread } = req.params;

  const usuarioDaSessao = req.session;
  const idusuario = usuarioDaSessao.sessaoUsuario.idusuario;
  
  const like = 2;
 
  const data_like = moment().format('YYYY-MM-DD hh:mm:ss');

  await likeController.cadastrarLike({like, data_like, idusuario, idthread});

  const message = 'DisLike DisLike DisLike NOThat! idusuário: '+ idthread

  res.redirect("/thread/listar")
  // res.render(".\\thread-view\\listar-thread",{message})
  
});



router.get('/comentarios/:idthread', async (req, res) => {

  const { idthread } = req.params;

  console.log('entrou no comentários id da thred >>>> ' + idthread );

  const message = ('entrou no comentários id da thred >>>> ' + idthread );
  
  const threads = await threadsController.buscarThreadPorId(idthread);

  const comentarios = await comentarioController.buscarComentarioPorThreadId(idthread);

  const likes = await likeController.buscarLikePorThreadId(idthread,1);

  console.log('LIKES COUNT ____------>>>>>>> '+likes);

  const dislikes = await likeController.buscarLikePorThreadId(idthread,2);

  console.log('LIKES COUNT ____------>>>>>>> '+dislikes);



  res.render(".\\thread-view\\thread-coment-thread",{message, threads,comentarios})

});

router.post('/comentarios/adicionar', async (req, res) => {

  const { idthread, texto } = req.body;

  const usuarioDaSessao = req.session;
  const idusuario = usuarioDaSessao.sessaoUsuario.idusuario;

  console.log('entrou no comentários id da thred >>>> ' + idthread );

  console.log('entrou no comentários e esse é o texto >>>> ' + texto );

  const message = ('entrou no comentários id da thred >>>> ' + idthread );

  const data_comentario = moment().format('YYYY-MM-DD hh:mm:ss');

  // const idusuario = 1

  await comentarioController.cadastrarComentario({texto, data_comentario, idthread, idusuario})

  // const threads = await threadsController.buscarThreadPorId(idthread);

  // res.render(".\\thread-view\\thread-coment-thread",{message, threads})
  // res.redirect("thread/comentarios/"+idthread)
  // res.redirect("thread/comentarios/"+idthread)
  res.redirect("/thread/listar")
  // res.render("\\thread-view\\listar-thread\\")
  // res.render(".\\thread-view\\thread-coment-thread\\"+idthread)


});



module.exports = router;
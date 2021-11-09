var express = require('express');
var router = express.Router();


const threadsController = require('../Controller/thread-controller');
const likeController = require('../Controller/like-controller');
const comentarioController = require('../Controller/comentario-controller');
const usuariosController = require('../Controller/usuario-controller');


router.get('/contarUsuariosFelizes', function(req, res, next) {
  
    try {
      const contarUsuariosFelizes = usuariosController.contarUsuariosFelizes().then(ret_val => {
      
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
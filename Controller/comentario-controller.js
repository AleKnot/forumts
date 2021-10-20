const comentarioModel = require('../models/comentario-model');

exports.cadastrarComentario = ({ texto, data_comentario, idthread, idusuario }) =>
comentarioModel.cadastrarComentario({ texto, data_comentario, idthread, idusuario });

exports.buscarComentarioPorThreadId = (idthread) =>
comentarioModel.buscarComentarioPorThreadId(idthread);

exports.contarTodosComentarios = () => 
comentarioModel.contarTodosComentarios();

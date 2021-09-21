const likeModel = require ('../models/like-model');

exports.listarTodos = () => likeModel.listarTodos();


exports.cadastrarLike = ({ like, data_like, idusuario, idthread }) =>
likeModel.cadastrarLike({ like, data_like, idusuario, idthread });

exports.buscarLikePorThreadId = (idthread, like) => 
likeModel.buscarLikePorThreadId(idthread,like);
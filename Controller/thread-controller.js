const threadModel = require('../models/thread-model');

exports.listarTodos = () => threadModel.listarTodos();


exports.cadastrarThread = ({ titulo, assunto, foto, descricao, usuario_idusuario, data_criacao }) =>
threadModel.cadastrarThread({ titulo, assunto, foto, descricao, usuario_idusuario, data_criacao });

exports.buscarThreadPorId = (idthread) =>
threadModel.buscarThreadPorId(idthread);


const threadModel = require('../models/thread-model');

exports.listarTodos = () => threadModel.listarTodos();

exports.listarTodosComLike = () => threadModel.listarTodosComLike();

exports.cadastrarThread = ({ titulo, assunto, foto, descricao, idusuario, data_criacao }) =>
threadModel.cadastrarThread({ titulo, assunto, foto, descricao, idusuario, data_criacao });

exports.buscarThreadPorId = (idthread) =>
threadModel.buscarThreadPorId(idthread);

exports.contarTodasThreads = () =>
threadModel.contarTodasThreads();


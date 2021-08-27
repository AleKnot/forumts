const usuarioModel = require('../models/usuario-model');

exports.listarTodos = () => usuarioModel.listarTodos();

exports.cadastrarUsuario = ({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) =>
  usuarioModel.cadastrarUsuario({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });

exports.buscarUsuarioPorId = (idusuario) =>
  usuarioModel.buscarUsuarioPorId(idusuario);

exports.atualizarUsuario = ({ id, nome, usuario, email, senha, data_nascimento, data_cadastro }) =>
  usuarioModel.atualizarUsuario({ id, nome, usuario, email, senha, data_nascimento, data_cadastro });

exports.deletarUsuario = (idusuario) => usuarioModel.deletarUsuario(idusuario);
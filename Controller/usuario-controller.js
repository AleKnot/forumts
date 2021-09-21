const usuarioModel = require('../models/usuario-model');

exports.listarTodos = () => usuarioModel.listarTodos();

exports.buscarTodosUsuarios = (keyword) => usuarioModel.buscarTodosUsuarios(keyword);

exports.cadastrarUsuario = ({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) =>
  usuarioModel.cadastrarUsuario({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });

exports.buscarUsuarioPorId = (idusuario) =>
  usuarioModel.buscarUsuarioPorId(idusuario);

  exports.buscarUsuarioPorUsuario = (usuario) => usuarioModel.buscarUsuarioPorUsuario(usuario);

exports.atualizarUsuarioPorId = ({ idusuario, nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) =>
  usuarioModel.atualizarUsuarioPorId({ idusuario, nome, usuario, email, senha, data_nascimento, data_cadastro, foto });

exports.deletarUsuario = (idusuario) => usuarioModel.deletarUsuario(idusuario);

exports.efetuarLogin = (usuario, senha) => usuarioModel.efetuarLogin(usuario, senha);
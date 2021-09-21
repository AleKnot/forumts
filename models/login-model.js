const db = require("../database/models");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");


  exports.efetuarLogin = (usuario, senha) => {
    const usuarioEncontrado = usuariosModel.buscarUsuarioPorUsuario(usuario);

  if (!usuarioEncontrado) {
    throw new Error('Access denied');
  }else {
    console.log('usuario encontrado powww')
  }

  // const { hashed } = usuario;

  // const isValid = bcryptjs.compareSync(senha, hashed);

  // if (!isValid) {
  //   throw new Error('Access denied');
  // }
  
  // const { id, nome } = usuario;
  
  // const ret = { id, nome, email };
  
  // return ret;
  }
const db = require("../database/models");
const { Op } = require("sequelize");


exports.listarTodos = () =>
  db.Usuario.findAll().then((rows) => rows.map((row) => row.dataValues));

exports.cadastrarUsuario = ({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) =>
  db.Usuario.create({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });

  exports.atualizarUsuarioPorId = ({idusuario, nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) => {
    db.Usuario.update(
      {nome, usuario, email, senha, data_nascimento, data_cadastro, foto },
      {where: {idusuario: idusuario}}
    );
  }

exports.buscarUsuarioPorUsuario = (usuario) => 
  db.Usuario.findOne({
    where: {
      usuario
    }
  });

exports.buscarUsuarioPorId = (idusuario) => 
  db.Usuario.findAll({
    where: {
      idusuario
    }
  }).then((rows) => rows.map((row) => row.dataValues));;

  
  exports.buscarTodosUsuarios = (campo) => 
  db.Usuario.findAll({
    where: {
      [Op.or]: [
        {
          idusuario: {
            [Op.like]: '%' +campo + '%'
          }
        },
        {
          nome: {
            [Op.like]: '%' +campo + '%'
          }
        },
        {
          usuario: {
            [Op.like]: '%' +campo + '%'
          }
        },
        {
          email: {
            [Op.like]: '%' +campo + '%'
          }
        },
        {
          data_nascimento: {
            [Op.like]: '%' +campo + '%'
          }
        },
        {
          data_cadastro: {
            [Op.like]: '%' +campo + '%'
          }
        }
      ]
    }
  }).then((rows) => rows.map((row) => row.dataValues));;

exports.deletarUsuario = idusuario => db.Usuario.destroy({
   where: { idusuario }
   });


exports.contarUsuariosFelizes = () =>
  db.Usuario.count({
    where: {
      idusuario: {
        [Op.gt]: 1
      }
    }
  });

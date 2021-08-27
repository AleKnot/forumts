const db = require("../database/models");

exports.listarTodos = () =>
  db.Usuarios.findAll().then((rows) => rows.map((row) => row.dataValues));

exports.cadastrarUsuario = ({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) =>
  db.Usuarios.create({ nome, usuario, email, senha, data_nascimento, data_cadastro, foto });


  // exports.buscarUsuarioPorId = (idusuario) => {
  //   db.Usuarios.findByPk(idusuario).then((rows) => rows.map((row) => row.dataValues));;
  // }

  exports.atualizarUsuarioPorId = ({idusuario, nome, usuario, email, senha, data_nascimento, data_cadastro, foto }) => {
    db.Usuarios.update(
      {idusuario, nome, usuario, email, senha, data_nascimento, data_cadastro, foto },
      {where: {idusuario: idusuario}}

    );
  }


exports.buscarUsuarioPorId = (idusuario) => 
  db.Usuarios.findAll({
    where: {
      idusuario: idusuario
    }
  }).then((rows) => rows.map((row) => row.dataValues));;

// exports.atualizarUsuario = ({ id, nome, sobrenome, email, ano_matricula }) => {
//   db.Usuario.update({ nome, sobrenome, email, ano_matricula }, { where: { id } });
// }

exports.deletarUsuario = idusuario => db.Usuarios.destroy({
   where: { idusuario }
   });

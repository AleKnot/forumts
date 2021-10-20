const db = require("../database/models");
const { Op } = require("sequelize");

exports.cadastrarComentario = ({ texto, data_comentario, idthread, idusuario }) => {
    db.Comentario.create({ texto, data_comentario, idthread, idusuario });
  }

exports.buscarComentarioPorThreadId = (idthread) => 
  db.Comentario.findAll({
    where: {
      idthread
    }
  }).then((rows) => rows.map((row) => row.dataValues));

exports.contarTodosComentarios = () =>
db.Comentario.count({
  where: {
    idcomentario: {
      [Op.gt]: 1
    }
  }
});
const db = require("../database/models");

exports.cadastrarComentario = ({ texto, data_comentario, idthread, idusuario }) => {
    db.Comentario.create({ texto, data_comentario, idthread, idusuario });
  }

exports.buscarComentarioPorThreadId = (idthread) => 
  db.Comentario.findAll({
    where: {
      idthread
    }
  }).then((rows) => rows.map((row) => row.dataValues));;
const db = require("../database/models");

exports.listarTodos = () =>
  db.Thread.findAll({include: 'usuario'});

  exports.cadastrarThread = ({ titulo, assunto, foto, descricao, usuario_idusuario, data_criacao }) => {
    db.Thread.create({ titulo, assunto, foto, descricao, usuario_idusuario, data_criacao });
  }

  exports.buscarThreadPorId = (idthread) => 
  db.Thread.findAll({
    where: {
      idthread
    }
  }).then((rows) => rows.map((row) => row.dataValues));;





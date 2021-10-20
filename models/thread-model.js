const { sequelize } = require("../database/models");
const db = require("../database/models");
const { Op } = require("sequelize");


// exports.listarTodos = () =>
//   db.Thread.findAll({
//     include: [
//       {
//       model : ['usuario','like']
//   }],
//   group : ['like.idthread']
//  });

exports.listarTodos = () =>
  db.Thread.findAll({include: 'usuarioFromThread'}).then((rows) => rows.map((row) => row.dataValues));;;

exports.listarTodosComLike = () =>
  db.Thread.findAll({
    include: [{ 
      model: db.Usuario, as: 'usuarioFromThread'      
      },
      {
        model: db.Like, as: 'likesFromThread', where: {like: 1}
      }
    ]
    // group: ['idthread'],
    // having: sequelize.where(sequelize.fn('count',sequelize.col('idthread')))
  });


  exports.cadastrarThread = ({ titulo, assunto, foto, descricao, idusuario, data_criacao }) => {
    db.Thread.create({ titulo, assunto, foto, descricao, idusuario, data_criacao });
  }

  exports.buscarThreadPorId = (idthread) => 
  db.Thread.findAll({
    where: {
      idthread
    }
  }).then((rows) => rows.map((row) => row.dataValues));

  exports.contarTodasThreads = () =>
  db.Thread.count({
    where: {
      idthread: {
        [Op.gt]: 1
      }
    }
  });





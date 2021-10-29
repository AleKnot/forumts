const { sequelize } = require("../database/models");
const db = require("../database/models");
const { Op } = require("sequelize");

// listar funcionando
// exports.listarTodos = () =>
//   db.Thread.findAll({
     
//       include: 'usuarioFromThread'})
//         .then((rows) => rows.map((row) => row.dataValues));


// no ejs <pre>LIKES: <%=thread.likesFromThread[0].like%></pre>        
// exports.listarTodos = () =>
//   db.Thread.findAll({
//     ,
    
//      include: [{ 
//       model: db.Usuario, as: 'usuarioFromThread'
//       },
//       {
//         model: db.Like, as: 'likesFromThread',
//         attributes : [ 
//           [sequelize.fn("COUNT", sequelize.col("like")), "like"]
//       ]
//     }]
//   }).then((rows) => rows.map((row) => row.dataValues));

// exports.listarTodos = () =>
//   db.Thread.findAll({
    
//   attributes: { 
//       include: [[sequelize.fn("COUNT", sequelize.col("like")), "like"]] 
//   },
//   include: [{
//     model: db.Usuario, as: 'usuarioFromThread',
//     model: db.Like, as: 'likesFromThread',
//   }]
// });

    
exports.listarTodos = () =>
  db.Thread.findAll({
    attributes : {
      include: [[sequelize.fn("COUNT", sequelize.col("likesFromThread.idlike")),'likes']]
    },
    include: [{ 
      model: db.Usuario, as: 'usuarioFromThread'
      },
      {
        model: db.Like,
           as: 'likesFromThread',
            attributes : []
      }],
      group: ['idthread']
  }).then((rows) => rows.map((row) => row.dataValues));


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





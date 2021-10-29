const db = require("../database/models");
const { Op } = require("sequelize");


exports.listarTodos = () =>
     db.Like.findAll();

  exports.cadastrarLike = ({ like, data_like, idusuario, idthread }) =>
    db.Like.create({ like, data_like, idusuario, idthread });

  exports.buscarLikePorThreadId = (idthread) => 
    db.Like.count({
      where: {
        idthread,
        like:1
      }
    });

    exports.buscarDislikePorThreadId = (idthread) => 
    db.Like.count({
      where: {
        idthread,
        like:2
      }
    });
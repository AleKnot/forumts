const db = require("../database/models");
const { Op } = require("sequelize");


exports.listarTodos = () =>
     db.Like.findAll();

  exports.cadastrarLike = ({ like, data_like, idusuario, idthread }) =>
    db.Like.create({ like, data_like, idusuario, idthread });

  exports.buscarLikePorThreadId = (idthread,like) => 
    db.Like.count({
      where: {
        idthread: idthread,
        like: like
      }
    });
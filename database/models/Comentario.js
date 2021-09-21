module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('Comentario', {
      idcomentario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    texto: {type: DataTypes.STRING, allowNull: false},
    data_comentario: { type: DataTypes.DATE, allowNull: false },
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idthread: {type: DataTypes.INTEGER, allowNull: false}
  },    {
    tableName: 'comentarios',
    timestamps: false
  });
  
    return Comentario;
  };
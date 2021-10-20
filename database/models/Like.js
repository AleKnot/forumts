module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      idLike: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_like: { type: DataTypes.DATE, allowNull: false },
    like: {type: DataTypes.INTEGER, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idthread: {type: DataTypes.INTEGER, allowNull: false}
  },    {
    tableName: 'likes',
    timestamps: false
  });

  Like.associate = models => {
    Like.belongsTo(models.Thread, {
        as: 'thread',
        foreignKey: 'idthread'
      })
      Like.belongsTo(models.Usuario, {
        as: 'usuario',
        foreignKey: 'idusuario'
      })
  
    }
  
    return Like;
  };
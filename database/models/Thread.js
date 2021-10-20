module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    idthread: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  assunto: { type: DataTypes.STRING, allowNull: false },
  foto: { type: DataTypes.STRING, allowNull: false },
  descricao: {type: DataTypes.STRING, allowNull: false},
  idusuario: {type: DataTypes.INTEGER, allowNull: false},
  data_criacao: { type: DataTypes.DATE, allowNull: false }
  
},    {
  tableName: 'threads',
  timestamps: false
});

Thread.associate = models => {
  Thread.belongsTo(models.Usuario, {
      as: 'usuarioFromThread',
      foreignKey: 'idusuario'
    });
  
  Thread.hasMany(models.Like, {
    as: 'likesFromThread',
    foreignKey: 'idthread'
  })
    
  }

  return Thread;
};
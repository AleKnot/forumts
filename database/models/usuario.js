module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: { type: DataTypes.STRING, allowNull: false },
    usuario: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
    data_cadastro: { type: DataTypes.DATEONLY, allowNull: false },
    foto: { type: DataTypes.STRING, allowNull: false }
  },    {
    tableName: 'usuarios',
    timestamps: false
})

Usuario.associate = models => {
  Usuario.hasMany(models.Thread, {
      as: 'threads',
      foreignKey: 'idusuario'
    });
  }

  return Usuario;
};
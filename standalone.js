const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const host = 'localhost';
const user = 'root';
const password = '!Aa123456789';
const database = 'forumts';
const dialect = 'mysql';


const run = async () => {
  const conn = await mysql.createConnection({host, user, database, password});
  console.log('rows');

  const [rows, fields] = await conn.query('select * from usuarios');
  console.log(rows);
}

// const run2 = async () => {
//   const sequelize = new Sequelize(database, user, password, { host, dialect });
//   await sequelize.authenticate();

//   const Usuarios = sequelize.define('usuarios', {
//     nome: { type: Sequelize.STRING, allowNull: false },
//     sobrenome: { type: Sequelize.STRING, allowNull: false },
//     email: { type: Sequelize.STRING, allowNull: false },
//     ano_matricula: { type: Sequelize.INTEGER, allowNull: false }
//    }, {
//         timestamps: false
//     });

//   const alunos = await Aluno.findAll();
//   console.log(alunos.map(aluno => aluno.dataValues));

//   await sequelize.close();
// }

run();

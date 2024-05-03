const { MYSQL_DB_CONFIG } = require("../config/db.config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);

  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: "mysql",
    host: HOST,
  });

  db.PlayerInfo = require("../PlayerInfo/PlayerInfo.model")(sequelize);

  await sequelize.sync({ alter: true });
}

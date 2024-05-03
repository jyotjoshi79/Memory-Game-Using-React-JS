const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Rank: { type: DataTypes.INTEGER, allowNull: false },
    PlayerName: { type: DataTypes.STRING, allowNull: false },
    NumberOfTurns: { type: DataTypes.INTEGER, allowNull: false },
  };
  return sequelize.define("player_info", attributes);
}

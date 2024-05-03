const db = require("../helpers/db.helper");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
};

async function getAll() {
  return await db.PlayerInfo.findAll();
}

async function getById(id) {
  return await db.PlayerInfo.findByPk(id);
}

async function create(params) {
  return await db.PlayerInfo.create(params);
}

async function update(id, params) {
  const playerInfo = await db.PlayerInfo.findByPk(id);
  if (!playerInfo) throw 'Player Info not found';
  Object.assign(playerInfo, params);
  await playerInfo.save();
  return playerInfo;
}

async function del(id) {
  const playerInfo = await db.PlayerInfo.findByPk(id);
  if (!playerInfo) throw 'Player Info not found';
  await playerInfo.destroy();
}

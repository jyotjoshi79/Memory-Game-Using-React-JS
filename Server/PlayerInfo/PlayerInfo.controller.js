const playerInfoService = require("../PlayerInfo/PlayerInfo.service");

exports.create = async (req, res, next) => {
  try {
    const playerInfo = await playerInfoService.create(req.body);
    res.status(201).json(playerInfo);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const playerInfos = await playerInfoService.getAll();
    res.json(playerInfos);
  } catch (error) {
    next(error);
  }
};



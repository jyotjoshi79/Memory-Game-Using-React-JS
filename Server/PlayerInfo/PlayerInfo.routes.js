const playerInfoController = require("../PlayerInfo/PlayerInfo.controller");
const express = require("express");
const router = express.Router();

router.post("/", playerInfoController.create);
router.get("/", playerInfoController.getAll);
// Implement other routes similarly

module.exports = router;

const express = require("express");
const playerInfoRoutes = require("./PlayerInfo/PlayerInfo.routes");
const errors = require("./middleware/db.error");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/player-info", playerInfoRoutes);
app.listen(port, () => console.log("Server is running on port", port));

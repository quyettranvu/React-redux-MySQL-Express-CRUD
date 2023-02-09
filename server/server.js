import express from "express";
import cors from "cors";
import db from "./models/index.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

//enable cors with provided option access to front-end
app.use(cors(corsOptions));

//parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Sequelize access
db.sequelize.sync();
/*May use these in development when we want to drop existing table and re-sync database:
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

//Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to quyettranvu application" });
});

import tutorialRoutes from "./routes/tutorialRoute.js";
tutorialRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

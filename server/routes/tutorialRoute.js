import tutorials from "../controllers/tutorialController.js";
import express from "express";

export default (app) => {
  var router = express.Router();

  router.post("/", tutorials.create);
  router.get("/", tutorials.findAll);
  router.get("/published", tutorials.findAllPublished);
  router.get("/:id", tutorials.findOne);
  router.put("/:id", tutorials.update);
  router.delete("/:id", tutorials.deleteOne);
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};

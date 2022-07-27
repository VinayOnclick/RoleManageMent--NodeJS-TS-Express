import * as dotenv from "dotenv";

import * as express from "express";
import * as mongoose from "mongoose";
import bodyParser = require("body-parser");
import UserRouter from "./src/user/router";

export class Server {
  public app: express.Application = express();

  constructor() {
    dotenv.config();

    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.HandleErrors();
  }

  setConfigurations() {
    this.ConnectMongoDB();
    this.Configurations();
  }

  ConnectMongoDB() {
    const url = process.env.MONGODB_URL;
    mongoose.connect(url, () => {
      console.log(`database connected to ${url}`);
    });
  }

  Configurations() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));

 this.app.use(UserRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      console.log("error not found 404");
      res.status(404).json({
        message: "Not Found",
        Status_code: 404,
      });
    });
  }

  HandleErrors() {
    this.app.use((error, req, res, next) => {
      const errorstatus = req.errorStatus || 400;
      console.log(errorstatus);
      res.status(errorstatus).json({
        message: error.message || "Something Went Wrong. Please try Again!",
        status_code: errorstatus,
      });
    });
  }
}

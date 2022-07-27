import { Router } from "express";
import userController from "./controller";
import { GlobalMiddleWare } from "../../middlewares/GlobalMiddleWares";
import upload from "../../middlewares/multer";
class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    this.getRoutes();

    this.patchRoutes();
  }

  postRoutes() {
    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login);
    this.router.post("/upload/:id",userController.upload)
    // this.router.post("/upload1/:id",multer,userController.upload1)

    
  }

  patchRoutes() {
    this.router.patch(
      "/update/:id",
      //GlobalMiddleWare.authenticate,
      GlobalMiddleWare.authenticate,
      userController.updateUser
    );
    this.router.patch("/assign/:id", userController.assignRole);
  }

  getRoutes() {
    this.router.get(
      "/getAll",
      GlobalMiddleWare.authenticate,
     GlobalMiddleWare.grantAccess("readAny", "profile"),
      userController.findUsers
    );
  }
}
export default new UserRouter().router;

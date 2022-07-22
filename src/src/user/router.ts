import { Router } from "express";
import userController from "../../src/user/controller";
import { GlobalMiddleWare } from "../../middlewares/GlobalMiddleWares";

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
  }

  patchRoutes() {
    this.router.patch(
      "/update/:id",
      GlobalMiddleWare.authenticate,
      userController.updateUser
    );
    this.router.patch(
      "/assign/:id",
      userController.assignRole
    );
  }
  getRoutes() {
    this.router.get(
      "/getAll",
      GlobalMiddleWare.authenticate,
      userController.findUsers
    );
  }
}
export default new UserRouter().router;

import User from "./model";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import * as multer from "multer";
export default class userController {
 static async register(req: any, res: any, next: any) {
    const { firstName, lastName, email, password, age, address, phone } =
      req.body;
    console.log(req.body);
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      try {
        const hash = await Bcrypt.hash(password, 10);
        const data = {
          email: email,
          password: hash,
          firstName: firstName,
          lastName: lastName,
          age: age,
          address: address,
          phone: phone,
        };
        const add = await new User(data).save();
        return res.status(200).json({
          message: "REGISTRATION SUCCESSFULL",
          Status_code: 200,
          data: add,
        });
      } catch (error) {
        console.log(error);
        return res.json({
          message: "REGISTRATION FAILED",
        });
      }
    } else {
      res.send({ message: "User Already exists with same email you entered" });
    }
  }

  static async login(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        let result = await Bcrypt.compare(req.body.password, user.password);
        if (!result) {
          console.log("password not matching");
          return res.status(401).json({
            msg: "password matching fail",
          });
        } else {
          const token = Jwt.sign(
            {
              email: user.email,
              _id: user._id,
              role: user.role,
            },
            process.env.SECRET_KEY
          );
          console.log(token);

          return res.json({
            message: "LOGIN SUCCESS",
            Token: token,
          });
        }
      } else {
        return res.status(401).json({
          msg: "email not matched",
        });
      }
    } catch (error) {
      return res.json({
        message: "LOGIN FAILED",
      });
    }
  }

  static async updateUser(req: any, res: any) {
    try {
      // const admin=req.Admin
      // console.log(admin)
      // if(admin){
      const _id = req.params.id;
      const { firstName, lastName, email, age, address, phone } = req.body;
      let user = await User.findOne({ _id });

      if (!user) {
        res.json({ message: "user not found" });
      } else {
        const data = await User.updateOne({_id: _id }, { ...req.body });
        console.log(data, "vinay bawa");
        return res.json({
          message: "Update SUCCESS",
          data: data,
        });
      }
    // }else{
    //     res.send("no permission allowed until unless ypu became an admin")
    //   }
    } catch (error) {
      return res.json({
        message: "Update FAILED",
        data: error,
      });
    }
  }

  static async findUsers(req: any, res: any) {
    try {
      let user = await User.find({});

      if (!user) {
        res.json({ message: "users not found" });
      } else {
        res.json({
          message: "Users Found",
          data: user,
        });
      }
    } catch (error) {
      return res.json({
        message: "Update API FAILED",
        data: error,
      });
    }
  }

  static async assignRole(req: any, res: any) {
    const _id = req.params.id;
    const role = req.body.role;
    try {
      let user = await User.findOne({ _id: _id });
      if (!user) {
        res.json({ message: "users not found" });
      } else {
        const data = await User.findOneAndUpdate({ _id }, { $set: { role } });
        res.json({
          message: "Update API SUCCESS",
          data: data,
        });
      }
    } catch (error) {
      return res.json({
        message: "Update API FAILED",
        data: error,
      });
    }
  }

  static async upload(req, res) {
//middleware
    const _id=req.params.id
    console.log(_id)
    const storage = multer.diskStorage({
      destination: `upload/${_id}/image/${_id}`,
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
  const upload =await multer({ storage: storage }).single("image");
    try {
      const image =await User.updateOne({_id},{$set:{
        image: {
          data: req.file,
          contentType: `image/jpg`,
        },
      }})
      console.log(image,"hahaha")
    return res.json({
        status: 200,
        message: "Success",
   
      });
    } catch (error) {
      console.log(error)
      console.log("api not working")
      return res.send("failed");  
    }
  }

  static async upload1(req, res) {
    try {
      const image = new User({
        image: {
          data: req.file.fieldName,
          contentType: "image/jpg",
        },
      });
      image.save();
      return res.json({
        status: 200,
        message: "Success",
        data: image,
      });
    } catch (error) {
      return res.send("failed");
    }
  }
}

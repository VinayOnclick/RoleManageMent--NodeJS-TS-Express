import * as multer from "multer";
import * as path from 'path'
console.log(path.join(__dirname)+'/upload', 'DDDDDDdir')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../..',`upload/${req.params.id}/image/`))
  },
  filename: function (req, file, cb) {
    console.log('callback------ ', file);
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage }).single("image");

export default upload
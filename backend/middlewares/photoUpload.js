const path = require("path");
const multer = require("multer"); //to upload photos
const { date } = require("joi");

//Photo Storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb is call back function
    cb(null, path.join(__dirname, "../images")); //cb(error: Error | null, destination: string): void
  },
  filename: function (
    req,
    file,
    cb //filename(req: e.Request, file: Express.Multer.File,
  ) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); //cb(error: Error | null, filename: string): void
    } else {
      cb(null, false);
    }
  },
});

//Photo Upload Middleware
const photoUpload = multer({
  storage: photoStorage,
  //filter to upload just photos
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype.startsWith("image/png")||file.mimetype.startsWith("image/jpeg")) {
      //cb(error: null, acceptFile: boolean): void
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("you must upload PNG or JPG photo"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 50, // 1 megaByte
  },
});

module.exports = photoUpload;

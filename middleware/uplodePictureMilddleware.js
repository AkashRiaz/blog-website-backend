import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name using fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now(); // Get a timestamp
      const fileName = `${timestamp}-${file.originalname.replace(/\s/g, '-')}`; // Replace spaces with dashes in the filename
      cb(null, fileName);
    },
  });

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB
  },
  fileFilter: (req, file, cb)=>{
       let ext = path.extname(file.originalname);
       if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
         return cb(new Error("Only images are allowed"))
       }

       cb(null, true)
  }
});

export {uploadPicture}

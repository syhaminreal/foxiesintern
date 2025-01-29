const multer  = require('multer')
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../store")
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname)
    }
  })

   export const upload = multer({ 
    storage,
})


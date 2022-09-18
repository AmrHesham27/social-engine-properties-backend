const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "images")
        },
        filename: function(req,file, cb){
            const myFileName= Date.now()+path.extname(file.originalname)
            cb(null, myFileName)
        }
    })
    const acceptedExtensions = ['.png', '.jpeg', '.jpg', '.PNG', ',JPEG', 'JPG']
    const upload = multer({
        storage,
        limits:{fileSize:1000000},
        fileFilter: function(req,file,cb){
            if( !acceptedExtensions.includes(path.extname(file.originalname)) ) 
                cb(`${path.extname(file.originalname)} extension is not accepted`, null)
            cb(null, true)
        }
    })
    const singleUpload = upload.single("image")
    const manyUploads = upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'gallery', maxCount: 8 }
    ])
    
exports.singleUpload = singleUpload
exports.manyUploads = manyUploads
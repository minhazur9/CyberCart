const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/cybercart",
    options: {
        newUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"]
        const filename = Date.now() + file.originalname
        if (match.indexOf(file.mimetype) === -1) return filename;
        return {
            bucketName: "images",
            filename: filename
        }
    }
})

export const uploadFile = (filename: String) => {
    multer({ storage: storage }).single(filename)
}

// const uploadFile = multer({ storage: storage }).single('file')
// const uploadFilesMiddleware = util.promisify(uploadFile)
const multer = require('multer')
const path = require('path');

const now = Date.now()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        req.body.image = `/images/${now + path.extname(file.originalname)}`
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, now + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

module.exports = {
    upload
}

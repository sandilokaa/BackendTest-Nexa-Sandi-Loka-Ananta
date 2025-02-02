const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('photo');

const convertToBase64 = async (req, res, next) => {
    if (req.file) {
        const buffer = await sharp(req.file.buffer)
            .resize(800) 
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toBuffer();

        req.file.base64 = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
    }
    next();
};

module.exports = { upload, convertToBase64 };
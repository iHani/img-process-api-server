import express, { Request, Response } from 'express';
import multer from 'multer';

const images = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const imageUpload = multer({ storage })
// const imageUpload = multer({
//     dest: 'full',
// });


images.get('/', (req: Request, res: Response) => {
    const { query: { name, h, w } } = req;
    // if (name == null) {
    //     res.send(`Error no file name provided!`);
    // }
    // if (h == null && w == null) {
    //     // send original file 
    //     res.send(`ORIGINAL file name!`);
    // }
    res.send(`img: ${name} h:${h} w:${w}`);
});

images.post('/upload', imageUpload.single('images'), (req, res) => {
    console.log("req.file", req.file);
    res.json('/images/upload api');
});

export default images;

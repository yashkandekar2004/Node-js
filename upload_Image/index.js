// const express = require('express');
// const app = express();
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads');
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage})

// app.get('/', (req, res) => {
//     res.send("Hello world");
// });

// app.post('/api/upload', upload.single('file'), (req, res) => {
//     res.json(req.file);
// })


// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log("Server Has Started on port 3000");
// })









const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Has Started on port 3000");
});

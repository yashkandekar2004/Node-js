const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "sercretKey";
const expectedMobileNumber = "8788457133"; 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({
        message: "a sample api"
    })
});

app.post('/login', (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ result: "Mobile number is required" });
    }

    const user = {
        id: 1,
        name: "Yash",
        email:"kandekaryash@123",
        mobile: mobile
    };

    jwt.sign({ user }, secretKey, { expiresIn: '500s' }, (err, token) => {
        res.json({
            token
        });
    });
});

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: "Invalid Token" });
        } else {
            if (authData.user.mobile === expectedMobileNumber) {
                res.json({
                    message: "Profile accessed",
                    authData
                });
            } else {
                res.send({ result: "Unauthorized: Mobile number does not match" });
            }
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({
            result: 'Token is not valid'
        });
    }
}

app.listen(3000, () => {
    console.log("Server has started on 3000 port");
});

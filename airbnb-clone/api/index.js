const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const downloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const {plugin} = require("mongoose");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'dshfighadladsjlk'

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors({
    origin: 'http://localhost:5173', // 确保与前端 URL 一致
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

app.get('/', function (req, res) {
  res.json('Hello World');
});

app.post("/register", async function(req, res) {
    const{name, email, pwd} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            pwd:bcrypt.hashSync(pwd, bcryptSalt),
        });

        res.json(userDoc);

    } catch(e) {
        res.status(422).json(e);
    }
});

app.post("/login", async function(req, res) {
    const {email, pwd} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const pwdCorrect = bcrypt.compareSync(pwd, userDoc.pwd);
        if (pwdCorrect) {
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
            }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('wrong password');
        }
    } else {
        res.status(404).json('user not found')
    }
});

app.get("/profile", function(req, res) {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(401).json('Invalid token');
            }
            try {
                const {name, email, _id} = await User.findById(userData.id);
                res.json({name, email, _id});
            } catch (err) {
                console.error('User fetching error:', err);
                res.status(500).json('Error fetching user');
            }
        });
    } else {
        res.status(401).json('No token provided');
    }
});


app.post("/logout", function(req, res) {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async function(req, res) {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        await downloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });
        res.json(newName); // 返回文件名
    } catch (err) {
        console.error('Error downloading image:', err);
        res.status(500).json('Error downloading image');
    }
});

const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), function(req, res) {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json('Invalid token');
        }

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photo:addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });

        res.json(placeDoc);
    });

})

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Place.find({owner: id}))
    });
})

app.get('/places/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
    const {token} = req.cookies;
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photo:addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok');
        }
    });

})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/bookings',  async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err;
    })
})

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({user:userData.id}).populate('place'))
})

app.listen(3000);
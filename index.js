import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import chalk from 'chalk';

import {registerValidator, loginValidator, postCreateValidation} from "./validations.js"

import checkAuth from './utils/checkAuth.js'
import checkAdmin from './utils/checkAdmin.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
// import {PostController, UserController} from './controllers/index.js'

import * as PostController from './controllers/PostController.js'
import * as UserController from './controllers/UserController.js'
import * as CallController from './controllers/CallController.js'


const errorMsg = chalk.bgWhite.redBright;
const successMsg = chalk.bgGreen.white;


// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect('mongodb+srv://krutyev6:wwwwww@cluster0.ab7jy0l.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log(successMsg("DB ok")))
.catch((err) => console.log(errorMsg("DB error:", err)))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register)

app.post('/auth/addFavouriteItem', handleValidationErrors, UserController.addFavouriteItem)
app.post('/auth/deleteFavouriteItem', handleValidationErrors, UserController.deleteFavouriteItem)

app.post('/auth/addCart', handleValidationErrors, UserController.addCart)
app.post('/auth/deleteCart', handleValidationErrors, UserController.deleteCart)

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAdmin, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})


app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAdmin , postCreateValidation, PostController.create);
app.delete('/posts/:title', checkAdmin, PostController.remove);
app.patch('/posts/:title', checkAdmin, postCreateValidation, PostController.update);


app.get('/calls', CallController.getAll)
app.post('/calls', CallController.sendCall)


const port = process.env.PORT || 8080

app.listen(port, function(){
    console.log(successMsg("listening port:", port));
  });




import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidator, loginValidator, postCreateValidation} from "./validations.js"

import checkAuth from './utils/checkAuth.js'
import checkAdmin from './utils/checkAdmin.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import cors from 'cors'
// import {PostController, UserController} from './controllers/index.js'

import * as PostController from './controllers/PostController.js'
import * as UserController from './controllers/UserController.js'


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("DB ok"))
.catch((err) => console.log("DB error:", err))

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




app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ2Y2FhYmM0MGRjYzRiMmQ1ODYwOTUiLCJpYXQiOjE3MTU5MTg4MjcsImV4cCI6MTcxODUxMDgyN30.BwBNsS2bkqdB4GWgb_8XLeBM2N9xa6ta6FPL_0WMBMk


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ2ZDcwNWIyNzliY2M5MmNlNzhmNTYiLCJpYXQiOjE3MTU5MTg4ODIsImV4cCI6MTcxODUxMDg4Mn0.nkMZ0OkX-ryngBv2ajfq1DxWS0-dOu26TmA9-kdEQ64
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'

import UserModel from './../models/User.js'

export const register = async (req, res) => {
    try{
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            role: req.body.role || 'user',
            favouriteItems: []
        });

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'secret123',
        {
            expiresIn: "30d",
        },
    )
    
    const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "не удалось зарегестрироваться",
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            if(!isValidPass){
                return res.status(400).json({
                    message: "Неверный логин или пароль"
                })
            }
        }

        const token = jwt.sign(
        {
            _id: user._id, 
        },
        'secret123',
        {
            expiresIn: "30d",
        },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
        ...userData,
        token,
    })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        })
    }
}



export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Нет доступа"
        })
    }
}



export const addFavouriteItem = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const favouriteItem = req.body.favouriteItem; // Получаем новый элемент

        // Используем $addToSet чтобы избежать дублирования
        const result = await UserModel.updateOne(
            { email: userEmail },
            { $addToSet: { favouriteItems: favouriteItem } }
        );

        // Проверяем, был ли обновлен документ
        if (result.nModified === 0) {
            return res.status(404).json({
                message: "не удалось добавить в избранные"
            });
        }

        // Получаем обновленного пользователя без пароля и других незначительных данных
        const user = await UserModel.findOne({ email: userEmail }).select('-passwordHash');

        // Отправляем ответ
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "не удалось добавить в избранные"
        });
    }
}


export const deleteFavouriteItem = async (req, res) => {
    try {
        const item = req.body.favouriteItem;
        const email = req.body.email;
    
        const result = await UserModel.updateOne(
            { email },
            { $pull: { favouriteItems: item } }
        )
        if(result.nModified === 0){
            return res.status(404).json({
                message: "Не удалось добавить в избранные"
            })
        }
    
        const user = await UserModel.findOne({ email }).select("-passwordHash");
    
        res.json(user)   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "не удалось добавить в избранные"
        });
    }

}



export const addCart = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const cartItem = req.body.cartItem; // Получаем новый элемент

        // Используем $addToSet чтобы избежать дублирования
        const result = await UserModel.updateOne(
            { email: userEmail },
            { $addToSet: { cart: cartItem } }
        );

        // Проверяем, был ли обновлен документ
        if (result.nModified === 0) {
            return res.status(404).json({
                message: "не удалось добавить в избранные"
            });
        }

        // Получаем обновленного пользователя без пароля и других незначительных данных
        const user = await UserModel.findOne({ email: userEmail }).select('-passwordHash');

        // Отправляем ответ
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "не удалось добавить в избранные"
        });
    }
}


export const deleteCart = async (req, res) => {
    try {
        const cartItem = req.body.cartItem;
        const email = req.body.email;
    
        const result = await UserModel.updateOne(
            { email },
            { $pull: { cart: cartItem } }
        )
        if(result.nModified === 0){
            return res.status(404).json({
                message: "Не удалось добавить в избранные"
            })
        }
    
        const user = await UserModel.findOne({ email }).select("-passwordHash");
    
        res.json(user)   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "не удалось добавить в избранные"
        });
    }

}
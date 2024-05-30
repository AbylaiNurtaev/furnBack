import { body } from 'express-validator'

export const registerValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
    body('fullName', "Укажите имя").isLength({ min: 3 }),
]


export const loginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
]


export const postCreateValidation = [
    body('title', "Введите название товара").isLength({ min: 5}).isString(),
    body('text', "Введите описание товара").isLength({ min: 10}).isString(),
    body('category', "Введите категорию товара").isLength({ min: 5}).isString(),
    body('price', "Введите ценник товара").optional().isLength({ min: 2}).isString(),
    body('imageUrl_1', "Неверная ссылка на изображение").isString(),
]

// 	"email": "admin01@gmail.ru",
	// "password": "20060903",
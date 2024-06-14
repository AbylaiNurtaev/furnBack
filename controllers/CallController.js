import CallModel from "../models/Call.js"


export const getAll = async (req, res) => {
    try {
        const calls = await CallModel.find();
        res.json(calls)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось загрузить товары"
        })
    }
}

export const sendCall = async(req, res) => {
    try {
        const doc = new CallModel({
            name: req.body.name,
            phone: req.body.phone
        });

        const post = await doc.save();
        res.json(post)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать товар"
        })
    }
}
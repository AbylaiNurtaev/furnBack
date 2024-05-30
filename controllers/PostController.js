import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось загрузить товары"
        })
    }
}

export const remove = async (req, res) => {
    const postTitle = req.params.title;

    try {
        const doc = await PostModel.findOneAndDelete({ title: postTitle });


        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена"
            });
        }

        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось удалить статью"
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            imageUrl1: req.body.imageUrl1,
            imageUrl2: req.body.imageUrl2,
            price: req.body.price,
            category: req.body.category,
            author: req.body.author,
            style: req.body.style,
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

export const update = async (req, res) => {
    try {
        const postTitle = req.params.title;

        await PostModel.updateOne({
            title: postTitle
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            category: req.body.category,
            style: req.body.style,
            author: req.body.author,
        }
    );
    res.json({
        success: true
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось обновить"
        })
    }
}
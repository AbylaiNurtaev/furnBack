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
        const { title, text, images, price, category, author, style, tone } = req.body;

        if (images.length < 3 || images.length > 7) {
            return res.status(400).json({
                message: "Товар должен содержать от 3 до 7 фотографий"
            });
        }

        const doc = new PostModel({
            title,
            text,
            images,
            price,
            category,
            author,
            style,
            tone
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать товар"
        });
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
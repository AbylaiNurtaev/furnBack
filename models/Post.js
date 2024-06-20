import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        default: "В наличии"
    },
    style: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    tone: {
        type: String,
        required: true

    }
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);
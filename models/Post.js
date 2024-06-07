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
    imageUrl: {
        type: String,
        required: true
    },
    imageUrl1: {
        type: String,
        required: true
    },
    imageUrl2: {
        type: String,
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
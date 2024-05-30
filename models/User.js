import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // По умолчанию обычный пользователь
    },
    favouriteItems: {
        type: [String],
        required: true
    },
    cart: {
        type: [String],
        required: true
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);
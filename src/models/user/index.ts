import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    password: {
        type: String,
        reuqired: true,
        trim: true,
        maxlength: 150,
    },
    email: {
        type: String,
        reuqired: true,
        trim: true,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        reuqired: false,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        reuqired: false,
    }
});

const PortfolioModel = mongoose.model("User", userScheme);

export default PortfolioModel;
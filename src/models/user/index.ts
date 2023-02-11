import mongoose, { Date, Document, ObjectId } from "mongoose";

// type
export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null | undefined;
    _id: ObjectId;
}

const userScheme = new mongoose.Schema<IUser>({
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
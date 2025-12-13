import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const userrole = ["user", "admin"];
const UserSchema = new Schema({
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        minlength: [8, "The username must be of atleast characters"],
        unique: [true, "User already exist"]
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters long"],
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        enum: userrole,
        required: true,
    }
}, {
    timestamps: true
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.createToken = async function () {
    return jwt.sign({
        id: this._id,
        role: this.role,
    }, process.env.JWT_SECRET || "SECRETKEY", {
        expiresIn: "7d",
    });
};
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const Register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                message: "User Already Exists",
                success: false
            });
        }
        const User = await UserModel.create({
            username: username,
            email,
            password,
            role,
        });
        const token = await User.createToken();
        return res.status(200).json({
            User,
            token,
            message: "Registration Successful",
            success: true
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User unauthorized",
                success: true
            });
        }
        const userPassword = await bcrypt.compare(user.password, process.env.SECRET_KEY);
        if (!userPassword === password) {
            return res.status(404).json({
                message: "Password is invalid",
                success: false
            });
        }
        const token = await user.createToken();
        return res.status(200).json({
            user,
            success: true,
            message: "Login successfull"
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//# sourceMappingURL=auth.controller.js.map
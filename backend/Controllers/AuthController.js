const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body; // Include userType
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can login', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            userType // Store userType
        });
        await newUser.save();
        res.status(201)
            .json({
                message: "Signup successful",
                success: true
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is incorrect';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, userType: user.userType }, // Include userType in JWT payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                userType: user.userType // Include userType in the response
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

module.exports = {
    signup,
    login
}

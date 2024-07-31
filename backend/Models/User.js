const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {   // New field for user type
        type: String,
        required: true,
        enum: ['student', 'teacher'] // Ensures only 'student' or 'teacher' can be assigned
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;

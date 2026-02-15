import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this';

// DUMMY OTP for testing - always use 1234
const DUMMY_OTP = '1234';
const generateOTP = () => DUMMY_OTP;

// @route   POST /api/auth/send-otp
// @desc    Send OTP to mobile number (Simulated)
router.post('/send-otp', async (req, res) => {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
        return res.status(400).json({ message: 'Invalid mobile number' });
    }

    try {
        let user = await User.findOne({ mobile });

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        if (!user) {
            user = new User({ mobile, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }

        await user.save();

        // SIMULATION: Log OTP to console and send back in response for testing
        console.log(`[OTP SENT] Mobile: ${mobile}, OTP: ${otp}`);

        res.json({
            message: 'OTP sent successfully',
            otp: otp,
            dummyOtp: DUMMY_OTP // Use 1234 for testing
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and return JWT
router.post('/verify-otp', async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).json({ message: 'Mobile and OTP are required' });
    }

    try {
        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, mobile: user.mobile },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                mobile: user.mobile
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

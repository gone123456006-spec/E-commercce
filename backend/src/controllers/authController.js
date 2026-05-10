import User from '../models/User.js';
import { generateOTP, sendOTP } from '../utils/otpService.js';
import { generateToken } from '../utils/tokenService.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, OTP_CONFIG, ADMIN_CONFIG } from '../config/constants.js';

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * @route   POST /api/auth/send-otp
 * @desc    Send OTP to mobile number
 * @access  Public
 */
export const sendOTPController = async (req, res, next) => {
    try {
        const { mobile } = req.body;

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + OTP_CONFIG.EXPIRES_IN_MINUTES * 60 * 1000);

        // Find or create user
        let user = await User.findOne({ mobile });

        if (!user) {
            user = new User({ mobile, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }

        await user.save();

        // Send OTP (simulated — swap with real SMS in production)
        await sendOTP(mobile, otp);

        res.status(HTTP_STATUS.OK).json({
            message: SUCCESS_MESSAGES.OTP_SENT,
            // Never expose real OTP in production; show only in dev/test
            ...(IS_PROD
                ? {}
                : { otp, dummyOtp: OTP_CONFIG.DUMMY_OTP }),
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP and return JWT token
 * @access  Public
 */
export const verifyOTPController = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;

        // Find user
        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: ERROR_MESSAGES.USER_NOT_FOUND,
            });
        }

        // Check OTP expiration first (avoids timing attack)
        if (!user.otpExpires || user.otpExpires < Date.now()) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: ERROR_MESSAGES.OTP_EXPIRED,
            });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: ERROR_MESSAGES.INVALID_OTP,
            });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id, user.mobile);

        res.status(HTTP_STATUS.OK).json({
            message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
            token,
            user: {
                id: user._id,
                mobile: user.mobile,
            },
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/admin-login
 * @desc    Verify admin dashboard password
 * @access  Public
 */
export const adminLoginController = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (password === ADMIN_CONFIG.PASSWORD) {
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: 'Admin login successful'
            });
        }

        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid admin password'
        });

    } catch (error) {
        next(error);
    }
};

import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { HTTP_STATUS, SUCCESS_MESSAGES, ADMIN_CONFIG } from '../config/constants.js';
import { verifyFirebaseIdToken, isFirebaseAdminReady } from '../config/firebaseAdmin.js';

/** Last 10 digits (India +91 flows). */
const last10Digits = (phoneE164) => {
    if (!phoneE164) return null;
    const digits = String(phoneE164).replace(/\D/g, '');
    if (digits.length < 10) return null;
    return digits.slice(-10);
};

/**
 * @route   POST /api/auth/firebase-verify
 * @desc    Verify Firebase Phone Auth ID token, upsert user, return app JWT
 * @access  Public
 */
export const firebaseVerifyController = async (req, res, next) => {
    try {
        if (!isFirebaseAdminReady()) {
            return res.status(503).json({
                message: 'Firebase server auth is not configured (set FIREBASE_SERVICE_ACCOUNT_JSON)',
            });
        }

        const { mobile, idToken } = req.body;
        const decoded = await verifyFirebaseIdToken(idToken);
        const phoneFromToken = decoded.phone_number;
        const mobile10 = last10Digits(phoneFromToken);

        if (!mobile10 || mobile10 !== mobile) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Phone number does not match this login session',
            });
        }

        let user = await User.findOne({ mobile: mobile10 });
        if (!user) {
            user = new User({ mobile: mobile10 });
        }
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id, user.mobile);

        return res.status(HTTP_STATUS.OK).json({
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

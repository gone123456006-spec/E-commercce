import { body, validationResult } from 'express-validator';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * Validation middleware for Firebase phone verify
 */
export const validateFirebaseVerify = [
    body('mobile')
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile number must be exactly 10 digits')
        .isNumeric()
        .withMessage('Mobile number must contain only digits'),

    body('idToken')
        .trim()
        .notEmpty()
        .withMessage('idToken is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: errors.array()[0].msg
            });
        }
        next();
    }
];

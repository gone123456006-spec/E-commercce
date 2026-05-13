import express from 'express';
import { firebaseVerifyController, adminLoginController } from '../controllers/authController.js';
import { validateFirebaseVerify } from '../middleware/validator.js';

const router = express.Router();

/**
 * @route   POST /api/auth/firebase-verify
 * @desc    Verify Firebase Phone Auth token and return app JWT
 * @access  Public
 */
router.post('/firebase-verify', validateFirebaseVerify, firebaseVerifyController);

/**
 * @route   POST /api/auth/admin-login
 * @desc    Verify admin dashboard password
 * @access  Public
 */
router.post('/admin-login', adminLoginController);

export default router;

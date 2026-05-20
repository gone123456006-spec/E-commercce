// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
    INVALID_MOBILE: 'Invalid mobile number',
    MOBILE_OTP_REQUIRED: 'Mobile and OTP are required',
    USER_NOT_FOUND: 'User not found',
    INVALID_OTP: 'Invalid OTP',
    OTP_EXPIRED: 'OTP has expired',
    SERVER_ERROR: 'Server error',
    UNAUTHORIZED: 'Not authorized, token failed',
    NO_TOKEN: 'Not authorized, no token'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful'
};

// JWT Configuration
export const JWT_CONFIG = {
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_change_this'
};

// Admin Configuration
export const ADMIN_CONFIG = {
    PASSWORD: process.env.ADMIN_PASSWORD || 'Ar@v1234'
};

// New dashboard products appear on the public site after this delay (ms)
export const PRODUCT_VISIBILITY_DELAY_MS = 5000;

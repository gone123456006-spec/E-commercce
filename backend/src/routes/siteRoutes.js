import express from 'express';
import {
    getCategoryThumbnails,
    getSiteContent,
    updateCategoryThumbnails,
    updateSiteContent
} from '../controllers/siteController.js';

const router = express.Router();

router.get('/content', getSiteContent);
router.put('/content', updateSiteContent);

// Backward compatibility
router.get('/category-thumbnails', getCategoryThumbnails);
router.put('/category-thumbnails', updateCategoryThumbnails);

export default router;

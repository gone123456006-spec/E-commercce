import SiteSettings from '../models/SiteSettings.js';

const SETTINGS_KEY = 'default';

const normalizeThumbnails = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const next = {};
    for (const [id, url] of Object.entries(value)) {
        if (typeof id === 'string' && typeof url === 'string' && url.trim()) {
            next[id] = url.trim();
        }
    }
    return next;
};

const normalizeBanners = (value) => {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item) => item && typeof item === 'object')
        .map((item, idx) => ({
            id: typeof item.id === 'number' ? item.id : Date.now() + idx,
            src: typeof item.src === 'string' ? item.src.trim() : '',
            link: typeof item.link === 'string' && item.link.trim() ? item.link.trim() : '/'
        }))
        .filter((banner) => banner.src);
};

const normalizeFlashDeals = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return { cards: [], endAt: '' };
    }
    const cards = Array.isArray(value.cards)
        ? value.cards
              .filter((c) => c && typeof c === 'object' && typeof c.productId === 'string' && c.productId.trim())
              .map((c) => ({
                  productId: c.productId.trim(),
                  badgeText: typeof c.badgeText === 'string' ? c.badgeText.trim() : 'Low Stock'
              }))
        : [];
    return {
        cards,
        endAt: typeof value.endAt === 'string' ? value.endAt : ''
    };
};

const normalizeProductCardEdits = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return value;
};

const normalizeCustomCards = (value) => {
    if (!Array.isArray(value)) return [];
    return value.filter((item) => item && typeof item === 'object');
};

const normalizeDeletedIds = (value) => {
    if (!Array.isArray(value)) return [];
    return value.filter((id) => typeof id === 'string' && id.trim()).map((id) => id.trim());
};

function serializeSiteContent(doc) {
    return {
        categoryThumbnails: normalizeThumbnails(doc.categoryThumbnails),
        homepageBanners: normalizeBanners(doc.homepageBanners),
        flashDeals: normalizeFlashDeals(doc.flashDeals),
        productCardEdits: normalizeProductCardEdits(doc.productCardEdits),
        customCards: normalizeCustomCards(doc.customCards),
        deletedProductIds: normalizeDeletedIds(doc.deletedProductIds)
    };
}

async function getOrCreateSettings() {
    let doc = await SiteSettings.findOne({ key: SETTINGS_KEY });
    if (!doc) {
        doc = await SiteSettings.create({ key: SETTINGS_KEY });
    }
    return doc;
}

export const getSiteContent = async (req, res) => {
    try {
        const doc = await getOrCreateSettings();
        res.status(200).json({
            success: true,
            data: serializeSiteContent(doc)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSiteContent = async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const doc = await getOrCreateSettings();

        if (body.categoryThumbnails !== undefined) {
            doc.categoryThumbnails = normalizeThumbnails(body.categoryThumbnails);
        }
        if (body.homepageBanners !== undefined) {
            doc.homepageBanners = normalizeBanners(body.homepageBanners);
        }
        if (body.flashDeals !== undefined) {
            doc.flashDeals = normalizeFlashDeals(body.flashDeals);
        }
        if (body.productCardEdits !== undefined) {
            doc.productCardEdits = normalizeProductCardEdits(body.productCardEdits);
        }
        if (body.customCards !== undefined) {
            doc.customCards = normalizeCustomCards(body.customCards);
        }
        if (body.deletedProductIds !== undefined) {
            doc.deletedProductIds = normalizeDeletedIds(body.deletedProductIds);
        }

        await doc.save();

        res.status(200).json({
            success: true,
            message: 'Site content updated',
            data: serializeSiteContent(doc)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/** @deprecated Use GET /api/site/content */
export const getCategoryThumbnails = async (req, res) => {
    try {
        const doc = await getOrCreateSettings();
        res.status(200).json({
            success: true,
            data: normalizeThumbnails(doc.categoryThumbnails)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/** @deprecated Use PUT /api/site/content */
export const updateCategoryThumbnails = async (req, res) => {
    req.body = { categoryThumbnails: req.body?.thumbnails ?? req.body?.categoryThumbnails };
    return updateSiteContent(req, res);
};

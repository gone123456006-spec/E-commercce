import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            default: 'default'
        },
        categoryThumbnails: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        homepageBanners: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        },
        flashDeals: {
            type: mongoose.Schema.Types.Mixed,
            default: { cards: [], endAt: '' }
        },
        productCardEdits: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        customCards: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        },
        deletedProductIds: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        }
    },
    { timestamps: true }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;

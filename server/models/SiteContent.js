const mongoose = require('../config/mongoose-mock');

const siteContentSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true, 
    unique: true 
  },
  page: { 
    type: String, 
    required: true 
  }, // e.g. "Home", "Contact", "Global"
  label: { 
    type: String, 
    required: true 
  }, // e.g. "Why Choose Us"
  type: { 
    type: String, 
    enum: ['string', 'text', 'json', 'image', 'boolean', 'array'], 
    default: 'string' 
  },
  value: { 
    type: mongoose.Schema.Types.Mixed 
  }, 
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);

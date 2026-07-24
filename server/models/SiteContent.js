const mongoose = require("../config/mongoose-mock");

const siteContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true, // e.g., 'global_settings', 'homepage_sections'
    },
    data: {
      type: Object,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);

const express = require("../config/express-shim");
const router = express.Router();
const { getSiteContent, updateSiteContent } = require("../controllers/siteContentController");
const { protect, authorize } = require("../middleware/auth");

// Public route to get site content (e.g., homepage sections, about sections)
router.get("/:type", getSiteContent);

// Private route to update site content
router.put("/:type", protect, authorize("admin", "superadmin"), updateSiteContent);

module.exports = router;

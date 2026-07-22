const express = require('../config/express-shim');
const router = express.Router();
const siteContentController = require('../controllers/siteContentController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', siteContentController.getAllContent);
router.get('/:key', siteContentController.getContentByKey);

// Admin only routes
router.put('/:key', protect, authorize('admin', 'superadmin'), siteContentController.updateContent);
router.post('/seed', protect, authorize('admin', 'superadmin'), siteContentController.seedContent);

module.exports = router;

const express = require("../config/express-shim");
const { createCareerApplication } = require("../controllers/careerController");
const resumeUpload = require("../middleware/resumeUpload");

const router = express.Router();

router.post("/", resumeUpload.single("resume"), createCareerApplication);

module.exports = router;

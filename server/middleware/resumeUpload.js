const cloudinary = require("../config/cloudinary");

const resumeUpload = {
  single: (fieldName) => {
    return async (req, res, next) => {
      const file = req.body[fieldName];
      if (!file || !(file instanceof File) || file.size === 0) {
        return next();
      }

      try {
        const allowedMimeTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedMimeTypes.includes(file.type)) {
          res.status(400);
          return next(new Error("Resume must be a PDF, DOC, or DOCX file"));
        }

        if (file.size > 5 * 1024 * 1024) {
          res.status(400);
          return next(new Error("Resume size exceeds 5MB limit"));
        }

        // Convert File to base64 Data URL
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const mimeType = file.type;
        const dataUrl = `data:${mimeType};base64,${base64}`;

        // Upload to Cloudinary using raw resource type
        const uploadResult = await cloudinary.uploader.upload(dataUrl, {
          folder: "srilin/resumes",
          resource_type: "raw",
        });

        // Inject req.file for controller compatibility
        req.file = {
          path: uploadResult.secure_url,
          filename: uploadResult.public_id,
          originalname: file.name,
        };

        next();
      } catch (error) {
        console.error("Cloudinary resume upload error:", error);
        res.status(500);
        next(new Error("Resume upload failed: " + error.message));
      }
    };
  }
};

module.exports = resumeUpload;

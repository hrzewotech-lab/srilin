const cloudinary = require("../config/cloudinary");

const createUploader = (folder) => {
  return {
    single: (fieldName) => {
      return async (req, res, next) => {
        const file = req.body[fieldName];
        if (!file || !(file instanceof File) || file.size === 0) {
          // If no file was selected or it's just a text field fallback
          return next();
        }

        try {
          // File validation
          const allowed = /jpeg|jpg|png|webp|svg/;
          const isValid = allowed.test(file.type);
          if (!isValid) {
            res.status(400);
            return next(new Error("Only image files (jpg, jpeg, png, webp, svg) are allowed"));
          }

          if (file.size > 5 * 1024 * 1024) {
            res.status(400);
            return next(new Error("File size exceeds 5MB limit"));
          }

          // Convert File to base64 Data URL
          const arrayBuffer = await file.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const mimeType = file.type;
          const dataUrl = `data:${mimeType};base64,${base64}`;

          // Upload to Cloudinary
          const uploadResult = await cloudinary.uploader.upload(dataUrl, {
            folder: folder,
            resource_type: "image",
          });

          // Inject req.file for controller compatibility
          req.file = {
            path: uploadResult.secure_url,
            filename: uploadResult.public_id,
            originalname: file.name,
          };

          next();
        } catch (error) {
          console.error("Cloudinary image upload error:", error);
          res.status(500);
          next(new Error("Image upload failed: " + error.message));
        }
      };
    }
  };
};

module.exports = createUploader;

const crypto = require("crypto");

const sha1 = (string) => {
  return crypto.createHash("sha1").update(string).digest("hex");
};

const generateSignature = (params, apiSecret) => {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map(key => `${key}=${params[key]}`).join("&");
  return sha1(paramString + apiSecret);
};

const cloudinaryMock = {
  uploader: {
    upload: async (dataUrl, options = {}) => {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      const timestamp = Math.round(new Date().getTime() / 1000);
      const params = {
        folder: options.folder || "srilin",
        timestamp: timestamp,
      };

      const signature = generateSignature(params, apiSecret);

      const formData = new FormData();
      formData.append("file", dataUrl);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", options.folder || "srilin");

      const resourceType = options.resource_type || "image";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cloudinary upload failed: ${errorText}`);
      }

      const data = await res.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    },

    destroy: async (publicId, options = {}) => {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      const timestamp = Math.round(new Date().getTime() / 1000);
      const params = {
        public_id: publicId,
        timestamp: timestamp,
      };

      const signature = generateSignature(params, apiSecret);

      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      const resourceType = options.resource_type || "image";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cloudinary destroy failed: ${errorText}`);
      }

      return await res.json();
    }
  }
};

module.exports = cloudinaryMock;

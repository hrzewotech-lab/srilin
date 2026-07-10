const mongoose = require("mongoose");

const FAQ_CATEGORIES = [
  "Embedded Hardware Design Services",
  "Embedded Software Development Services",
  "ECAD Layout Services",
  "PCB Manufacturing",
  "Stencil Manufacturing Services",
  "Component Sourcing Services",
  "Testing Services",
  "Laser Marking/ Laser Printing",
  "Conformal Coating",
  "About Srilin",
  "PCB Assembly",
  "X-Ray Inspection",
  "Turnkey Box Build Integration",
  "Ball Grid Array",
  "General",
];

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: false,
    },
    category: {
      type: String,
      enum: FAQ_CATEGORIES,
      default: "General",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
module.exports.FAQ_CATEGORIES = FAQ_CATEGORIES;

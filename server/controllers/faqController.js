const asyncHandler = require("express-async-handler");
const Faq = require("../models/Faq");

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer, isActive } = req.body;

  if (!question || !answer) {
    res.status(400);
    throw new Error("Question and answer are required");
  }

  const faq = await Faq.create({
    question,
    answer,
    isActive: isActive === undefined ? true : isActive === "true" || isActive === true,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, faq });
});

const getFaqs = asyncHandler(async (req, res) => {
  const filter = req.query.all === "true" ? {} : { isActive: true };
  const faqs = await Faq.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: faqs.length, faqs });
});

const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found");
  }
  res.status(200).json({ success: true, faq });
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found");
  }

  const { question, answer, isActive } = req.body;

  if (question) faq.question = question;
  if (answer !== undefined) faq.answer = answer;
  if (isActive !== undefined) faq.isActive = isActive === "true" || isActive === true;

  await faq.save();

  res.status(200).json({ success: true, faq });
});

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found");
  }

  await faq.deleteOne();

  res.status(200).json({ success: true, message: "FAQ deleted successfully" });
});

module.exports = { createFaq, getFaqs, getFaqById, updateFaq, deleteFaq };

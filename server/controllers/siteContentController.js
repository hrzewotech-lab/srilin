const asyncHandler = require("express-async-handler");
const SiteContent = require("../models/SiteContent");

// Default initial data for homepage sections
const defaultContent = {
  whyChoose: [
    { title: 'Strategic Location', meta: '15 minutes from airport cargo terminal', text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal.', icon: 'MapPin' },
    { title: 'High Reliability Specialist', meta: 'Aerospace, defence, automotive and more', text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics.', icon: 'ShieldCheck' },
    { title: 'Built to Scale', meta: '8x expansion footprint on same campus', text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility.', icon: 'TrendingUp' },
    { title: 'Customer Satisfaction', meta: 'Flexible volumes and account ownership', text: 'Dedicated account management, quick prototyping, and flexible production volumes.', icon: 'Smile' },
    { title: 'Quality First Approach', meta: '3D SPI, 3D AOI and X-ray systems', text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems.', icon: 'BadgeCheck' },
  ],
  aboutStats: [
    { value: '149+', label: 'Clients Served' },
    { value: '347+', label: 'Projects Delivered' },
    { value: '9+', label: 'Years of Excellence' },
  ],
  testimonials: [
    { quote: 'The seamless integration of Srilin team efforts with FICOSA’s requirements has been instrumental in achieving high-quality outcomes...', name: 'Aravind', company: 'Technical Director, Ficosa' },
    { quote: "Pixcellence greatly appreciates Srilin Team's unwavering commitment to delivering high-quality PCBAs...", name: 'Huzaifa Najmi', company: 'President & CEO, Pixcellence Technologies' },
    { quote: 'Working with Srilin Electronics has been a seamless experience...', name: 'C S Rao', company: 'Chairman, Quadgen Wireless' }
  ],
  industries: [
    { name: 'Automotive', icon: 'Car' },
    { name: 'Aviation, Space & Defence', icon: 'Plane' },
    { name: 'IT Hardware & Consumer Electronics', icon: 'Cpu' },
    { name: 'Telecom', icon: 'Wifi' },
    { name: 'Electric Vehicles', icon: 'BatteryCharging' },
    { name: 'Railways', icon: 'Train' },
    { name: 'AI, IoT & Automation', icon: 'Bot' },
    { name: 'Medical Devices', icon: 'Activity' },
  ],
  tickerItems: [
    'AS9100D Certified', 'ISO 9001:2015', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1', '98% On-Time Delivery', '75+ Global Customers', '12-Day Prototype Cycle', 'ISO-8 Cleanroom Class', 'E-City EMC · Hyderabad', '214,000 Sqft Expansion Ready'
  ]
};

// @desc    Get site content by type
// @route   GET /api/content/:type
// @access  Public
const getSiteContent = asyncHandler(async (req, res) => {
  const { type } = req.params;
  let content = await SiteContent.findOne({ type });

  // Return default content if not found for homepage_sections
  if (!content) {
    if (type === 'homepage_sections') {
      content = await SiteContent.create({ type, data: defaultContent });
    } else {
      content = await SiteContent.create({ type, data: {} });
    }
  }

  res.status(200).json({ success: true, type: content.type, data: content.data });
});

// @desc    Update site content by type
// @route   PUT /api/content/:type
// @access  Private (admin, superadmin)
const updateSiteContent = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { data } = req.body;

  if (!data) {
    res.status(400);
    throw new Error("Data is required to update content");
  }

  let content = await SiteContent.findOne({ type });

  if (!content) {
    content = await SiteContent.create({ type, data });
  } else {
    // If partial update is needed, you could merge. Here we replace.
    content.data = data;
    await content.save();
  }

  res.status(200).json({ success: true, type: content.type, data: content.data });
});

module.exports = {
  getSiteContent,
  updateSiteContent,
};

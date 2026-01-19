const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const monthlytotal = require("../controllers/analytics/getMonthlyTotal");
const monthlytrend = require("../controllers/analytics/getMonthlyTrend");
router.use(protect);

// ---------- PUBLIC ----------
router.get('/monthlytotal', monthlytotal);  
router.get('/monthlytrend',monthlytrend);

module.exports = router;

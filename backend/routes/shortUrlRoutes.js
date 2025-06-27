
const express = require('express');
const router = express.Router();
const { logEvent } = require('../../logging-middleware/LoggingService');
const urlMap = require('./urlStorage');

function generateRandomCode(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

router.post('/', async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
      await logEvent("backend", "error", "handler", "Invalid or missing URL");
      return res.status(400).json({ message: "Invalid or missing URL" });
    }

    let short = shortcode || generateRandomCode();

    if (urlMap.has(short)) {
      await logEvent("backend", "warn", "service", "Shortcode already exists");
      return res.status(409).json({ message: "Shortcode already exists" });
    }

    const minutes = parseInt(validity) || 30;
    const now = new Date();
    const expiryDate = new Date(now.getTime() + minutes * 60 * 1000);

    urlMap.set(short, {
      originalUrl: url,
      createdAt: now,
      expiry: expiryDate,
      clickCount: 0,
      clicks: []
    });

    await logEvent("backend", "info", "service", `Short URL created: ${short}`);

    res.status(201).json({
      shortLink: `http://localhost:8000/${short}`,
      expiry: expiryDate.toISOString()
    });
  } catch (err) {
    await logEvent("backend", "fatal", "handler", "Unhandled error during URL creation");
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


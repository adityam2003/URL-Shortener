
const express = require('express');
const router = express.Router();
const { logEvent } = require('../../Logging-Middleware/LoggingService');
const urlMap = require('./urlStorage.js');

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
router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;

  if (!urlMap.has(shortcode)) {
    await logEvent("backend", "warn", "route", `Shortcode not found: ${shortcode}`);
    return res.status(404).send("Short URL not found");
  }

  const data = urlMap.get(shortcode);
  const now = new Date();

  if (now > data.expiry) {
    await logEvent("backend", "info", "route", `Shortcode expired: ${shortcode}`);
    return res.status(410).send("Short URL expired");
  }

  data.clickCount++;
  data.clicks.push({ time: now, referrer: req.get('referer') || 'direct' });

  await logEvent("backend", "info", "route", `Redirecting from ${shortcode} to ${data.originalUrl}`);

  res.redirect(data.originalUrl);
});


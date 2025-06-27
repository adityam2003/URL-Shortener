

const express = require('express');
const cors = require('cors');
const app = express();
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const urlMap = require('./routes/urlStorage');
const { logEvent } = require('../logging-middleware/LoggingService');

app.use(cors());
app.use(express.json());
app.use('/shorturls', shortUrlRoutes);

app.get('/:shortcode', async (req, res) => {
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

app.listen(8000, () => console.log('🚀 Backend running on http://localhost:8000'));

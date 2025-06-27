

const express = require('express');
const cors = require('cors');
const app = express();
const shortUrlRoutes = require('./routes/shortUrlRoutes.js');

app.use(cors());
app.use(express.json());
// Mount the routes at the root level
app.use('/', shortUrlRoutes);
const { logEvent } = require('../logging-middleware/LoggingService.js');

app.listen(8000, () => {
  console.log("🚀 Backend running on http://localhost:8000");
});


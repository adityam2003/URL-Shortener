
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const defaultUrlData = () => ({
  url: '',
  validity: '',
  shortcode: '',
  result: null,
  error: null,
});

const Shortener = () => {
  const [urls, setUrls] = useState([defaultUrlData()]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, defaultUrlData()]);
    }
  };

  const handleSubmit = async (index) => {
    const { url, validity, shortcode } = urls[index];

    // ✅ Basic client-side validation
    if (!url.startsWith('http')) {
      return handleError(index, 'Invalid URL format');
    }

    const payload = { url };
    if (validity) payload.validity = parseInt(validity);
    if (shortcode) payload.shortcode = shortcode;

    try {
      const response = await axios.post('http://localhost:8000/shorturls', payload);
      handleResult(index, response.data);
    } catch (err) {
      handleError(index, err.response?.data?.message || 'Unexpected error');
    }
  };

  const handleResult = (index, data) => {
    const updated = [...urls];
    updated[index].result = data;
    updated[index].error = null;
    setUrls(updated);
  };

  const handleError = (index, msg) => {
    const updated = [...urls];
    updated[index].error = msg;
    updated[index].result = null;
    setUrls(updated);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {urls.map((item, index) => (
        <Paper key={index} style={{ padding: '1rem', marginBottom: '1rem' }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long URL"
                fullWidth
                value={item.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <TextField
                label="Validity (min)"
                type="number"
                fullWidth
                value={item.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <TextField
                label="Shortcode"
                fullWidth
                value={item.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" onClick={() => handleSubmit(index)} fullWidth>
                Shorten
              </Button>
            </Grid>
          </Grid>

          {item.result && (
            <Typography style={{ marginTop: '1rem', color: 'green' }}>
              ✅ Short URL: <a href={item.result.shortLink} target="_blank" rel="noreferrer">{item.result.shortLink}</a><br />
              ⏳ Expires at: {item.result.expiry}
            </Typography>
          )}

          {item.error && (
            <Typography style={{ marginTop: '1rem', color: 'red' }}>
              ❌ {item.error}
            </Typography>
          )}
        </Paper>
      ))}

      <Button
        onClick={handleAddUrl}
        disabled={urls.length >= 5}
        variant="outlined"
        style={{ marginTop: '1rem' }}
      >
        + Add Another URL
      </Button>
    </div>
  );
};

export default Shortener;

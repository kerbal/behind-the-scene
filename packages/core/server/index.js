const express = require('express');
const path = require('path');

const app = express();

app.get('/source', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist/bundle.js'));
});

app.listen(process.env.PORT || 5050, () => {
  console.log('running');
});
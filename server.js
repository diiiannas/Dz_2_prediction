const express = require('express');
const path = require('path');
const app = require('./api');

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Magic 8-Ball запущен: http://localhost:${port}`);
});

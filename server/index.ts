const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./bin/config.ts');
const forecastRoutes = require('./routes/forecast.ts');

const app = express();

// listen
app.listen(PORT, function () {
  console.log('server running');
});

// route
app.use('/api/v1/forecast', forecastRoutes);

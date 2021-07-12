// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ComponentData = new Schema({
  co: Number,
  no: Number,
  no2: Number,
  o3: Number,
  so2: Number,
  pm2_5: Number,
  pm10: Number,
  nh3: Number,
});

const ListData = new Schema({
  dt: Number,
  main: {
    api: Number,
  },
  components: ComponentData,
});

const AirPollutionSchema = new Schema({
  coord: [Number],
  list: [ListData],
});

module.exports = mongoose.module('AirPollution', AirPollutionSchema);

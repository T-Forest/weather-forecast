// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const WeatherData = new Schema({
  id: Number,
  main: String,
  description: String,
  icon: String,
});

const BaseData = new Schema({
  dt: Number,
  sunrise: Number,
  sunset: Number,
  temp: Number,
  feels_like: Number,
  pressure: Number,
  humidity: Number,
  dew_point: Number,
  clouds: Number,
  uvi: Number,
  visibility: Number,
  wind_speed: Number,
  wind_gust: Number,
  wind_deg: Number,
  pop: Number,
  rain: Number,
  snow: Number,
  weather: [WeatherData],
});

const CurrentData = new Schema({
  BaseData,
});

const MinutelyData = new Schema({
  BaseData,
});

const HourlyData = new Schema({
  BaseData,
});

const DailyData = new Schema({
  BaseData,
});

const AlertsData = new Schema({
  sender_name: String,
  event: String,
  start: Number,
  end: Number,
  description: String,
});

const OneCallSchema = new Schema({
  lat: Number,
  lon: Number,
  timezone: String,
  timezone_offset: Number,
  current: CurrentData,
  minutely: [MinutelyData],
  hourly: [HourlyData],
  daily: [DailyData],
  alerts: [AlertsData],
});

module.exports = mongoose.module('OneCall', OneCallSchema);

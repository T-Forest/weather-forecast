const { API_KEY_OPEN_WEATHER_MAP } = require('../bin/config.ts');
const ROOT_URL_ONE_CALL_API = 'https://api.openweathermap.org/data/2.5';
module.exports = {
  URL_ONE_CALL: `${ROOT_URL_ONE_CALL_API}/onecall?lat={lat}&lon={lon}&exclude={part}&lang={lang}&appid=${API_KEY_OPEN_WEATHER_MAP}`,
  URL_AIR_POLLUTION: `${ROOT_URL_ONE_CALL_API}/air_pollution/forecast?lat={lat}&lon={lon}&exclude={part}&lang={lang}&appid=${API_KEY_OPEN_WEATHER_MAP}`,
};

const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const { URL_ONE_CALL, URL_AIR_POLLUTION } = require('../util/const.ts');

router.get('', async (req, res) => {
  // リクエストURLを編集
  // TODO 緯度・経度についてパラメタにより可変にする
  const lat = '31.638624519829264';
  const lon = '130.522474642548';

  // 南岳
  const latSakurajima = '31.581645009509053';
  const lonSakurajima = '130.65849429099092';

  const part = 'minutely';
  const lang = 'ja';
  let oneCallResponse = await getDataFromOneCallApi(lat, lon, part, lang);
  let airPollutionResponse = await getDataFromAirPollutionApi(
    lat,
    lon,
    part,
    lang
  );
  let sakurajimaWeather = await getDataFromOneCallApi(
    latSakurajima,
    lonSakurajima,
    part,
    lang
  );
  //TODO Weatherモデル周りをスッキリさせる
  let hourlyWeather = [];
  oneCallResponse['hourly'].forEach((hourlyData, index) => {
    hourlyWeather.push({
      dt: hourlyData.dt,
      id: hourlyData['weather'][0].id,
      description: hourlyData['weather'][0].description,
      icon: hourlyData['weather'].icon,
      /** 降水量[mm] */
      precipitation: hourlyData.pop,
      /** 風向き */
      windDeg: hourlyData.wind_deg,
      /** 風速[m/s] */
      windSpeed: hourlyData.wind_speed,
      /** 温度 */
      temp: hourlyData.temp - 273.15,
      /** 紫外線 uv index */
      uvi: hourlyData.uvi,
    });
  });
  let hourlyPm2_5 = airPollutionResponse['list'].filter((hourlyData) => {
    // １時間前のデータから取得する
    return hourlyData.dt >= oneCallResponse['current'].dt - 3600;
  });

  let returnJsonStr = {
    lat: oneCallResponse['lat'],
    lon: oneCallResponse['lon'],
    currentWeather: {
      dt: oneCallResponse['current'].dt,
      id: oneCallResponse['current']['weather'][0].id,
      description: oneCallResponse['current']['weather'][0].description,
      icon: oneCallResponse['current']['weather'].icon,
      /** 降水量[mm] */
      precipitation: null,
      /** 風向き */
      windDeg: oneCallResponse['current'].wind_deg,
      /** 風速[m/s] */
      windSpeed: oneCallResponse['current'].wind_speed,
      /** 温度 */
      temp: oneCallResponse['current'].temp - 273.15, // 絶対温度→摂氏に変換
      /** 紫外線 uv index */
      uvi: oneCallResponse['current'].uvi,
    },
    /** １時間毎データ */
    hourlyWeather: hourlyWeather,
    /** PM2.5[μg/m3] */
    hourlyPm2_5: hourlyPm2_5,
    sakurajimaWindInfo: sakurajimaWeather['hourly'].map((weather) => {
      return {
        dt: weather.dt,
        windDeg: weather.wind_deg,
        windSpeed: weather.wind_speed,
      };
    }),
  };
  res.send(returnJsonStr);
});

/** OneCallApi実行 */
async function getDataFromOneCallApi(lat, lon, part, lang) {
  let reqUrl = URL_ONE_CALL.replace('{lat}', lat);
  reqUrl = reqUrl.replace('{lon}', lon);
  reqUrl = reqUrl.replace('{part}', part);
  reqUrl = reqUrl.replace('{lang}', lang);

  // リクエスト送信＆レスポンスを返却
  const returnJson = await fetchGetRequest(reqUrl);
  console.log(returnJson['current']['temp'] - 273.15); // 絶対温度→摂氏に変換
  console.log(returnJson['current']['uvi']);
  console.log(returnJson['current']['weather'][0]['description']);
  return returnJson;
}

/** AirPollutionApi実行 */
async function getDataFromAirPollutionApi(lat, lon, part, lang) {
  let reqUrl = URL_AIR_POLLUTION.replace('{lat}', lat);
  reqUrl = reqUrl.replace('{lon}', lon);
  reqUrl = reqUrl.replace('{part}', part);
  reqUrl = reqUrl.replace('{lang}', lang);

  // リクエスト送信＆レスポンスを返却
  const returnJson = await fetchGetRequest(reqUrl);
  console.log(returnJson['list'][0]['components']['pm2_5']);
  // console.log(returnJson['current']['uvi']);
  // console.log(returnJson['current']['weather'][0]['description']);
  return returnJson;
}

/** 特定のurlにGETリクエストを送信する */
async function fetchGetRequest(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;

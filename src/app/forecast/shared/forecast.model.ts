export interface Forecast {
  /** 緯度 */
  lat: number;
  /** 経度 */
  lon: number;
  /** 今日の天気 */
  currentWeather: Weather;
  /** １時間毎の天気 */
  hourlyWeather: Weather[];
  /** PM2.5のデータ */
  hourlyPm2_5: Pm2_5[];
  /** 桜島上空の風 1時間毎 */
  sakurajimaWindInfo: WindInfo[];
}

export interface WindInfo {
  /** 時刻 */
  dt: number;
  /** 風向き */
  windDeg: number;
  /** 風速[m/s] */
  windSpeed: number;
}

export interface Weather {
  dt: number;
  id: number;
  description: string;
  icon: string;
  /** 降水量[mm] */
  precipitation: number;
  /** 風向き */
  windDeg: number;
  /** 風速[m/s] */
  windSpeed: number;
  /** 温度 */
  temp: number;
  /** 紫外線 uv index */
  uvi: number;
  // /** PM2.5[μg/m3] */
  // pm2_5: number;
}

export interface Pm2_5 {
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number;
}

export interface Forecast {
  /** 緯度 */
  lat: number;
  /** 経度 */
  lon: number;
  /** 今日の天気 */
  currentWeather: Weather;
  /** １時間毎の天気 */
  hourlyWeather: Weather[];
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
  /** PM2.5[μg/m3] */
  pm2_5: number;
}

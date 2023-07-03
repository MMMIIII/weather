import { defineStore } from 'pinia';
import { ref } from 'vue';
import city from './city';
import { getWeatherAPI } from '../boot/axios';

export const useWeatherStore = defineStore('Weather', () => {
  const feel = ref<number>();
  const maxTemp = ref<number>();
  const minTemp = ref<number>();
  const humidity = ref<number>();
  const pressure = ref<number>();
  const windSpeed = ref<number>();
  const deg = ref<number>();
  const time = ref<number>();
  const daysAPI = ref<any[]>();
  const modelCity = ref<string>("Бишкек");
  const tempMetric = ref<string>("C°");
  const settingTempMetric = ref<string>("metric");
  const langModel = ref<string>("Русский");
  const nameCountryAndCity = ref(city);

  function tempMetricModifi(tempMetric: string): void {
    if (tempMetric === "C°") {
      settingTempMetric.value = "metric";
    } else {
      settingTempMetric.value = "imperial";
    }
  }

  function updateWeather(WeatherNow: any, func: Function, lang: string): void {
    feel.value = Math.round(WeatherNow.value.main.feels_like);
    maxTemp.value = Math.round(WeatherNow.value.main.temp_max);
    minTemp.value = Math.round(WeatherNow.value.main.temp_min);
    humidity.value = WeatherNow.value.main.humidity;
    pressure.value = Math.round(WeatherNow.value.main.pressure / 1.333);
    windSpeed.value = Math.round(WeatherNow.value.wind.speed);
    deg.value = func(WeatherNow.value.wind.deg, lang);
    time.value = WeatherNow.value.dt;
  }

  async function getWeatherToday(data: any, tempMetric: string): Promise<void> {
    daysAPI.value = await getWeatherAPI(data, tempMetric, "forecast");
  }

  return {
    nameCountryAndCity,
    feel,
    maxTemp,
    minTemp,
    humidity,
    pressure,
    windSpeed,
    deg,
    time,
    modelCity,
    updateWeather,
    getWeatherToday,
    daysAPI,
    tempMetric,
    tempMetricModifi,
    settingTempMetric,
    langModel,
  };
});

export const useConvertStore = defineStore('useConvert', () => {
  function convertDeg(deg: number, langMode: string): string {
    if (langMode === "Русский") {
      return 0 < deg && deg <= 45 ? "северный" :
             45 < deg && deg <= 90 ? "северо-западный" :
             90 < deg && deg <= 135 ? "восточный" :
             135 < deg && deg <= 180 ? "юго-восточный" :
             180 < deg && deg <= 225 ? "южный" :
             225 < deg && deg <= 270 ? "юго-западный" :
             270 < deg && deg <= 315 ? "западный" :
             315 < deg && deg <= 360 ? "северо-западный" : '';
    } else {
      return 0 < deg && deg <= 45 ? "N" :
             45 < deg && deg <= 90 ? "N-E" :
             90 < deg && deg <= 135 ? "E" :
             135 < deg && deg <= 180 ? "S-E" :
             180 < deg && deg <= 225 ? "S" :
             225 < deg && deg <= 270 ? "S-W" :
             270 < deg && deg <= 315 ? "W" :
             315 < deg && deg <= 360 ? "N-W" : '';
    }
  }

  return { convertDeg };
});

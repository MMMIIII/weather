<script lang="ts">
import TheWeatherNow from './WeatherNow.vue';
import WeatherToday from './WeatherToday.vue'
import SwitchLang from './UI/SwitchLang.vue';
import SwitchTheme from './UI/SwitchTheme.vue';
import SwitchTempButton from './UI/SwitchTempButton.vue';
import SearchSelect from './UI/SearchSelect.vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/useWeather';
import { useConvertStore } from '../stores/useWeather';
import { getWeatherAPI } from '../boot/axios';
import city from '../assets/city'
import cityEng from '../assets/cityEng'
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    SearchSelect,
    TheWeatherNow,
    WeatherToday,
    SwitchTempButton,
    SwitchLang,
    SwitchTheme
  },
  setup() {
    const store = useWeatherStore();
    const { locale } = useI18n();
    const { settingTempMetric, nameCountryAndCity, modelCity, feel, maxTemp, minTemp, humidity, pressure, windSpeed, deg, time } = storeToRefs(store);
    const isCollapsed = ref(true);
    const stringOptions = nameCountryAndCity;
    const convertStore = useConvertStore();
    const WeatherNow = ref("");

    watch(locale, () => {
      if (locale.value === "ru") {
        nameCountryAndCity.value = city;
        modelCity.value = "Бишкек";
      } else {
        nameCountryAndCity.value = cityEng;
        modelCity.value = "Bishkek";
      }
    })

    async function WeatherNowAPI(data: string, tempMetric: string) {
      return await getWeatherAPI(data, tempMetric, "weather");
    }

    onMounted(async () => {
      WeatherNow.value = await WeatherNowAPI(modelCity.value, settingTempMetric.value);
      store.updateWeather(WeatherNow, convertStore.convertDeg, locale.value);
    })

    async function searchCall(data: any) {
      WeatherNow.value = await WeatherNowAPI(data.modelCity.value, settingTempMetric.value);
      await store.getWeatherToday(data.modelCity.value, settingTempMetric.value);
      store.updateWeather(WeatherNow, convertStore.convertDeg, locale.value);

    }

    watch(settingTempMetric, async (newValue) => {
      WeatherNow.value = await WeatherNowAPI(modelCity.value, newValue);
      await store.getWeatherToday(modelCity.value, settingTempMetric.value);
      store.updateWeather(WeatherNow, convertStore.convertDeg, locale.value);
    })

    watch(locale, (newValue) => {
      store.updateWeather(WeatherNow, convertStore.convertDeg, newValue);
    })

    function showMob(width: number): boolean {
      return window.innerWidth <= width ? true : false;
    }

    return {
      feel,
      maxTemp,
      minTemp,
      humidity,
      pressure,
      windSpeed,
      deg,
      time,
      locale,
      settingTempMetric,
      isCollapsed,
      stringOptions,
      searchCall,
      showMob
    }

  }
}
</script>

<template>
  <div class="weather-home">

    <div class="row q-pa-md justify-between items-center ">

      <div>
        <search-select
          @SearchCall="searchCall" 
          :stringOptions="stringOptions" 
          :locale="locale" 
        />
      </div>

      <div v-show="!showMob(414)" class="row no-wrap reverse items-center justify-between q-pr-xl margin">
        <switch-theme />
        <switch-lang />
        <switch-temp-button />
      </div>

      <div v-show="showMob(414)" class="row no-wrap reverse items-center justify-center ">
        <q-expansion-item
          expanded-icon="settings" 
          expand-icon="settings" 
          v-model="isCollapsed"
          class="q-expansion-item"
        >
          <div class="column wrap justify-center items-center">
            <div class="q-pb-sm"><switch-theme></switch-theme></div>
            <div class="q-pb-sm"><switch-lang></switch-lang></div>
            <div class="q-pb-sm"><switch-temp-button></switch-temp-button></div>
          </div>
        </q-expansion-item>
      </div>

    </div>

    <the-weather-now 
      :feel="feel" 
      :maxTemp="maxTemp" 
      :minTemp="minTemp" 
      :humidity="humidity" 
      :pressure="pressure"
      :windSpee="windSpeed" 
      :deg="deg" 
      :time="time" 
      :settingTempMetric="settingTempMetric" 
      class="the-weather-now" 
    />
    <div class="weather-home-weather-today-wrapper">
      <weather-today :settingTempMetric="settingTempMetric" class="weather-home-weather-today" />
    </div>

  </div>
</template>
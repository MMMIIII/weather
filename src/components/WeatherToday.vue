<script setup lang="ts">
import WeatherTodayItem from './WeatherTodayItem.vue';
import { useWeatherNowStore } from '../stores/useWeather';
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { getWeatherAPI } from '../boot/axios';

let touchPan= ref(false);

let position = 0;

let onTouchPan = (event: any): void => {
  let el = document.querySelector('.weather-home-weather-today') as HTMLElement;
  if(position >= -3250 && event.direction == "left") {
    position += Math.round(event.offset.x) / 30;
    console.log(position)
    el.style.cssText = `left: ${position}px;`
  }
  else if( position < 0 && event.direction == "right"  ) {
    position += Math.round(event.offset.x) / 30;
    console.log(position)
    el.style.cssText = `left: ${position}px;`
  }
  console.log(event);
  touchPan.value = true;
};


let TodayStore = useWeatherNowStore();

let { settingTempMetric, daysAPI } = storeToRefs(TodayStore);


async function WeatherNowAPI(data: string, tempMetric : string) {
  return await getWeatherAPI(data, tempMetric, "forecast");
}

let { modelCity } = storeToRefs(TodayStore);

TodayStore.daysAPI = await WeatherNowAPI(modelCity.value, settingTempMetric.value);

watch(modelCity, async (newValue) => {
  console.log(modelCity.value);
  TodayStore.daysAPI.value = await WeatherNowAPI(newValue, settingTempMetric.value);
});

watch(settingTempMetric, async (newValue) => {
  console.log(settingTempMetric.value);
  TodayStore.daysAPI.value = await WeatherNowAPI(modelCity.value, newValue);
});

console.log(daysAPI)

</script>

<template>
  <div class="slider-container">
    <div class="weather-today inner-slider">
      <weather-today-item
        v-touch-pan="onTouchPan"
        :settingTempMetric="settingTempMetric"
        :model="modelCity"
        :timezone="daysAPI.city.timezone"
        v-for="day in daysAPI.list"
        :key="day.dt"
        :firstDay="day"
      ></weather-today-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

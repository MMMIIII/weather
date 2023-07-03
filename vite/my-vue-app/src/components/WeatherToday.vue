<script setup lang="ts">
import WeatherTodayItem from './WeatherTodayItem.vue';
import { useWeatherStore } from '../stores/useWeather';
import { watch, ref } from 'vue';
import { getWeatherAPI } from '../boot/axios';
import { storeToRefs } from 'pinia';

let TodayStore = useWeatherStore();

let {settingTempMetric,daysAPI,modelCity} = storeToRefs(TodayStore)


TodayStore.daysAPI = await WeatherNowAPI(modelCity.value, settingTempMetric.value);

async function WeatherNowAPI(data : string,tempMetric: string) {
  return await getWeatherAPI(data, tempMetric,"forecast");
}


watch(modelCity, async (newValue) => {
  console.log(modelCity.value);
  daysAPI.value = await WeatherNowAPI(newValue, settingTempMetric.value);
});

watch(settingTempMetric, async (newValue) => {
  console.log(settingTempMetric.value);
  daysAPI.value = await WeatherNowAPI(modelCity.value, newValue);
});




// обработка дерективы v-touch-pan
let touchPan= ref(false)

let position = 0;

let onTouchPan = (event: any): void => {
  let el = document.querySelector('.weather-home-weather-today') as HTMLElement;
  if(position >= -3324.6 && event.direction == "left") {
    position += Math.round(event.offset.x) / 10;
    console.log(position)
    el.style.cssText = `left: ${position}px;`
  }
  else if( position < 0 && event.direction == "right"  ) {
    position += Math.round(event.offset.x) / 10;
    console.log(position)
    el.style.cssText = `left: ${position}px;`
  }
  console.log(event);
  touchPan.value = true;
};
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

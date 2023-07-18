<script setup lang="ts">
import WeatherTodayItem from './WeatherTodayItem.vue';
import { useWeatherStore } from '../stores/useWeather';
import { watch, ref } from 'vue';
import { getWeatherAPI } from '../boot/axios';
import { storeToRefs } from 'pinia';

const TodayStore = useWeatherStore();

const { settingTempMetric, daysAPI, modelCity } = storeToRefs(TodayStore)
const slide = ref(0)

TodayStore.daysAPI = await WeatherNowAPI(modelCity.value, settingTempMetric.value);

async function WeatherNowAPI(data: string, tempMetric: string) {
  return await getWeatherAPI(data, tempMetric, "forecast");
}


watch(modelCity, async (newValue) => {
  daysAPI.value = await WeatherNowAPI(newValue, settingTempMetric.value);
});

watch(settingTempMetric, async (newValue) => {
  daysAPI.value = await WeatherNowAPI(modelCity.value, newValue);
});


function grouped(slideNum: number) {
  const days = TodayStore.daysAPI.list;
  const groups = [];
  for (let i = 0; i < days.length; i += slideNum) {
    groups.push(days.slice(i, i + slideNum));
  }
  return groups;
}

function groupedCheck() {
  const el = window.innerWidth;
  if (el >= 1920 || el > 1440) {
    return grouped(6)
  }
  if (el === 1440 || el > 414) {
    return grouped(5)
  }
  if (el === 414 || el > 320) {
    return grouped(4)
  }
  if (el <= 320) {
    return grouped(3)
  }
}

</script>

<template>
  <div class="slider-container">
    <div class="weather-today inner-slider flex">
      <q-carousel 
        v-model="slide" 
        transition-prev="slide-right" 
        transition-next="slide-left" 
        swipeable animated 
        arrows
        padding
      >
        <q-carousel-slide v-for="(group, index) in groupedCheck()" :name="index" :key="index">
          <weather-today-item 
            :settingTempMetric="settingTempMetric" 
            :model="modelCity" 
            :timezone="daysAPI.city.timezone"
            v-for="day in group" 
            :key="day.dt" 
            :firstDay="day" 
          />
        </q-carousel-slide>
      </q-carousel>

    </div>
  </div>
</template>
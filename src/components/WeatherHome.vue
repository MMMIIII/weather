<script setup lang="ts">
import { onMounted, ref,watch,} from 'vue';
import { useWeatherNowStore } from 'src/stores/useWeather';
import { getWeatherAPI } from '../boot/axios';
import SearchSelect from './UI/SearchSelect.vue';
import {useConvertStore} from 'src/stores/useWeather';
import TheWeatherNow from './WeatherNow.vue';
import WeatherToday from './WeatherToday.vue'
import SwitchTempButton from './UI/SwitchTempButton.vue';
import { storeToRefs } from 'pinia';
import SwitchLang from './UI/SwitchLang.vue';
import city from '../stores/city'
import cityEng from '../stores/cityEng'
import SwitchTheme from './UI/SwitchTheme.vue';

let store = useWeatherNowStore();

let { settingTempMetric, langModel,nameCountryAndCity ,nameCountryAndCityEng, modelCity,feel,maxTemp,minTemp,humidity,pressure,windSpeed,deg,time, } = storeToRefs(store);
let isCollapsed = ref(true);


let stringOptions = langModel.value == "Русский"? nameCountryAndCity :nameCountryAndCityEng ;

watch(langModel,() => {
  if(langModel.value === "Русский" ) {
  nameCountryAndCity.value = city
  modelCity.value = "Бишкек"
} else {
  nameCountryAndCity.value = cityEng
  modelCity.value = "Bishkek"
}
})


let convertStore = useConvertStore()


let WeatherNow = ref("")

async function WeatherNowAPI(data : string,tempMetric: string) {
  return await getWeatherAPI(data, tempMetric,"weather");
}

onMounted( async() => {
  WeatherNow.value = await WeatherNowAPI(modelCity.value,settingTempMetric.value);
  console.log("shit")
  store.updateWeather(WeatherNow,convertStore.convertDeg, langModel.value)
})

async function firstCall(data) {
  WeatherNow.value = await WeatherNowAPI(data.modelCity.value,settingTempMetric.value);
  await store.getWeatherToday(data.modelCity.value,settingTempMetric.value);

  store.updateWeather(WeatherNow,convertStore.convertDeg, langModel.value)
}

watch(settingTempMetric,async (newValue) => {
  WeatherNow.value = await WeatherNowAPI(modelCity.value,newValue);
  console.log(newValue)
  await store.getWeatherToday(modelCity.value,settingTempMetric.value);
  store.updateWeather(WeatherNow,convertStore.convertDeg, langModel.value)
})

watch(langModel,(newValue) => {
  store.updateWeather(WeatherNow,convertStore.convertDeg,newValue)
})

watch(langModel,(newValue) => {
  store.updateWeather(WeatherNow,convertStore.convertDeg,newValue)
})


let position = 0;
console.log(window.innerWidth)

function moveLeft() {
  let el = document.querySelector('.weather-home-weather-today') as HTMLElement;

  if(window.innerWidth >= 1920) {
    el.style.left = `${position}px`
      if(el.style.left !== "0px") {
        position += 1470;
      console.log(position)
      el.style.left = `${position}px`
    }
  }

  else if(window.innerWidth == 1600) {
      el.style.left = `${position}px`
      if(el.style.left !== "0px") {
      position += 1044;
      console.log(position)
      el.style.cssText = `left: ${position}px;`
    }
  }

  else if(window.innerWidth == 1440) {
    el.style.left = `${position}px`
      if(el.style.left !== "0px") {
      position += 1044;
      console.log(position)
      el.style.cssText = `left: ${position}px;`
    } else {
    }
  }
  else if(window.innerWidth == 1280) {
    el.style.left = `${position}px`
      if(el.style.left !== "0px") {
      position += 882;
      console.log(position)
      el.style.cssText = `left: ${position}px;`
    } else {
    }
  }
  else if(window.innerWidth == 1024) {
    el.style.left = `${position}px`
      if(el.style.left !== "0px") {
      position += 774;
      console.log(position)
      el.style.cssText = `left: ${position}px;`
    } else {
    }
  }



}


function moveRigth() {

  let el = document.querySelector('.weather-home-weather-today') as HTMLElement;

  if(window.innerWidth >= 1920){
    el.style.cssText= `left: ${position}px;`
    if(el.style.left !== "-7350px") {
      position += -1470;
      el.style.cssText = `left: ${position}px;`
    }
  }
  else if(window.innerWidth == 1600) {
    el.style.cssText= `left: ${position}px;`
      if(el.style.left !== "-6264px") {
      position += -1044;
      console.log(position)
      el.style.cssText = `left: ${position}px;`
    }
  }
 else if(window.innerWidth == 1440){
      el.style.cssText = `left: ${position}px;`
    if(el.style.left !== "-6264px") {
      position += -1044;
      el.style.cssText = `left: ${position}px;`
    }
  }
  else if(window.innerWidth == 1280){
      el.style.cssText = `left: ${position}px;`
    if(el.style.left !== "-5292px") {
      position += -882;
      el.style.cssText = `left: ${position}px;`
    }
  }
  else if(window.innerWidth == 1024){
      el.style.cssText = `left: ${position}px;`
    if(el.style.left !== "-4644px") {
      position += -774;
      el.style.cssText = `left: ${position}px;`
    }
  }
}
function showMob(width: number) : boolean {
  return window.innerWidth <= width ? true : false
}
</script>

<template>
    <div class="weather-home">

      <div class="row q-pa-md justify-between items-center ">

      <div class="xl">
        <search-select
        class="xl"
        @firstCall="firstCall"
        :stringOptions="stringOptions"
        >
      </search-select>
      </div >

      <div style="margin-left: 760px;" class="row no-wrap reverse items-center justify-between q-pr-xl xl xl-margin">
          <switch-theme ></switch-theme>
          <switch-lang  ></switch-lang>
          <switch-temp-button ></switch-temp-button>
      </div>
      <search-select
        class="lg"
        @firstCall="firstCall"
        :stringOptions="stringOptions"
        >
      </search-select>
      <div style="margin-left: 730px;" class="row no-wrap reverse items-center justify-between q-pr-xl lg lg-margin">
          <switch-theme ></switch-theme>
          <switch-lang  ></switch-lang>
          <switch-temp-button ></switch-temp-button>
      </div>

      <search-select
        class="md"
        @firstCall="firstCall"
        :stringOptions="stringOptions"
        >
      </search-select>
      <div style="margin-left: 475px;" class="row no-wrap reverse items-center justify-between md">
          <switch-theme ></switch-theme>
          <switch-lang ></switch-lang>
          <switch-temp-button ></switch-temp-button>
      </div>

       <search-select
        v-show="showMob(414)"
        class="xs"
        @firstCall="firstCall"
        :stringOptions="stringOptions"
        >
      </search-select>

      <div v-show="showMob(414)" class="row no-wrap reverse items-center justify-center ">
        <q-expansion-item

          expanded-icon="settings"
          expand-icon="settings"
          v-model="isCollapsed"
          class="xs q-expansion-item "
        >
        <div class="column wrap justify-center items-center xs">
          <div class="q-pb-sm"><switch-theme ></switch-theme></div>
          <div class="q-pb-sm"><switch-lang  ></switch-lang></div>
          <div class="q-pb-sm"><switch-temp-button ></switch-temp-button></div>
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
      >
      </the-weather-now>

      <div @click.prevent="moveRigth" class="weather-home-weather-today-svg-right"></div>
      <div @click.prevent="moveLeft" class="weather-home-weather-today-svg-left"></div>

      <div class="weather-home-weather-today-wrapper">
        <weather-today
        :settingTempMetric="settingTempMetric"
        class="weather-home-weather-today"
        ></weather-today>
      </div>

    </div>
</template>

<style>

</style>

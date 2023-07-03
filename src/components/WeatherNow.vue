<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from 'src/stores/useWeather';

let props = defineProps({
  settingTempMetric : String,
  feel : Number,
  maxTemp : Number,
  minTemp : Number,
  humidity : Number,
  pressure : Number,
  windSpee : Number,
  deg : String,
  time :  Number,
})

let store = useWeatherStore();
let {langModel} = storeToRefs(store)

function showPlus(temp : any) {
  return props.settingTempMetric  === "metric" && temp > 0 ? true : false
}

function langShow() {
    return langModel.value == "Русский" ? true : false
}

</script>

<template>
  <section class="weather-now">
    <div class="now-info">
      <div class="temp-feel">
        <span> <span v-show="showPlus(feel)">+</span>{{ feel }}°</span>
      </div>

      <div class="info-wrap">

        <div class="min-temp">
          <p class="info-description"><span v-show="langShow()" >Макс.т.</span> <span v-show="!langShow()" >Max.t.</span>
                                      <span v-show="langShow()">°C</span> <span v-show="!langShow()">°F</span> </p>
                                      <span><span v-show="showPlus(minTemp)">+</span>{{ minTemp }}°</span>
        </div>

        <div class="max-temp">
          <p class="info-description"> <span v-show="langShow()" >Мин.т.</span> <span v-show="!langShow()" >Min.t.</span>
            <span v-show="showPlus(maxTemp)">°C</span> <span v-show="!showPlus(maxTemp)">°F</span></p>
          <span><span v-show="showPlus(maxTemp)">+</span>{{ maxTemp }}°</span>
        </div>

        <div class="humidity">
          <p v-show="langShow()" class="info-description">Влажность</p>
          <p v-show="!langShow()" class="info-description">Humidity</p> {{ humidity }}%
        </div>

        <div class="pressure">
          <p v-show="langShow()" class="info-description">Давление</p>
          <p v-show="!langShow()" class="info-description">Pressure</p>
          {{ pressure }}
          <p v-show="langShow()" class="info-description">мм. рт. ст.</p>
          <p v-show="!langShow()" class="info-description">mm. Hg</p>
        </div>

      </div>
      <div class="wind">
      <p class="info-description"></p>
      <span> {{windSpee }} </span>
      <div>
        <p class="wind-description" v-show="langShow()"> <span v-show="langShow()">метр/с</span> <span v-show="!langShow()">мили/час</span></p>
        <p class="wind-description" v-show="!langShow()"> <span v-show="langShow()">meter/s</span> <span v-show="!langShow()">miles/h</span></p>
        <p class="wind-description">{{ deg }}</p>
      </div>
    </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { onMounted, ref, toRef, watch } from 'vue';
import { addSeconds } from 'date-fns';
import { useI18n } from 'vue-i18n';

const { d } = useI18n();
const props = defineProps({
  firstDay: {
    type: Object,
    required: true
  },
  timezone: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  settingTempMetric: {
    type: String,
    required: true
  }
})
const firstDayRef = toRef(props, 'firstDay')
const dataWithTimezone = ref(addSeconds(new Date(props.firstDay.dt * 1000), props.timezone - 21600));

onMounted(() => {
  timezoneCarent(props.timezone, props.firstDay.dt)
})


function timezoneCarent(timezone: number, dataMs: number): void {
  const myDate = ref(new Date(dataMs * 1000))
  const basedOnTimezone = addSeconds(myDate.value, timezone - 21600);
  dataWithTimezone.value = basedOnTimezone
}
watch(firstDayRef, (newValue) => {
  timezoneCarent(props.timezone, newValue.dt)
})

function showPlus(temp: any) {
  return props.settingTempMetric === "metric" && temp > 0 ? true : false
}
</script>


<template>
  <div class="weather-today-item">
    <p class="weather-today-item-time">
    <div>
      <span class="weather-today-item-weekday">{{ d(new Date(dataWithTimezone), 'day') }} </span>
      <span class="weather-today-item-weekday">{{ d(new Date(dataWithTimezone), 'weekday') }}.</span>
    </div>
    <span class="weather-today-item-time"> {{ d(new Date(dataWithTimezone), 'time') }}</span>
    </p>
    <img class="weather-today-item_img" :src="`https://openweathermap.org/img/wn/${firstDay.weather[0].icon}.png`" alt="">
    <div>
      <span class="weather-today-item-temp"><span
          v-show="showPlus(firstDay.main.temp_min)">+</span>{{ Math.round(firstDay.main.temp_min) }}° / </span>
      <span class="weather-today-item-temp"><span
          v-show="showPlus(firstDay.main.temp_max)">+</span>{{ Math.round(firstDay.main.temp_max) }}° </span>
    </div>

  </div>
</template>


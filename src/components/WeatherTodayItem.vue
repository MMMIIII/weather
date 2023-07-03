<script setup lang="ts">
import {onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { format,addSeconds } from 'date-fns';
import ru from 'date-fns/locale/ru';
import enUS from 'date-fns/locale/en-US';
import { useWeatherStore } from '../stores/useWeather';


let props = defineProps({
    firstDay: Object,
    timezone: Number,
    model: String,
    settingTempMetric: String
})

let currentFormattedDay = ref('');
let currentFormattedHours = ref('');
let currentFormattedShortWeek = ref('');

let {langModel,daysAPI} = storeToRefs(useWeatherStore())
// наблюдает за массивом данных дней
watch(daysAPI, (newValue) => {
  timeLangNew(newValue)
})

// инициализирует стартовые значения
onMounted(() => {
  timezoneCarent(props.timezone, props.firstDay.dt, ru)
  watch(langModel,() => {
    timeLang( props.timezone);
  })
})

// принимает начальное значение из props, получает временную зону и
// в зависимости от языка вызывает функцию с разными параметрами
function timeLang(newValue: number): void {
    if(langModel.value == "Русский") {
        timezoneCarent(newValue, props.firstDay.dt, ru, 'EEEEEE','H:mm')
    } else {
        timezoneCarent(newValue, props.firstDay.dt, enUS, 'eee','hh:mm a')
    }
}

// принимает новое значение временной зоны с сервера и
// в зависимости от языка вызывает функцию с разными параметрами
function timeLangNew(newValue: any): void {
    if(langModel.value == "Русский") {
        timezoneCarent(newValue.city.timezone, props.firstDay.dt, ru, 'EEEEEE','H:mm')
    } else {
        timezoneCarent(newValue.city.timezone, props.firstDay.dt, enUS, 'eee','hh:mm a')
    }
}



// функция преобразует дату в зависимости от временной зоны
function timezoneCarent( timezone: number, dataMs: number, lang:object , week: string = 'EEEEEE', langHours : string = 'H:mm' ): void {
  let myDate = new Date(dataMs * 1000)
  // преобразование с учётом временной зоны
  let basedOnTimezone = addSeconds(myDate, timezone - 21600);
  currentFormattedDay.value = format(basedOnTimezone, 'dd', { locale : lang});
  currentFormattedHours.value = format(basedOnTimezone, langHours, { locale : lang});
  currentFormattedShortWeek.value = format(basedOnTimezone, week, { locale : lang});
}



// в зависимости от ответа показывает цельсии или фаренгейты
function showPlus(temp : any) {
  return props.settingTempMetric  === "metric" && temp > 0 ? true : false
}

// в зависимости от ответа показывает русский или английский
function langShow() {
  return langModel.value == "Русский" ? true : false
}

</script>


<template>
    <div class="weather-today-item" >
        <p class="weather-today-item-time">
            <div>
            <span class="weather-today-item-weekday">{{ currentFormattedDay  }} </span>

                <span v-show="langShow()" class="weather-today-item-weekday">{{ currentFormattedShortWeek }}.</span>
                <span v-show="!langShow()" class="weather-today-item-weekday">{{ currentFormattedShortWeek }}.</span>
            </div>
            <span class="weather-today-item-time" v-show="!langShow()"> {{ currentFormattedHours }}</span>
            <span class="weather-today-item-time" v-show="langShow()" >{{ currentFormattedHours }}</span>

            </p>

        <img class="weather-today-item_img" :src="`https://openweathermap.org/img/wn/${firstDay.weather[0].icon}.png`" alt="">

        <div>
            <span class="weather-today-item-temp"><span v-show="showPlus(firstDay.main.temp_min)">+</span>{{Math.round(firstDay.main.temp_min) }}°  / </span>
            <span class="weather-today-item-temp"><span v-show="showPlus(firstDay.main.temp_max)">+</span>{{Math.round(firstDay.main.temp_max) }}°  </span>
        </div>

    </div>
</template>

<style scoped lang="scss">

</style>

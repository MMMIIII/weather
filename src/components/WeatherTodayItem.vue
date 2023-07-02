<script setup lang="ts">
import {ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { format,addSeconds } from 'date-fns';
import ru from 'date-fns/locale/ru';
import enUS from 'date-fns/locale/en-US';
import { useWeatherNowStore } from '../stores/useWeather';


let props = defineProps({
    firstDay: Object,
    timezone: Number,
    model: String,
    settingTempMetric: String
})




let {langModel,daysAPI} = storeToRefs(useWeatherNowStore())

watch(daysAPI, (newValue) => {
    timeLangNew(newValue)
})

watch(langModel,() => {
    timeLang( props.timezone);
})

function timeLang(newValue: number): void {
    if(langModel.value == "Русский") {
        timezoneCarent(newValue, props.firstDay.dt, ru, 'EEEEEE')
    } else {
        timezoneCarent(newValue, props.firstDay.dt, enUS, 'eee')
    }
}

function timeLangNew(newValue: any): void {
    if(langModel.value == "Русский") {
        timezoneCarent(newValue.city.timezone, props.firstDay.dt, ru, 'EEEEEE')
    } else {
        timezoneCarent(newValue.city.timezone, props.firstDay.dt, enUS, 'eee')
    }
}
let formattedDay = ref('');
let formattedHours = ref('');
let formattedShortWeek = ref('');

function timezoneCarent( timezone: number, daraMs: number, lang:object , week: string ) {
    let myDate = new Date(daraMs * 1000)
    let localTime = addSeconds(myDate, timezone - 21600);
    formattedDay.value = format(localTime, 'dd', { locale : lang});
    formattedHours.value = format(localTime, 'H:mm', { locale : lang});
    formattedShortWeek.value = format(localTime, week, { locale : lang});
}
timezoneCarent(props.timezone, props.firstDay.dt, ru, 'EEEEEE')

function showPlus() {
    return props.settingTempMetric === "metric" ? true : false
}

function langShow() {
    return langModel.value == "Русский" ? true : false
}

</script>


<template>
    <div class="weather-today-item" >
        <p class="weather-today-item-time">
            <div>
            <span class="weather-today-item-weekday">{{ formattedDay  }} </span>

                <span v-show="langShow()" class="weather-today-item-weekday">{{ formattedShortWeek }}.</span>
                <span v-show="!langShow()" class="weather-today-item-weekday">{{ formattedShortWeek }}.</span>
            </div>
            <span class="weather-today-item-time" v-show="!langShow()"> {{ formattedHours }}</span>
            <span class="weather-today-item-time" v-show="langShow()" >{{ formattedHours }}</span>

            </p>

        <img class="weather-today-item_img" :src="`https://openweathermap.org/img/wn/${firstDay.weather[0].icon}.png`" alt="">

        <div>
            <span class="weather-today-item-temp"><span v-show="showPlus()">+</span>{{Math.round(firstDay.main.temp_min) }}°  / </span>
            <span class="weather-today-item-temp"><span v-show="showPlus()">+</span>{{Math.round(firstDay.main.temp_max) }}°  </span>
        </div>

    </div>
</template>

<style scoped lang="scss">

</style>

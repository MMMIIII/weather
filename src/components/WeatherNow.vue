<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  settingTempMetric: String,
  feel: Number,
  maxTemp: Number,
  minTemp: Number,
  humidity: Number,
  pressure: Number,
  windSpee: Number,
  deg: null,
  time: Number,
})

function showPlus(temp: any): boolean {
  return props.settingTempMetric === "metric" && temp > 0 ? true : false
}

function showMetric(): boolean {
  return props.settingTempMetric === "metric" ? true : false
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
          <p class="info-description">
            <span>{{ t('min_temp') }}</span>
            <span v-show="showMetric()">°C</span>
            <span v-show="!showMetric()">°F</span>
          </p>
          <span>
            <span v-show="showPlus(minTemp)">+</span>{{ minTemp }}°
          </span>
        </div>

        <div class="max-temp">
          <p class="info-description">
            <span>{{ t('max_temp') }}</span>
            <span v-show="showMetric()">°C</span>
            <span v-show="!showMetric()">°F</span>
          </p>
          <span>
            <span v-show="showPlus(maxTemp)">+</span>{{ maxTemp }}°
          </span>
        </div>

        <div class="humidity">
          <p class="info-description">{{ t('humidity') }}</p>{{ humidity }}%
        </div>

        <div class="pressure">
          <p class="info-description">{{ t('pressure') }}</p>
          {{ pressure }}
          <p class="info-description">{{ t('pressure_info') }}</p>
        </div>

      </div>
      <div class="wind">
        <p class="info-description"></p>
        <span> {{ windSpee }} </span>
        <div>
          <p class="wind-description" v-show="!showMetric()"> <span>{{ t('wind_miles') }}</span></p>
          <p class="wind-description" v-show="showMetric()"> <span>{{ t('wind_meter') }}</span></p>
          <p class="wind-description">{{ deg }}</p>
        </div>
      </div>
    </div>

  </section>
</template>


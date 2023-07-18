<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../../stores/useWeather';
import { watch } from 'vue';


const { tempMetric } = storeToRefs(useWeatherStore())

watch(tempMetric, (newValue) => {
    useWeatherStore().tempMetricModifi(newValue);
})

const options: string[] = ["F°", "C°"]
</script>

<template>
    <q-select
    class="switch-temp-button q-mr-md"
    v-model="tempMetric"
    :options="options"
    :hide-dropdown-icon="true"
    />
</template>

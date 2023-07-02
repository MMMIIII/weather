<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherNowStore } from 'src/stores/useWeather';
import { watch } from 'vue';


let {tempMetric} = storeToRefs(useWeatherNowStore())

watch(tempMetric,(newValue) => {
    useWeatherNowStore().tempMetricModifi(newValue);
})

let options: string[] = ["F°","C°"]


</script>

<template>
    <q-select
    class="switch-temp-button xl q-mr-md"
    style="width: 110px; height: 65px; font-size: 44px; padding-top:5px; padding-left: 12px;"
    v-model="tempMetric"
    :options="options"
    :hide-dropdown-icon="true"
    >
    </q-select>
    <q-select
    class="switch-temp-button lg q-mr-sm"
    style="width: 90px; height: 55px; font-size: 38px;"
    v-model="tempMetric"
    :options="options"
    :hide-dropdown-icon="true"
    >
    </q-select>
    <q-select
    class="switch-temp-button md q-mr-sm"
    style="width: 50px; height: 40px; font-size: 28px;"
    v-model="tempMetric"
    :options="options"
    :hide-dropdown-icon="true"
    >
    </q-select>
    <q-select
    class="switch-temp-button xs q-mr-sm"
    style="width: 50px; height: 40px; font-size: 28px;"
    v-model="tempMetric"
    :options="options"
    :hide-dropdown-icon="true"
    >
    </q-select>
</template>

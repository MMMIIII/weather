<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from 'src/stores/useWeather';

let options: string[] = ["Русский","English"]

let {langModel} = storeToRefs(useWeatherStore())

</script>

<template >
    <q-select
        class="switch-lang xl row content-center q-pt-xs"
        style="width: 150px; height: 65px; font-size: 27px;"
        v-model="langModel"
        :options="options"
        :hide-dropdown-icon="true"
        options-selected-class="opa"

    >
    </q-select>

    <q-select
        class="switch-lang lg row content-center"
        style="width: 120px; height: 55px; font-size: 20px;"
        v-model="langModel"
        :options="options"
        :hide-dropdown-icon="true"

    >
    </q-select>
    <q-select
        class="switch-lang md row content-center"
        style="width: 85px; height: 40px; font-size: 16px;"
        v-model="langModel"
        :options="options"
        :hide-dropdown-icon="true"

    >
    </q-select>
    <q-select
        class="switch-lang xs row content-center"
        style="width: 85px; height: 40px; font-size: 16px;"
        v-model="langModel"
        :options="options"
        :hide-dropdown-icon="true"

    >
    </q-select>
</template>
<style>
</style>

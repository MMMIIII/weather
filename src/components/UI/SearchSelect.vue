<script setup lang="ts">
import { ref, watch } from 'vue'

let props = defineProps({
  stringOptions: Array,
})

const options = ref(props.stringOptions);

function filterFnAutoselect (val: string, update: Function) {
  update(
    () => {
      if (val === '') {
        options.value = props.stringOptions
      }
      else {
        const needle = val.toLowerCase()
        options.value = props.stringOptions.filter((v: string) => v.toLowerCase().indexOf(needle) > -1)
      }
    },
    ref => {
      if (val !== '' && ref.options.length > 0 && ref.getOptionIndex() === -1) {
        ref.moveOptionSelection(1, true)
        ref.toggleOption(ref.options[ ref.optionIndex ], true)
      }
    }
  )
}

const emit = defineEmits(['searchCall']);

let modelCity = ref("Бишкек");

watch(modelCity,() => {
  emit('searchCall',{
  modelCity: modelCity
});

})

</script>

<template>
  <div>
      <q-select

        class="q-search-select flex xl"
        table-colspan="20"
        filled
        v-model="modelCity"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFnAutoselect"
        :hide-dropdown-icon="true"
        style="width: 500px; font-size: 30px;"
      >
      </q-select>
      <q-select
        class="q-search-select lg"
        table-colspan="20"
        filled
        v-model="modelCity"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFnAutoselect"
        :hide-dropdown-icon="true"
        style="width: 300px; font-size: 25px;"
        :input-style="{ height:'60px'}"
    >
    </q-select>
      <q-select
        class="q-search-select md"
        table-colspan="20"
        filled
        v-model="modelCity"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFnAutoselect"
        :hide-dropdown-icon="true"
        style="width: 280px; font-size: 23px;"
        :input-style="{ height: '40px' }"
    >
    </q-select>
      <q-select
        class="q-search-select xs"
        table-colspan="20"
        filled
        v-model="modelCity"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFnAutoselect"
        :hide-dropdown-icon="true"
        style=" font-size: 23px;"
        :input-style="{ height: '40px' }"
    >
    </q-select>
  </div>




</template>

<style>

</style>

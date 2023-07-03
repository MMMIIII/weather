<script setup lang="ts">
import { ref,Ref, watch } from 'vue'

let props = defineProps({
  stringOptions: {
    type: Array,
    required: true
  },
})

const options = ref(props.stringOptions);

function filterFnAutoselect (val: string, update: Function)  {
  update(
    () => {
      if (val === '') {
        options.value = props.stringOptions
      } else {
        const needle = val.toLowerCase()
        options.value = props.stringOptions.filter((v: string) => v.toLowerCase().indexOf(needle) > -1)
      }
    },
    (ref: Ref<any>) => {
      if (val !== '' && ref.value.options.length > 0 && ref.value.getOptionIndex() === -1) {
        ref.value.moveOptionSelection(1, true)
        ref.value.toggleOption(ref.value.options[ref.value.optionIndex], true)
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

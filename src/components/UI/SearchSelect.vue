<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

let props = defineProps({
  stringOptions: {
    type: Array<string>,
    required: true
  },
})
const { locale } = useI18n();
const options = ref(props.stringOptions);

function filterFnAutoselect(val: string, update: Function) {
  update(
    () => {
      if (val === '') {
        options.value = props.stringOptions
      } else {
        const needle = val.toLowerCase()
        options.value = props.stringOptions.filter((v: string) => v.toLowerCase().indexOf(needle) > -1)
      }
    }
  )
}

const emit = defineEmits(['searchCall']);

const modelCity = ref("Бишкек");

watch(modelCity, () => {
  emit('searchCall', {
    modelCity: modelCity
  });
})

watch(locale, (newLang) => {
  if (newLang === 'ru') {
    modelCity.value = 'Бишкек'
  } else {
    modelCity.value = 'Bishkek'
  }
}, { immediate: true })
</script>

<template>
  <div>
    <q-select
      class="q-search-select flex"
      table-colspan="20"
      filled v-model="modelCity" 
      use-input 
      hide-selected
      fill-input input-debounce="0" 
      :options="options" 
      @filter="filterFnAutoselect" 
      :hide-dropdown-icon="true"
    />
    
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'

const $q = useQuasar();
const langs = ref([
  {
    label: 'Русский',
    value: 'ru'
  },
  {
    label: 'English',
    value: 'en-us'
  }
]);

const lang = ref<any>('Русский');
const { locale } = useI18n();

watch(lang, (newLang) => {
  if (newLang && newLang.value) {
    try {
      import(`../../i18n/${newLang.value}/index.ts`).then(language => {
        $q.lang.set(language.default);
      });
      locale.value = newLang.value;
    } catch (error) {
      console.error(error);
    }
  }

}, { immediate: true });
</script>

<template>
  <q-select
    class="switch-lang row content-center q-pt-xs"
    v-model="lang"
    :options="langs"
    :hide-dropdown-icon="true"
  />
</template>
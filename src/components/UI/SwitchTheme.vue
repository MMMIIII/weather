<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch, Ref } from 'vue';

const $q = useQuasar();
const modelToggle: Ref<boolean> = ref(false);
$q.dark.set(true);

function switchTheme(): void {
  $q.dark.toggle();
}

watch(modelToggle, () => {
  switchTheme();
});
</script>

<template>
  <div>
    <q-toggle
      class="q-toggle"
      v-model="modelToggle"
      checked-icon="dark_mode"
      unchecked-icon="light_mode"
      toggle-order="ft"
    />
  </div>
</template>
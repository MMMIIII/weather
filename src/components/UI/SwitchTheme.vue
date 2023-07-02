<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch, Ref } from 'vue';

const $q = useQuasar();
const modelToggle: Ref<boolean> = ref(false);
$q.dark.set(true);

function switchTheme(): void {
  console.log($q.dark.mode);
  $q.dark.toggle();
}

watch(modelToggle, () => {
  switchTheme();
});
</script>

<template>
  <div>
    <q-toggle
      class="xl"
      size="90px"
      v-model="modelToggle"
      checked-icon="dark_mode"
      color=""
      unchecked-icon="light_mode"
      toggle-order="ft"
    />
    <q-toggle
      class="lg"
      size="80px"
      v-model="modelToggle"
      checked-icon="dark_mode"
      color=""
      unchecked-icon="light_mode"
      toggle-order="ft"
    />
    <q-toggle
      class="md"
      size="55px"
      v-model="modelToggle"
      checked-icon="dark_mode"
      color=""
      unchecked-icon="light_mode"
      toggle-order="ft"
    />
    <q-toggle
      class="xs"
      size="60px"
      v-model="modelToggle"
      checked-icon="dark_mode"
      color=""
      unchecked-icon="light_mode"
      toggle-order="ft"
    />
  </div>
</template>





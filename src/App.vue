<template >
  <div class="weaher-home">
    <suspense><router-view /></suspense>
  </div>

  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

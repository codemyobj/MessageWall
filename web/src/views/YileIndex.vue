<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useMainPinia from '../store'
import axios from 'axios'

const mainPinia = useMainPinia()

const aa = ref(0)

const count = computed(() => mainPinia.count)

onMounted(() => {
  // axios.post('/api/sigin/match', {
  //   data: 'aaa',
  //   pwd: 'bbb',
  // })
})
</script>
<template>
  <div>
    <p>{{ count }}</p>
  </div>
  <button @click="mainPinia.increment">++</button>
</template>
<style scoped lang="less">
div {
  p {
    color: @warning-color; 
  }
}
</style>

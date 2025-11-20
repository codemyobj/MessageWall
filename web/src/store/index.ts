import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMainPinia = defineStore('main', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment,
  }
})

export default useMainPinia

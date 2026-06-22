import { ref } from 'vue'
import { defineStore } from 'pinia'
import { note } from '../../mock/index.ts'
import type { Card } from '@/types'

const useMainPinia = defineStore('main', () => {
  const cardList = ref<Card[]>([])

  function getCardList() {
    cardList.value = note.data
  }

  return {
    cardList,
    getCardList,
  }
})

export default useMainPinia

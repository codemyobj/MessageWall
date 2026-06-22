<script setup lang="ts">
import { computed } from 'vue'
import { date2Moment } from '@/utils'
import { cardColor, label } from '@/consts'

const props = defineProps<{
  cardContent: {
    title: string
    message: string
    moment: Date
    type: number
    like: number
    comment: number
    name: string
    isLiked: boolean
    imgurl: number
    label: number
  }
  cardWidth?: string
}>()

const card = computed(() => props.cardContent)
</script>
<template>
  <div
    class="flex flex-col justify-between h-[230px] w-[288px] bg-[#fcafa24d] px-[20px] py-[10px] cursor-pointer"
    :style="{
      background: cardColor[card.imgurl],
      width: cardWidth || '288px',
    }"
  >
    <div class="text-[14px] text-[#5B5B5B] flex justify-between">
      <div>{{ date2Moment(card.moment) }}</div>
      <div>{{ label[card.type][card.label] }}</div>
    </div>
    <div
      class="flex-1 my-[15px] h-[140px] text-[18px] letter-spacing-[0] text-justify leading-[22px] font-[fa]"
    >
      {{ card?.message }}
    </div>
    <div class="flex justify-between">
      <div class="flex justify-between items-center text-[#5B5B5B]">
        <div class="flex items-center">
          <span class="iconfont icon-xiai"></span>
          <span class="ml-[2px]">{{ card?.like || 0 }}</span>
        </div>
        <div class="flex items-center ml-[5px]">
          <span class="iconfont icon-liuyan"></span>
          <span class="ml-[2px]"> {{ card?.comment || 0 }} </span>
        </div>
      </div>
      <div class="font-[fa] text-[16px] text-[#202020] text-right">
        {{ card.name }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.tran {
  transition: all 0.3s;
}
</style>

<script setup lang="ts">
import img1 from '@/assets/images/pic1.png'

const props = defineProps<{
  photo: {
    like: number
  }
}>()
</script>
<template>
  <div class="container-img relative">
    <img class="w-full" :src="img1" alt="" />
    <div
      class="opacity-0 background-filter absolute top-[0] left-[0] bg-[rgba(0,0,0,0.2)] w-full h-full z-[10] transition-all duration-300"
    ></div>
    <div
      class="opacity-0 background-filter absolute left-[8px] top-[8px] bg-[rgba(255,255,255,0.8)] rounded-[20px] h-[28px] px-[10px] flex items-center backdrop-blur-sm z-[20] cursor-pointer transition-all duration-300"
    >
      <span class="iconfont icon-xiai text-[#949494] pr-[4px]"></span>
      <span class="text-[#202020]">{{ photo.like }}</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.container-img {
  margin-bottom: 4px;
  break-inside: avoid;
  &:hover {
    .background-filter {
      opacity: 1;
    }
  }
}
</style>

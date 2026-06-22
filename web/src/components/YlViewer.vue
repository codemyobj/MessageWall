<script setup lang="ts">
import pic from '@/assets/images/pic1.png'

defineProps<{
  pic: string
  visble: boolean
}>()

const emits = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>
<template>
  <transition name="view">
    <div v-if="visble">
      <div class="bg-filter mt-[52px]"></div>
      <div
        class="flex items-center justify-between fixed top-[0] left-[0] h-full w-[calc(100%-360px)] mt-[60px] z-[999]"
      >
        <div class="switch ml-[20px]" @click="emits('prev')">
          <span class="iconfont icon-xiangzuo1"></span>
        </div>
        <div class="px-[100px] border-box h-full">
          <img class="w-full h-[90%] object-contain" :src="pic" />
        </div>
        <div class="switch mr-[20px]" @click="emits('next')">
          <span class="iconfont icon-xiangyou1"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped lang="less">
.bg-filter {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  height: 100%;
  width: 100%;
}

.switch {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #949494;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  opacity: 0.5;
  transition: @tr;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.view {
  &-enter {
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>

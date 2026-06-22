<script setup lang="ts">
import YlButton from './YlButton.vue'
defineProps<{
  visible: boolean
  title: string
}>()
const emits = defineEmits<{
  (e: 'update:visible', bool: boolean): void
  (e: 'modal-cancel'): void
  (e: 'modal-confirm'): void
}>()

const modalConfirm = () => {
  emits('modal-confirm')
}
</script>
<template>
  <transition name="modal">
    <div
      v-show="visible"
      class="modal w-[360px] fixed right-[0px] top-[52px] z-[1000] flex flex-col justify-between"
    >
      <div class="flex justify-between text-[16px] text-[#202020] p-[20px]">
        <p class="font-bold">{{ title }}</p>
        <span
          class="iconfont icon-guanbi cursor-pointer pl-[5px]"
          @click="emits('modal-cancel')"
        />
      </div>
      <div class="modal-main h-full overflow-y-scroll px-[20px]">
        <slot></slot>
      </div>
      <div class="flex justify-between box-border p-[20px]">
        <YlButton size="max" nom="secondary" @click="emits('modal-cancel')">
          丢弃
        </YlButton>
        <YlButton
          class="w-[200px]"
          size="max"
          nom="primary"
          @click="modalConfirm"
        >
          确定
        </YlButton>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
.modal {
  height: calc(100vh - 52px);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      transform: translateX(0);
    }
  }
  &-leave {
    &-from {
      transform: translateX(0);
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      transform: translateX(360px);
    }
  }

  .modal-main {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
}
</style>

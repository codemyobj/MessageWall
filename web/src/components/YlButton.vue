<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const props = withDefaults(
  defineProps<{
    size: string
    nom: string
  }>(),
  {
    size: 'base',
    nom: 'primary',
  },
)
</script>
<template>
  <button :class="[size, nom]" class="yl-button">
    <slot></slot>
  </button>
</template>
<style scoped lang="less">
.yl-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 20px;
}
.base {
  min-width: 80px;
  height: 36px;
  border-radius: 18px;
  padding: 0 20px;
}
.small {
  min-width: 72px;
  height: 48px;
  border-radius: 24px;
}

.primary {
  background: @gray-1;
  color: @gray-10;
}

.secondary {
  background: @gray-10;
  color: @gray-1;
  border: 1px solid @gray-1;
}

.cprimary {
  background: @primary-color;
  color: @gray-10;
  font-weight: 600;
}
.csecondary {
  background: @gray-10;
  color: @gray-1;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => (route.query.id !== '1' ? '留言墙' : '照片墙'))
</script>
<template>
  <div class="pt-[45px] pb-[10px] text-[600] text-center">
    <div class="text-[56px]">{{ title }}</div>
    <div class="text-[#5b5b5b] text-[14px]">
      很多事情值得记录，当然也值得回味。
    </div>
  </div>
</template>

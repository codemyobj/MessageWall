<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>
<template>
  <top-bar />
  <video
    src="@/assets/images/qm1.mp4"
    autoplay
    muted
    loop
    class="fixed top-0 left-0 z-[-1] h-[800px]"
  />
  <div class="container overflow-scroll  overflow-x-hidden">
    <router-view></router-view>
    <footer-bar />
  </div>
</template>

<style lang="less" scoped>
.container {
  height: calc(100vh - 52px);
}
</style>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
</script>
<template>
  <div class="wall-index">
    <top-bar />
    <video
      src="@/assets/images/qm1.mp4"
      autoplay
      muted
      loop
      class="bg-video"
    ></video>
    <router-view></router-view>
  </div>
</template>
<style scoped lang="less">
.wall-index {
  .bg-video {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    height: 800px;
  }
}
</style>

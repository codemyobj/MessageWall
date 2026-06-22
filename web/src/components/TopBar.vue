<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import YlButton from './YlButton.vue'
import { computed } from 'vue'

const id = computed(() => route.query.id)
</script>
<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/yksg.svg" class="logo-img" />
      <p class="logo-name">一刻时光</p>
    </div>
    <div class="menu">
      <yl-button
        size="base"
        :nom="id === '0' ? 'cprimary' : 'csecondary'"
        class="menu-message-wall"
        @click="router.push({ query: { id: '0' } })"
        >留言墙</yl-button
      >
      <yl-button
        size="base"
        :nom="id === '1' ? 'cprimary' : 'csecondary'"
        class="menu-photo-wall"
        @click="router.push({ query: { id: '1' } })"
        >照片墙</yl-button
      >
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>
<style scoped lang="less">
.top-bar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  box-shadow: 0 0 4px 0 #0000001a;
  padding: 0 30px;
  .logo {
    width: 25%;
    display: flex;
    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 700;
      padding-left: 10px;
    }
  }
  .menu {
    display: flex;
    .menu-message-wall {
      margin-right: 24px;
    }
  }
  .user {
    width: 25%;
    justify-content: right;
    display: flex;
    .user-head {
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background: linear-gradient(180deg, #7be7ff 2%, #1e85e2);
    }
  }
}
</style>

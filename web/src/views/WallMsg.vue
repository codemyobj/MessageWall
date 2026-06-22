<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { label } from '@/consts'
import TitleBar from '@/components/TitleBar.vue'
import Tabs from '@/components/Tabs.vue'
import TabsItem from '@/components/TabsItem.vue'
import NoteCard from '@/components/NoteCard.vue'
import YlModal from '@/components/YlModal.vue'
import { note, photo } from '../../mock/index.ts'
import NewCard from '@/components/NewCard.vue'
import CardDetail from '@/components/CardDetail.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import YlViewer from '@/components/YlViewer.vue'

import { insertwall } from '@/api'

// 响应式状态
const currentTabIndex = ref(0)
const addButtonBottom = ref(30)
const modalTitle = ref('')
const isModalVisible = ref(false)
const currentCardIndex = ref(-1)
const isImageViewerVisible = ref(false)
const currentImageUrl = ref('')

// 路由相关
const route = useRoute()
const wallId = computed(() => route.query.id as string)
const tabs = computed(() => label[Number(wallId.value)])

// 滚动事件处理
const handleScroll = () => {
  const container = document.querySelector('.container')
  if (!container) return
  
  const scrollTop = container.scrollTop
  const windowHeight = container.clientHeight
  const scrollHeight = container.scrollHeight

  addButtonBottom.value = scrollTop + windowHeight >= scrollHeight - 230 ? 230 : 30
}

// 卡片选择处理
const handleCardSelected = (index: number) => {
  modalTitle.value = ''
  
  if (index === currentCardIndex.value) {
    isModalVisible.value = false
    setTimeout(() => {
      currentCardIndex.value = -1
    }, 200)
    return
  }
  
  currentCardIndex.value = index
  isModalVisible.value = true
  
  if (wallId.value === '1') {
    isImageViewerVisible.value = true
    currentImageUrl.value = photo.data[index].imgurl
  }
}

// 打开添加卡片模态框
const openAddCardModal = () => {
  modalTitle.value = '写留言'
  isModalVisible.value = true
}

// 关闭模态框
const closeModal = () => {
  isImageViewerVisible.value = false
  isModalVisible.value = false
  modalTitle.value = '写留言'
  setTimeout(() => {
    currentCardIndex.value = -1
  }, 200)
}

// 图片预览切换
const handleImagePreviewChange = (type: 'prev' | 'next') => {
  const maxIndex = photo.data.length - 1
  
  if (currentCardIndex.value <= 0 && type === 'prev') return
  if (currentCardIndex.value >= maxIndex && type === 'next') return

  currentCardIndex.value += type === 'prev' ? -1 : 1
  currentImageUrl.value = photo.data[currentCardIndex.value].imgurl
}

// 提交新卡片
const handleNewCardConfirm = async () => {
  try {
    const data = {
      type: 0,
      message: '测试',
      name: '测试',
      userId: '2',
      moment: new Date(),
      label: 0,
      color: 3,
      imgurl: 'www.huohuo90.com',
    }
    
    const response = await insertwall(data)
    console.log('提交成功:', response)
    // 可以在这里添加刷新数据的逻辑
  } catch (error) {
    console.error('提交失败:', error)
  }
}

// 监听路由变化
watch(wallId, () => {
  currentCardIndex.value = -1
  isImageViewerVisible.value = false
  isModalVisible.value = false
  currentTabIndex.value = 0
})

// 生命周期钩子
onMounted(() => {
  const container = document.querySelector('.container')
  container?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  const container = document.querySelector('.container')
  container?.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="flex flex-col justify-center">
    <title-bar />
    <tabs>
      <tabs-item
        :class="
          currentTabIndex === index && 'border rounded-[14px] text-[#202020] '
        "
        v-for="(item, index) in tabs"
        @click="currentTabIndex = index"
      >
        {{ item }}
      </tabs-item>
    </tabs>
  </div>
  <div class="flex flex-wrap justify-center" v-show="wallId === '0'">
    <note-card
      v-for="(item, index) in note.data"
      class="m-[6px]"
      :key="item.id"
      :style="{
        border: index === currentCardIndex ? '1px solid #3873f0' : '',
      }"
      :card-content="item"
      @click="handleCardSelected(index)"
    />
  </div>
  <div v-show="wallId === '1'" class="w-[88%] mx-auto columns-5 gap-[4px]">
    <photo-card
      v-for="(item, index) in photo.data"
      :key="item.id"
      :photo="item"
      @click="handleCardSelected(index)"
    />
  </div>
  <div
    :style="{ bottom: addButtonBottom + 'px' }"
    class="w-[56px] h-[56px] rounded-[28px] bg-[#202020] flex items-center justify-center shadow text-[#fff] fixed right-[30px] text-[24px] transition-all duration-300 cursor-pointer"
    @click="openAddCardModal"
  >
    <span class="iconfont icon-tianjia"></span>
  </div>
  <yl-modal
    v-model:visible="isModalVisible"
    :title="modalTitle"
    @modal-cancel="closeModal"
  >
    <new-card
      v-if="currentCardIndex === -1"
      :labels="tabs"
      @modal-confirm="handleNewCardConfirm"
    />
    <card-detail v-else :card="note.data[currentCardIndex]" />
  </yl-modal>
  <yl-viewer
    :visble="isImageViewerVisible"
    :pic="currentImageUrl"
    @prev="handleImagePreviewChange('prev')"
    @next="handleImagePreviewChange('next')"
  />
</template>

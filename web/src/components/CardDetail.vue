<script setup lang="ts">
import type { Card } from '@/types'
import { avatars } from '@/consts'
import { date2Moment } from '@/utils'
import { comment } from '../../mock'
import NoteCard from './NoteCard.vue'
import YlButton from './YlButton.vue'

defineProps<{
  card: Card
}>()
</script>
<template>
  <div class="relative">
    <div class="fixed top-[0] left-[0] p-[20px] flex items-center text-[16px]">
      <p class="text-[#3B73F0] mr-[30px]">联系墙主撕掉该便签</p>
      <p class="text-[#F67770]">举报</p>
    </div>
    <template v-if="card">
      <note-card :card-content="card" card-width="unset" />
    </template>
    <div class="mt-[12px]">
      <textarea
        class="w-full bg-inherit border-[1px] border-[rgba(148,148,148,1)] resize-none box-border"
      />
      <div class="flex justify-between">
        <input
          class="bg-inherit w-[200px] border-[1px] border-[rgba(148,148,148,1)] box-border"
          type="text"
        />
        <yl-button>评论</yl-button>
      </div>
    </div>
    <p class="pt-[30px] pb-[20px]">评论{{ card.comment }}</p>
    <div>
      <template v-for="item in comment.data">
        <div class="flex pb-[30px]">
          <div
            class="w-[28px] h-[28px] rounded-[14px] overflow-hidden"
            :style="{ background: avatars[item.imgurl] }"
          />
          <div class="flex-1 pl-[8px]">
            <div class="flex items-center">
              <p class="font-[700] pr-[4px]">{{ item.name }}</p>
              <p class="text-[12px] text-[#949494]">
                {{ date2Moment(item.moment) }}
              </p>
            </div>
            <p class="pt-[5px]">
              {{ item.message }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

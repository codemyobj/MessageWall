<script setup lang="ts">
import { ref } from 'vue'
import { cardColor, newCardColor } from '@/consts'

const currentColorIndex = ref(0)
const currentLabelIndex = ref(0)

defineProps<{
  labels: string[] | undefined
}>()

const messgae = ref('')
const name = ref('')
</script>
<template>
  <div class="flex">
    <p
      v-for="(color, index) in newCardColor"
      class="w-[24px] h-[24px] mr-[8px] box-border cursor-pointer rounded-[4px]"
      :style="{
        background: color,
        border:
          currentColorIndex === index ? '1px solid rgba(59,115,240,1)' : 'none',
      }"
      @click="currentColorIndex = index"
    ></p>
  </div>
  <div
    class="w-full box-border h-[240px] my-[10px] p-[14px] transition-all duration-200"
    :style="{ background: cardColor[currentColorIndex] }"
  >
    <textarea
      v-model="messgae"
      class="bg-transparent resize-none h-[172px] w-full p-[8px] box-border border-transparent font-[fa] text-[16px]"
      type="text"
      placeholder="留言..."
      maxlength="96"
    ></textarea>
    <input
      v-model="name"
      type="text"
      placeholder="签名"
      class="w-full px-[8px] box-border bg-transparent border-[1px] border-[#fff] h-[36px] leading-5 font-[fa] text-[16px]"
    />
  </div>
  <div class="my-[15px]">
    <p>选择标签</p>
    <div class="flex flex-wrap">
      <template v-for="(label, index) in labels">
        <p
          class="text-[#585858] px-[8px] py-[2px] rounded-[16px] mt-[20px] cursor-pointer mr-[8px] transition-all duration-200"
          :style="{
            background: currentLabelIndex === index ? '#ebebeb' : '',
            fontWeight: currentLabelIndex === index ? 'bold' : 'normal',
            color: currentLabelIndex === index ? '#202020' : '#585858',
          }"
          @click="currentLabelIndex = index"
        >
          {{ label }}
        </p>
      </template>
    </div>
  </div>
  <div class="font-bold text-[16px] mb-[12px] block">
    <p>免责声明</p>
    <p class="text-[#949494] text-[14px]">
      一乐时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
      1、反对先发所确定的基本原则的；<br />
      2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
      3、损害国家荣誉和利益的；<br />
      4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
      5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
      6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
      7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
      8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
      9、含有法律、行政法规禁止的其他内容的。
    </p>
  </div>
</template>

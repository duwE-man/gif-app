<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, watchPostEffect } from "vue"
import _ from "lodash"

const props = defineProps<{gifs: Array<string>}>()
const emit = defineEmits(["onScrollEvent"])

const grid = ref()
const items = ref()

onMounted(() => {
  window.addEventListener('scroll', _.throttle(handleScroll, 300))
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(items, () => {
  resizeAllGridItems() // This is i think bad solution
})
watch(props, () => {
  if (items.value)
    resizeAllGridItems() // Same
}, {deep: true})

/* Masonry javascript mechanism */
const resizeGridItem = (item: HTMLDivElement) => {
  const rowHeight = parseInt(grid.value?.style.gridAutoRows ?? "")
  const rowGap = parseInt(grid.value?.style.rowGap ?? "")

  const clientRect = item.querySelector(".content")?.getBoundingClientRect()
  if (!clientRect) return
  const rowSpan = Math.ceil((clientRect.height+rowGap)/(rowHeight+rowGap))
  item.style.gridRowEnd = "span " + rowSpan
}
const resizeAllGridItems = () => {
  items.value.forEach((item: HTMLDivElement) => {
    resizeGridItem(item)
  })
}
/* Handle scrolling mechanism */
let last = 0
const handleScroll = async () => {
  const isScrollDown = last < window.scrollY
  last = window.scrollY
  if ((window.scrollY >= (Math.round(document.body.scrollHeight/2)) - (document.body.offsetHeight/2)) && (isScrollDown)) {
    emit("onScrollEvent")
    resizeAllGridItems()
  }
}
</script>
<template>
  <div class="trending-content" ref="grid" :style="{'gap': '10px', 'grid-auto-rows': '20px'}">
    <div class="gif" v-for="url in gifs" :key="url" ref="items">
      <div class="content">
        <img :src="url" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.trending-content {
  $grid-layout-gap: 10px;
  $grid-column-count: 4;
  $grid-item--min-width: 220px;

  max-width: calc(($grid-item--min-width*4) + ($grid-layout-gap*5));
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, max-content));
  margin: auto;
  gap: 10px;
  grid-auto-rows: 20px;
}
@media (max-width: 950px) {
  .trending-content {
    grid-template-columns: repeat(3, minmax(220px, max-content));
  }
}
@media (max-width: 730px) {
  .trending-content {
    grid-template-columns: repeat(2, minmax(220px, max-content));
  }
}
@media (max-width: 520px) {
  .trending-content {
    grid-template-columns: repeat(1, minmax(220px, max-content));
  }
}
</style>
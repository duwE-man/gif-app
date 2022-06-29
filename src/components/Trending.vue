<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRouter } from "vue-router";
import { store } from "../store"

import Gifs from "./Gifs.vue"

const router = useRouter()
const gotoSearchPage = () => {
  router.push("searching")
}

const gifUrls = computed(() => store.state.displayedGifs)

onMounted(async() => {
  await store.dispatch.getFeaturedGifs(50)
})

const onScroll = async () => {
  await store.dispatch.getFeaturedNext(50)
}
</script>
<template>
  <div class="trending-page">
    <div class="trending-header">
      <div class="header">Featured GIFs:</div>
      <div class="search" @click="gotoSearchPage">Search</div>
    </div>
    <gifs :gifs="gifUrls" @on-scroll-event="onScroll"/>
  </div>
</template>
<style lang="scss">
.trending-page  {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.trending-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  
  .header {
    font-size: 3em;
  }
  .search {
    margin-left: auto;
    background-color: black;
    color: white;
    border-radius: 10px;
    font-size: 1.5em;
    padding: 10px;
    cursor: pointer;
  }
  .search:hover {
    background-color: lighten($color: black, $amount: 20);
  }
}
</style>
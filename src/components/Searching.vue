<template>
  <div class="searching-page">
    <div class="search-button">
      <input v-model="searchTerm" type="text" id="fname" name="gif" placeholder="Seach for gifs..." @keyup="requestGifs" @keydown="resetTimer">
    </div>
    <gifs :gifs="gifUrls"/>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { store } from "../store"

import Gifs from "./Gifs.vue"

onMounted(() => {
  store.commit.CLEAR_GIFS()
})

const interval = 200
let timer: number | undefined = undefined
const searchTerm = ref("")

const gifUrls = computed(() => store.state.displayedGifs)

const getGifs = async() => {
  if (searchTerm.value === "") {
    store.commit.CLEAR_GIFS()
    return
  }
  await store.dispatch.getSearchedGifs({searchTerm: searchTerm.value, limit: 50})
}

const requestGifs = () => {
  clearTimeout(timer)
  timer = setTimeout(getGifs, interval)
}
const resetTimer = () => {
  clearTimeout(timer)
}
</script>
<style lang="scss" scoped>
.searching-page  {
  height: 100%;
  display: flex;
  flex-direction: column;
}
input[type=text], select {
  width: 50%;
  padding: 30px 40px;
  margin: 2em 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 2em;
}

.search-button {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.trending-content {
  columns: 6 200px;
  column-gap: 1rem;
  div {
    color: white;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: system-ui;
  }
}
</style>
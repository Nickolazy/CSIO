<template>
  <div @click="openNews" class="news-shares-item">
      <h3 class="news-shares-item-title news-main-item-title">
        {{ n.title }}
      </h3>

      <div class="news-shares-item-description news-main-item-description">
        <p>
          {{ n.content }}
        </p>
      </div>
		</div>
    <NewsPage v-if="isNewsOpen" 
      @close="handleClose" 
      class="courses-all"
      :n="n"/>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import NewsPage from '../Opened sections/NewsPage.vue';

  const props = defineProps({
    n: {
      type: Object,
      required: true
    }
  })

  const isNewsOpen = ref(false);

  const openNews = () => {
    isNewsOpen.value = true;
  }

  const handleClose = () => {
    isNewsOpen.value = false;
  }
</script>

<style scoped>
  .courses-all {
      position: fixed;
      top: 0;
      left: 0;
      z-index: calc(var(--z-index-big) + 1000);
      width: 100%;
      height: 100vh;

      background: rgba(0, 0, 0, 0.8);
    }
</style>
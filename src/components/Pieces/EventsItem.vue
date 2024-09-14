<template>
  <div @click="openNews" class="news-shares-item">
    <div class="news-shares-item-datatime-wrapper">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 2V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 2V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 10H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="news-shares-item-datatime-text">
        <p>{{ event.dates }}</p>
      </span>
    </div>

    <h3 class="news-shares-item-title">
      {{ event.title }}
    </h3>

    <div class="news-shares-item-description">
      <p>
        {{ event.content }}
      </p>
    </div>
	</div>
  <EventsPage v-if="isNewsOpen" 
      @close="handleClose" 
      class="courses-all"
      :event="event"/>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import EventsPage from '../Opened sections/EventsPage.vue';

  const props = defineProps({
    event: {
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
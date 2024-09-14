<template>
  <div class="section news">
    <div class="news-title-wrapper">
      <div class="container">
        <h2 class="heading-two news-title">
          Новости и события
        </h2>
      </div>
    </div>
            
    <div class="container">
      <h2 class="heading-three news-shares-title">
        Акции
      </h2>
    </div>
    <div class="news-shares-wrapper">
			<ButtonPrevious />

      <div class="news-shares-list"> 
        <SalesItem v-for="(sale, index) in sales"
          :key="index"
          :sale="sale"/>
			</div>

			<ButtonNext />
    </div>

    <div class="container">
      <h2 class="heading-three news-shares-title">
        Новости
      </h2>
    </div>
    <div class="news-shares-wrapper">
			<ButtonPrevious />

			<div class="news-shares-list">
        <NewsItem 
          v-for="(n, index) in news"
          :key="index"
          :n="n"/>
			</div>

      <ButtonNext />     
    </div>

    <div class="container">
      <h2 class="heading-three news-shares-title">
        События
      </h2>
    </div>
    <div class="news-shares-wrapper">
      <ButtonPrevious />

			<div class="news-shares-list">
        <EventsItem v-for="(event, index) in events"
          :key="index"
          :event="event"/>
			</div>

      <ButtonNext />
		</div>
  </div>
</template>

<script setup>
  import ButtonPrevious from '../Pieces/ButtonPrevious.vue';
  import ButtonNext from '../Pieces/ButtonNext.vue';
  import SalesItem from '../Pieces/SalesItem.vue';
  import NewsItem from '../Pieces/NewsItem.vue';
  import EventsItem from '../Pieces/EventsItem.vue';

  import { computed, onMounted, ref, nextTick } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import { initializeSlider } from '../../news-slider.js';

  const store = useDataStore();

  const sales = computed(() => store.Акции);
  const news = computed(() => store.Новости);
  const events = computed(() => store.События);

  onMounted(async () => {
    await store.fetchNews();
    await store.fetchEvents();
    await store.fetchSales();

    nextTick(() => {
      initializeSlider();
    });
  });
</script>

<style scoped>

</style>
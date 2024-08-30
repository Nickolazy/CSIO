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
        <div v-for="n in news">
          <SalesItem />
        </div>
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
        <div v-for="n in news">
          <NewsItem />
        </div>
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
				<div v-for="n in news">
          <EventsItem />
        </div>
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


  const news = [1, 2, 3, 4];
</script>

<style scoped>

</style>
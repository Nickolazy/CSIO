<template>
  <div class="section teachers">
    <div class="container">
      <h2 class="heading-two teachers-title">
        Вебинары и семинары с экспертами
      </h2>
      <div class="teachers-subtitle">
        <p>
          Учитесь у лучших — опытные преподаватели, готовые<br/>
          поделиться своими знаниями
        </p>
      </div>

      <div class="teachers-list">
        <div v-for="t in teachers">
          <TeacherCard />
        </div>
      </div>

      <div class="teachers-all-events-button-wrapper">
        <button @click="openWebinars" class="button banner-button-sing-up teachers-all-events-button" type="button">
          Все мероприятия
        </button>
      </div>
    </div>

    <div v-if="isAllWebinarsOpened" class="courses-all">
      <WebinarsAll @close="handleClose" :isAllWebinarsOpened="isAllWebinarsOpened"/>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import TeacherCard from '../Pieces/TeacherCard.vue';
  import WebinarsAll from '../Opened sections/WebinarsAll.vue';
  import ButtonNext from '../Pieces/ButtonNext.vue';
  import ButtonPrevious from '../Pieces/ButtonPrevious.vue';

  const teachers = [1, 2, 3];
  const isAllWebinarsOpened = ref(false);

  const openWebinars = () => {
    isAllWebinarsOpened.value = (true);
  }

  const handleClose = () => {
    isAllWebinarsOpened.value = false;
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

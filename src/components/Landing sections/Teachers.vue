<template>
  <div class="section teachers container-teachers">
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
    </div>
    <div class="teachers-slider">
      <ButtonPrevious/>

      <div class="teachers-list">
        <TeacherCard 
          v-for="(teacher, index) in teachers"
          :key="index"
          :teacher="teacher"/>
      </div>

      <ButtonNext class="button-teachers"/>
    </div>
    <div class="container">
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
  import { ref, onMounted, computed, nextTick } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import TeacherCard from '../Pieces/TeacherCard.vue';
  import WebinarsAll from '../Opened sections/WebinarsAll.vue';
  import ButtonNext from '../Pieces/ButtonNext.vue';
  import ButtonPrevious from '../Pieces/ButtonPrevious.vue';

  import { initializeTeachersSlider } from '../../teachers-slider.js'

  const store = useDataStore();

  onMounted(async () => {
    await store.fetchTeachers();

    nextTick(() => {
      initializeTeachersSlider();
    });
  });

  const teachers = computed(() => store.Преподаватели);
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

  .container-teachers {
    position: relative;
    overflow: hidden;
  }

  /* .teachers-list {
    display: flex;
    justify-content: center;
    column-gap: 300px;
  } */
</style>

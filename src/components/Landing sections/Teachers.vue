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
        <button @click=" " class="button banner-button-sing-up teachers-all-events-button" type="button">
          Все мероприятия
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TeacherCard from '../Pieces/TeacherCard.vue';
  import ButtonNext from '../Pieces/ButtonNext.vue';
  import ButtonPrevious from '../Pieces/ButtonPrevious.vue';

  const teachers = [1, 2, 3];
</script> 

<style scoped>

</style>

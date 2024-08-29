<template>
  <div class="teachers">
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
        <button class="banner-button-sing-up teachers-all-events-button" type="button">
          Все мероприятия
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TeacherCard from '../Pieces/TeacherCard.vue';

  const teachers = [1, 2, 3];
</script> 

<styles scoped>
  
</styles>

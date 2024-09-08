<template>
  <div @click="openTeacherPage" class="teachers-item">
    <div class="teacher-avatar-wrapper">
      <img
        src="../../assets/img/teachers/teacher.png"
        alt="Teacher"
        class="teacher-avatar"
        loading="lazy">
    </div>

    <div class="teacher-tilted-block">
      <div class="teacher-tilted-block-line"></div>
      <span class="teacher-tilted-block-name">
        Максим Андреев
      </span>
      <span class="teacher-tilted-block-role">
        Ведущий аналитик данных
      </span>
    </div>

      <div class="teacher-main-text-block">
        <ul class="teacher-main-text-list">
          <li class="teacher-main-text-item">
            Big Data и бизнес-аналитика
          </li>
          <li class="teacher-main-text-item">
            Визуализация данных с Tableau
          </li>
          <li class="teacher-main-text-item">
            Машинное обучение для анализа данных
          </li>
        </ul>
      </div>
  </div>
  <TeacherPage v-if="isTeacherPageOpened" 
    @close="handleClose"
    class="courses-all"/>
</template>

<script setup>
  import { ref } from 'vue';
  import TeacherPage from '../Opened sections/TeacherPage.vue'

  const isTeacherPageOpened = ref(false);

  const openTeacherPage = () => {
    isTeacherPageOpened.value = true;
  }

  const handleClose = () => {
    isTeacherPageOpened.value = false;
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
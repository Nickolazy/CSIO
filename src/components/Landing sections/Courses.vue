<template>
  <div class="section courses">
    <div class="container">
      <h2 class="heading-two courses-title">
        Наши курсы – ваш путь к успеху
      </h2>
      <div class="courses-subtitle">
        <p>
          Выберите направление и курс, который поможет вам<br/>
          раскрыть профессиональный потенциал
        </p>
      </div>

      <div class="courses-list">
        <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-one">
          <h3 class="courses-item-title courses-item-title-color-one">
            Менеджмент
          </h3>
          <div class="courses-item-count courses-item-bg-color-two">
            <span class="courses-item-title-color-three">
              3
            </span>
          </div>
        </button>
                    
        <div class="courses-item-wrapper">
          <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-three">
            <h3 class="courses-item-title courses-item-title-color-one">
              Бухгалтерские
            </h3>
            <div class="courses-item-count courses-item-bg-color-two">
              <span class="courses-item-title-color-three">
                2
              </span>
            </div>
          </button>
          <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-two">
            <h3 class="courses-item-title courses-item-title-color-two">
              Компьютерные
            </h3>
            <div class="courses-item-count courses-item-bg-color-one">
              <span class="courses-item-title-color-one">
                5
              </span>
            </div>
          </button>
        </div>

        <div class="courses-item-wrapper">
          <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-two">
            <h3 class="courses-item-title courses-item-title-color-two">
              Дизайн
            </h3>
            <div class="courses-item-count courses-item-bg-color-one">
              <span class="courses-item-title-color-one">
                7
              </span>
            </div>
          </button>
          <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-one">
            <h3 class="courses-item-title courses-item-title-color-one">
              Бизнес
            </h3>
            <div class="courses-item-count courses-item-bg-color-two">
              <span class="courses-item-title-color-three">
                2
              </span>
            </div>
          </button>
        </div>

        <button @click="openCoursesByDirection" type="button" class="courses-item courses-item-bg-color-three">
          <h3 class="courses-item-title courses-item-title-color-one">
            Иностранные языки
          </h3>
          <div class="courses-item-count courses-item-bg-color-two">
            <span class="courses-item-title-color-three">
              1
            </span>
          </div>
        </button>
      </div>
    </div>

    <div v-if="isAllCoursesOpened" class="courses-all">
      <CoursesAll @close="handleClose" isAllCoursesOpened="isAllCoursesOpened"/>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import CoursesAll from '../Opened sections/CoursesAll.vue';

  const isAllCoursesOpened = ref(false);

  const openCoursesByDirection = () => {
    isAllCoursesOpened.value = true;
  }

  const handleClose = () => {
    isAllCoursesOpened.value = false
  }
</script> 

<style scoped>
  .courses-all {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-index-big);
    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.8);
  }
</style>
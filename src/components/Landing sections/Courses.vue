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
        <a @click="openCoursesByDirection('Менеджмент')" type="button" class="courses-item courses-item-bg-color-one">
          <h3 class="courses-item-title courses-item-title-color-one">
            Менеджмент
          </h3>
          <div class="courses-item-count courses-item-bg-color-two">
            <span class="courses-item-title-color-three">
              {{ numOfCoursesDir['Менеджмент'] }}
            </span>
          </div>
        </a>
                    
        <a @click="openCoursesByDirection('Бухгалтерские')" type="button" class="courses-item courses-item-bg-color-three">
            <h3 class="courses-item-title courses-item-title-color-one">
              Бухгалтерские
            </h3>
            <div class="courses-item-count courses-item-bg-color-two">
              <span class="courses-item-title-color-three">
                {{ numOfCoursesDir['Бухгалтерские'] }}
              </span>
            </div>
          </a>
          <a @click="openCoursesByDirection('Компьютерные')" type="button" class="courses-item courses-item-bg-color-two">
            <h3 class="courses-item-title courses-item-title-color-two">
              Компьютерные
            </h3>
            <div class="courses-item-count courses-item-bg-color-one">
              <span class="courses-item-title-color-one">
                {{ numOfCoursesDir['Компьютерные'] }}
              </span>
            </div>
          </a>

          <a @click="openCoursesByDirection('Дизайн')" type="button" class="courses-item courses-item-bg-color-two">
            <h3 class="courses-item-title courses-item-title-color-two">
              Дизайн
            </h3>
            <div class="courses-item-count courses-item-bg-color-one">
              <span class="courses-item-title-color-one">
                {{ numOfCoursesDir['Дизайн'] }}
              </span>
            </div>
          </a>
          <a @click="openCoursesByDirection('Бизнес')" type="button" class="courses-item courses-item-bg-color-one">
            <h3 class="courses-item-title courses-item-title-color-one">
              Бизнес
            </h3>
            <div class="courses-item-count courses-item-bg-color-two">
              <span class="courses-item-title-color-three">
                {{ numOfCoursesDir['Бизнес'] }}
              </span>
            </div>
          </a>

        <a @click="openCoursesByDirection('Иностранные языки')" type="button" class="courses-item courses-item-bg-color-three">
          <h3 class="courses-item-title courses-item-title-color-one">
            Иностранные языки
          </h3>
          <div class="courses-item-count courses-item-bg-color-two">
            <span class="courses-item-title-color-three">
              {{ numOfCoursesDir['Иностранные языки'] }}
            </span>
          </div>
        </a>
      </div>
    </div>

    <div v-if="isAllCoursesOpened" class="courses-all">
      <CoursesAll @close="handleClose" 
        :isAllCoursesOpened="isAllCoursesOpened"
        :direction="direction"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CoursesAll from '../Opened sections/CoursesAll.vue';
import { useDataStore } from '../../store/DataStore';

const store = useDataStore();

onMounted(async () => {
  await store.fetchCourses();
});

const courses = computed(() => store.Курсы);

const directions = ['Менеджмент', 'Бухгалтерские', 'Компьютерные', 'Дизайн', 'Бизнес', 'Иностранные языки'];

const isAllCoursesOpened = ref(false);
let direction = ref('');

const openCoursesByDirection = (dir) => {
  isAllCoursesOpened.value = true;
  direction.value = dir;
};

const handleClose = () => {
  isAllCoursesOpened.value = false;
};

// Вычисляемое свойство для подсчета количества курсов по каждому направлению
const numOfCoursesDir = computed(() => {
  const count = {};
  directions.forEach(dir => {
    count[dir] = courses.value.filter(course => course.direction === dir).length;
  });
  return count;
});
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
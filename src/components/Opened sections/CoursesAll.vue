<template>
  <div class="sidebar-drop-wrapper">
    <section v-show="!isDetailedOpened" class="sidebar-drop courses-drop">
      <form class="courses-drop-radio-select">
        <label>
          <input 
            type="radio" 
            name="option" 
            value="Профессиональная подготовка" 
            class="courses-drop-radio-select-input" 
            checked 
            @change="filterCourses('Профессиональная подготовка')"
          >
          <span>Профессиональная<br> подготовка</span>
        </label>

        <label>
          <input 
            type="radio" 
            name="option" 
            value="Общеобразовательные курсы" 
            class="courses-drop-radio-select-input" 
            @change="filterCourses('Общеобразовательные курсы')"
          >
          <span>Общеобразовательные<br> курсы</span>
        </label>

        <label>
          <input 
            type="radio" 
            name="option" 
            value="Повышение квалификации" 
            class="courses-drop-radio-select-input" 
            @change="filterCourses('Повышение квалификации')"
          >
          <span>Повышение<br> квалификации</span>
        </label>
      </form>

      <form class="courses-drop-search" @submit.prevent>
        <input 
          type="text" 
          class="courses-drop-search-input" 
          placeholder="Поиск по курсам" 
          @input="handleSearch"
        >
        <button class="button courses-drop-search-button" type="submit">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
              stroke="#FF4800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.9998 21L15.7998 15.8" stroke="#FF4800" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </form>

      <ul class="courses-drop-list">
        <CourseItem 
          v-for="course in filteredCourses" 
          :key="course.title"
          :course="course"
          @openDetails="openDetails"
        />
      </ul>

      <button 
        @click="closeAllCourses" 
        type="button" 
        class="button close-button sidebar-drop-close-button"
      >
        <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 26L26 1" stroke="black" />
          <path d="M26 26L0.999999 1" stroke="black" />
        </svg>
      </button>
    </section>

    <CoursePage 
      v-show="isDetailedOpened" 
      @close="handleClose" 
      @back="handleBack" 
      :course="selectedCourse"
    />
  </div>
</template>


<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import { defineProps } from 'vue';
  import CourseItem from './CourseItem.vue';
  import CoursePage from './CoursePage.vue';

  const isDetailedOpened = ref(false);
  const store = useDataStore();

  const props = defineProps( {
    direction: {
      type: String,
      required: true 
    }
  });
  
  // Состояния для фильтрации и поиска
  const selectedOption = ref('Профессиональная подготовка');
  const searchQuery = ref('');

  // Вызываем метод для получения курсов при монтировании компонента
  onMounted(async () => {
    await store.fetchCourses();
  });

  // Получаем курсы из store
  const courses = computed(() => store.Курсы);
  const selectedCourse = ref(courses[0]);

  // Метод для открытия деталей курса
  const openDetails = (course) => {
    isDetailedOpened.value = true;
    selectedCourse.value = course;
  };

  // Метод для закрытия деталей курса
  const handleClose = () => {
    isDetailedOpened.value = false;
    emit('close');
  };

  // Метод для возврата к списку курсов
  const handleBack = () => {
    isDetailedOpened.value = false;
  };

  // Метод для фильтрации курсов по выбранной категории
  const filterCourses = (option) => {
    selectedOption.value = option;
  };

  // Метод для фильтрации курсов по поисковому запросу
  const filterBySearch = (course) => {
    const isMatch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    return isMatch;
  };

  // Вычисляемое свойство для фильтрации курсов
  const filteredCourses = computed(() => {
    const result = courses.value
      .filter(course => course.level === selectedOption.value) // Фильтрация по категории
      .filter(filterBySearch) // Фильтрация по поисковому запросу
      .filter(course => course.direction === props.direction);

    return result;
  });

  // Метод для обработки изменения поиска
  const handleSearch = (event) => {
    searchQuery.value = event.target.value;
  };

  // Метод для закрытия всех курсов (кнопка закрытия)
  const closeAllCourses = () => {
    emit('close');
  };

  // Определяем события
  const emit = defineEmits(['close']);
</script>

<style scoped>
	
</style>

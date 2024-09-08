<template>
  <div class="sidebar-drop-wrapper">
        <section v-show="!isDetailedOpened" class="sidebar-drop webinars-seminars-drop">
            <form class="courses-drop-radio-select webinars-seminars-drop-radio-select">
                <label>
                    <input
                        type="radio"
                        name="option"
                        value="Профессиональная подготовка"
                        class="courses-drop-radio-select-input"
                        checked 
                        @change="filterWebinars(true)">
                    <span>Вебинары</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="option"
                        value="Общеобразовательные курсы"
                        class="courses-drop-radio-select-input"
                        @change="filterWebinars(false)"
                    >
                    <span>Семинары</span>
                </label>
            </form>

            <form class="courses-drop-search">
                <input
                    type="text"
                    class="courses-drop-search-input"
                    placeholder="Поиск по вебинарам"
                    @input="handleSearch"
                >
                <button
                    class="button courses-drop-search-button"
                    type="submit"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#FF4800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.9998 21L15.7998 15.8" stroke="#FF4800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>

            <ul class="webinars-seminars-drop-list">
              <WebinarItem 
                v-for="webinar in filteredWebinars" 
                :key="webinar.title"
                :webinar="webinar"
                @openDetails="openDetails"/>
            </ul>

            <button @click="closeAllWebinars" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>
        </section>

        <WebinarPage 
          v-show="isDetailedOpened" 
          @close="handleClose" 
          @back="handleBack" 
          :webinar="selectedWebinar"/>
    </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import { defineProps } from 'vue';
  import WebinarItem from './WebinarItem.vue';
  import WebinarPage from './WebinarPage.vue'

  const isDetailedOpened = ref(false);
  const store = useDataStore();

  // Состояния для фильтрации и поиска
  const selectedOption = ref(true);
  const searchQuery = ref('');

  // Вызываем метод для получения курсов при монтировании компонента
  onMounted(async () => {
    await store.fetchWebinars();
  });

  // Получаем курсы из store
  const webinars = computed(() => store.ВебинарыСеминары);
  const selectedWebinar = ref(webinars[0]);

  // Метод для открытия деталей курса
  const openDetails = (webinar) => {
    isDetailedOpened.value = true;
    selectedWebinar.value = webinar;
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
  const filterWebinars = (option) => {
    selectedOption.value = option;
  };

  // Метод для фильтрации курсов по поисковому запросу
  const filterBySearch = (webinar) => {
    const isMatch = webinar.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    return isMatch;
  };

  // Вычисляемое свойство для фильтрации курсов
  const filteredWebinars = computed(() => {
    const result = webinars.value
      .filter(webinar => webinar.isWebinar === selectedOption.value) // Фильтрация по категории
      .filter(filterBySearch) // Фильтрация по поисковому запросу

    return result;
  });

  // Метод для обработки изменения поиска
  const handleSearch = (event) => {
    searchQuery.value = event.target.value;
  };

  const emit = defineEmits(['close'])

  const closeAllWebinars = () => {
    emit('close')
  }
</script>

<style>

</style>

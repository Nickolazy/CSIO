<template>
  <div>
    <h1>Курсы</h1>
    <ul v-if="courses.length">
      <li v-for="course in courses" :key="course.$id">
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
        <p><b>Этапы:</b> {{ course.stages }}</p>
        <button @click="editCourse(course)">Редактировать</button>
        <button @click="deleteCourse(course.$id)">Удалить</button>
      </li>
    </ul>
    <p v-else>Нет курсов для отображения.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '../store/DataStore';

const store = useDataStore();
const courses = computed(() => store.Курсы);
const selectedCourse = ref(null);

onMounted(async () => {
  await store.fetchCourses();
});

const editCourse = (course) => {
  // Например, открытие модального окна для редактирования
  selectedCourse.value = { ...course }; // Клонируем курс для редактирования
  // Открытие модального окна для редактирования
  console.log('Editing course:', course);
};

const updateCourse = async () => {
  if (selectedCourse.value) {
    await store.updateCourse(selectedCourse.value.$id, selectedCourse.value);
    selectedCourse.value = null; // Закрытие модального окна после обновления
  }
};

const deleteCourse = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этот курс?')) {
    await store.deleteCourse(id);
  }
};

</script>

<style scoped>
/* Ваши стили */
</style>

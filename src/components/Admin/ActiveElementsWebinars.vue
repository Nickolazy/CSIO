<template>
  <div>
    <div class="addingCourses">
      <h1>Вебинары/Семинары</h1>
      <button class="button" @click="openAdding()">Добавить</button>
    </div>
    <div v-if="adding">
      <AddWebinar :adding="adding" @update:adding="adding = $event" />
    </div>
    <div v-else>
      <ul v-if="courses.length">
        <li v-for="course in courses" :key="course.$id">
          <div v-if="course.isWebinar">
            Вебинар
          </div>
          <div v-else>
            Семинар
          </div>
          <h2>{{ course.title }}</h2>
          <p>{{ course.description }}</p>
          <!-- <p><b>Этапы:</b> {{ course.stages }}</p> -->
          <button @click="editCourse(course)">Редактировать</button>
          <button @click="deleteCourse(course.$id)">Удалить</button>
        </li>
      </ul>
      <p v-else>Нет вебинаров и семинаров для отображения.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '../../store/DataStore';
import AddWebinar from '../Admin/AddWebinar.vue';

const store = useDataStore();
const courses = computed(() => store.ВебинарыСеминары);
const selectedCourse = ref(null);

const adding = ref(false);

onMounted(async () => {
  await store.fetchWebinars();
});

const editCourse = (course) => {
  selectedCourse.value = { ...course }; // Клонируем курс для редактирования
  console.log('Editing webinar:', course);
};

const openAdding = () => {
  adding.value = true;
}

const updateCourse = async () => {
  if (selectedCourse.value) {
    await store.updateWebinar(selectedCourse.value.$id, selectedCourse.value);
    selectedCourse.value = null; // Закрытие модального окна после обновления
  }
};

const deleteCourse = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этот курс?')) {
    await store.deleteWebinar(id);
  }
};
</script>

<style scoped>
.addingCourses {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.addingCourses h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.button {
  height: 40px;
  padding: 8px 16px;
  background-color: #3023f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #1a00ac;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #ccc;
}
</style>

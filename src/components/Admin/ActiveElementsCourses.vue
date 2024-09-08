<template>
  <div>
    <div class="addingCourses">
      <h1>Курсы</h1>
      <button class="button" @click="openAdding()">Добавить</button>
    </div>
    <div v-if="adding">
      <AddCourse :adding="adding" @update:adding="adding = $event" />
    </div>
    <div v-else-if="editing">
      <EditCourse 
        :course="selectedCourse" 
        :editing="editing" 
        @update:editing="editing = $event" 
        @course-updated="handleCourseUpdated" />
    </div>
    <div v-else>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '../../store/DataStore';
import AddCourse from '../Admin/AddCourse.vue';
import EditCourse from './EditCourse.vue';

const store = useDataStore();
const courses = computed(() => store.Курсы);

const selectedCourse = ref(null);
const editing = ref(false);
const adding = ref(false);

onMounted(async () => {
  await store.fetchCourses();
});

const openAdding = () => {
  adding.value = true;
}

const editCourse = (course) => {
  selectedCourse.value = { ...course }; 
  editing.value = true;
};

const handleCourseUpdated = async (updatedCourse) => {
  await store.handleCourseUpdated(updatedCourse);
};

const deleteCourse = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этот курс?')) {
    await store.deleteCourse(id);
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

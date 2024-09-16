<template>
  <div>
    <div class="addingCourses">
      <h1>Преподаватели</h1>
      <button class="button" @click="openAdding()">Добавить</button>
    </div>
    <div v-if="adding">
      <AddTeacher :adding="adding" @update:adding="adding = $event" />
    </div>
    <div v-if="editing">
      <EditTeacher :teacherToEdit="selectedTeacher" @update:editing="editing = $event" />
    </div>
    <div v-else>
      <ul v-if="teachers.length">
        <li v-for="teacher in teachers" :key="teacher.$id">
          <h2>
            {{ teacher.name }}
          </h2>
          <h3>
            {{ teacher.post }}
          </h3>
          <button @click="editTeacher(teacher)">Редактировать</button>
          <button @click="deleteTeacher(teacher.$id)">Удалить</button>
        </li>
      </ul>
      <p v-else>Нет преподавателей.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '../../store/DataStore';
import AddTeacher from '../Admin/AddTeacher.vue';
import EditTeacher from './EditTeacher.vue';

const store = useDataStore();
const teachers = computed(() => store.Преподаватели);
const selectedCourse = ref(null);

const adding = ref(false);
const editing = ref(false);
const selectedTeacher = ref(null);

onMounted(async () => {
  await store.fetchTeachers();
});

const editTeacher = (teacher) => {
  selectedTeacher.value = { ...teacher }; 
  editing.value = true;
};

const openAdding = () => {
  adding.value = true;
}

const deleteTeacher = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этого преподавателя?')) {
    await store.deleteTeacher(id);
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

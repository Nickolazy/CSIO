<template>
  <div class="form-container">
    <button @click="exitButton" class="exit-button">Выйти</button>
    <h2>Добавить преподавателя</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="teacher-form">
        <!-- Поля для добавления преподавателя -->
        <div class="form-group">
          <label for="name">ФИО:</label>
          <input v-model="teacher.name" id="name" type="text" placeholder="Введите ФИО" />
        </div>

        <div class="form-group">
          <label for="post">Должность:</label>
          <input v-model="teacher.post" id="post" type="text" placeholder="Введите должность" />
        </div>

        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea v-model="teacher.description" id="description" placeholder="Введите описание"></textarea>
        </div>

        <div class="form-group">
          <label for="totalWorkExp">Общий стаж работы (лет):</label>
          <input v-model="teacher.totalWorkExp" id="totalWorkExp" type="text" placeholder="Введите общий стаж работы" />
        </div>

        <div class="form-group">
          <label for="localWorkExp">Стаж работы по специальности (лет):</label>
          <input v-model="teacher.localWorkExp" id="localWorkExp" type="text" placeholder="Введите стаж работы по специальности" />
        </div>

        <div class="form-group">
          <label for="skills">Скиллы:</label>
          <textarea v-model="teacher.skills" id="skills" placeholder="Введите скиллы с разделением знаком ';'"></textarea>
        </div>

          <!-- Добавим поле для загрузки фото -->
          <!-- <div class="form-group">
          <label for="photo">Фото преподавателя:</label>
          <input @change="handlePhotoUpload" id="photo" type="file" />
        </div> -->

        <button type="submit" class="submit-button">Добавить преподавателя</button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const emit = defineEmits(['update:adding']);

  const teacher = ref({
    name: '',
    post: '',
    description: '',
    totalWorkExp: '',
    localWorkExp: '',
    skills: '',
    photoUrl: '' // Новое поле для ссылки на фото
  });

  const store = useDataStore();
  const photoFile = ref(null); // Хранит выбранный файл фото

  const resetTeacherForm = () => {
    teacher.value = {
      name: '',
      post: '',
      description: '',
      totalWorkExp: '',
      localWorkExp: '',
      skills: '',
      photoUrl: ''
    };
    photoFile.value = null;
  };

  const exitButton = () => {
    emit('update:adding', false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      photoFile.value = file; // Сохраняем загруженный файл
    }
  };

  const handleSubmit = async () => {
    if (teacher.value.name && teacher.value.post && teacher.value.description) {
      try {

        // await store.uploadImage(photoFile.value);

        // Сохраняем данные преподавателя
        await store.addTeacher({
          name: teacher.value.name,
          post: teacher.value.post,
          description: teacher.value.description,
          totalWorkExp: teacher.value.totalWorkExp,
          localWorkExp: teacher.value.localWorkExp,
          skills: teacher.value.skills
        });

        resetTeacherForm();
      } catch (error) {
        console.error('Ошибка при добавлении преподавателя:', error);
      }

      exitButton();
    } else {
      alert('Пожалуйста, заполните все обязательные поля.');
    }
  };
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.exit-button {
  margin: 0 auto 20px;
  padding: 8px 16px;
  background-color: #f73737;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.exit-button:hover {
  background-color: #e60000;
}

.teacher-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input, select, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

input:focus, select:focus, textarea:focus {
  border-color: #6D0088;
  outline: none;
}

.submit-button {
  padding: 10px 20px;
  background-color: #6D0088;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #550066;
}
</style>

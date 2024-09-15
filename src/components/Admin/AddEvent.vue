<template>
  <div class="form-container">
    <button @click="exitButton" class="exit-button">Выйти</button>
    <h2>Добавить</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="teacher-form">
        <!-- Поля для добавления преподавателя -->
        <div class="form-group">
          <label for="name">Акция или Новость или Событие?</label>
          <select v-model="selectedEvent" @change="handleChange" id="selectedEvent">
            <option v-for="event in chooseEvent" :key="event"       :value="event">
              {{ event }}
            </option>
          </select>
        </div>

        <div v-if="selectedEvent === 'Новость'">
          <div class="form-group">
            <label for="title">Заголовок:</label>
            <input v-model="news.title" id="title" type="text" placeholder="Введите заголовок" />
          </div>

          <div class="form-group">
            <label for="content">Содержание:</label>
            <textarea v-model="news.content" id="content" placeholder="Введите содержание"></textarea>
          </div>
        </div>
        <div v-else>
          <div class="form-group">
            <label for="title">Заголовок:</label>
            <input v-model="saleAndEvent.title" id="title" type="text" placeholder="Введите заголовок" />
          </div>

          <div class="form-group">
            <label for="content">Содержание:</label>
            <textarea v-model="saleAndEvent.content" id="content" placeholder="Введите содержание"></textarea>
          </div>

          <div class="form-group">
            <label for="dates">Даты:</label>
            <textarea v-model="saleAndEvent.dates" id="dates" placeholder="Введите даты проведения"></textarea>
          </div>
        </div>

        <button type="submit" class="submit-button">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const chooseEvent = ['Акция', 'Новость', 'Событие'];
  const selectedEvent = ref('');

  const emit = defineEmits(['update:adding']);

  const saleAndEvent = ref({
    title: '',
    content: '',
    dates: ''
  });

  const news = ref({
    title: '',
    content: ''
  });

  const isEvent = ref(false);

  const store = useDataStore();

  const handleChange = () => {
    isEvent.value = selectedEvent.value === 'Акция' || selectedEvent.value === 'Событие';
  };

  const resetTeacherForm = () => {
    saleAndEvent.value = {
      title: '',
      content: '',
      dates: ''
    };

    news.value = {
      title: '',
      content: ''
    };
    
  };

  const exitButton = () => {
    emit('update:adding', false);
  };

  const handleSubmit = async () => {
    try {
      if (selectedEvent.value === 'Новость') {
        await store.addNew({
          title: news.value.title,
          content: news.value.content
        });
      } else if (selectedEvent.value === 'Событие') {
        await store.addEvent({
          title: saleAndEvent.value.title,
          content: saleAndEvent.value.content,
          dates: saleAndEvent.value.dates
        });
      } else if(selectedEvent.value === 'Акция') {
        await store.addSale({
          title: saleAndEvent.value.title,
          content: saleAndEvent.value.content,
          dates: saleAndEvent.value.dates
        });
      }
      resetTeacherForm();
      emit('update:adding', false);
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
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

<template>
  <div class="form-container">
    <button @click="exitButton" class="exit-button">Выйти</button>
    <h2>Редактировать курс</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="course-form">
        <!-- Поля для редактирования курса -->
        <div class="form-group">
          <label for="title">Название:</label>
          <input v-model="course.title" id="title" type="text" placeholder="Введите название курса" />
        </div>
        
        <div class="form-group">
          <label for="level">Уровень обучения:</label>
          <select v-model="course.level" id="level">
            <option v-for="option in levels" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Поля для профессиональной подготовки -->
        <div v-if="course.level === 'Профессиональная подготовка'">
          <div class="form-group">
            <label for="grantingRights">Предоставление права:</label>
            <textarea v-model="course.grantingRights" id="grantingRights" placeholder="Диплом предоставляет право на"></textarea>
          </div>

          <div class="form-group">
            <label for="qualification">Квалификация:</label>
            <textarea v-model="course.qualification" id="qualification" placeholder="Введите квалификацию"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="direction">Направление:</label>
          <select v-model="course.direction" id="direction">
            <option v-for="option in directions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea v-model="course.description" id="description" placeholder="Введите описание курса"></textarea>
        </div>

        <div class="form-group">
          <label for="stages">Этапы работы:</label>
          <input v-model="course.stages" id="stages" type="text" placeholder="Введите этапы работы" />
        </div>

        <!-- Форма обучения -->
        <div class="form-group" v-for="(form, index) in course.forms" :key="index">
          <div class="form-header">
            <h3>Форма {{ index + 1 }}</h3>
            <button @click="removeForm(index)" class="delete-button">Удалить</button>
          </div>

          <label>Название формы:</label>
          <input v-model="form.name" type="text" placeholder="Введите название формы (очная/заочная)" />

          <label>Количество часов:</label>
          <input v-model="form.hours" type="text" placeholder="Введите количество часов" />

          <label>Продолжительность:</label>
          <input v-model="form.duration" type="text" placeholder="Введите продолжительность" />

          <label>Стоимость:</label>
          <input v-model="form.price" type="number" placeholder="Введите стоимость" />

          <button @click="addLearningType(index)" type="button">Добавить вид обучения</button>

          <div v-for="(type, typeIndex) in form.learningTypes" :key="typeIndex" class="learning-type">
            <div class="form-header">
              <h4>Вид {{ typeIndex + 1 }}</h4>
              <button @click="removeLearningType(index, typeIndex)" class="delete-button">Удалить</button>
            </div>

            <label>Вид обучения:</label>
            <input v-model="type.name" type="text" placeholder="Введите вид обучения (группа/минигруппа)" />

            <label>Общее количество часов:</label>
            <input v-model="type.totalHours" type="text" placeholder="Введите общее количество часов" />

            <label>Часы индивидуальные:</label>
            <input v-model="type.individualHours" type="number" placeholder="Введите количество индивидуальных часов" />

            <label>Часы групповые:</label>
            <input v-model="type.groupHours" type="number" placeholder="Введите количество групповых часов" />

            <label>Продолжительность:</label>
            <input v-model="type.duration" type="text" placeholder="Введите продолжительность" />

            <label>Стоимость:</label>
            <input v-model="type.price" type="number" placeholder="Введите стоимость" />
          </div>
        </div>

        <!-- Расписание -->
        <div class="schedule-panel">
          <h3>Редактировать расписание</h3>
          <button @click="addSchedule" type="button">Добавить расписание</button>
          <div v-for="(schedule, index) in course.schedules" :key="index" class="schedule-item">
            <div class="form-header">
              <h4>Расписание {{ index + 1 }}</h4>
              <button @click="removeSchedule(index)" class="delete-button">Удалить</button>
            </div>

            <label>Форма:</label>
            <input v-model="schedule.form" type="text" placeholder="Введите форму (очная/заочная)" />

            <label>Тип:</label>
            <input v-model="schedule.type" type="text" placeholder="Введите тип (группа/минигруппа)" />

            <label>Дата начала:</label>
            <input v-model="schedule.startDate" type="date" />

            <label>Количество занятий:</label>
            <input v-model="schedule.numOfClasses" type="number" placeholder="Введите количество занятий" />

            <label>Время:</label>
            <input v-model="schedule.time" type="text" placeholder="Введите время занятий" />

            <label>Местоположение:</label>
            <input v-model="schedule.location" type="text" placeholder="Введите местоположение" />

            <label>Преподаватели:</label>
            <input v-model="schedule.teachers" type="text" placeholder="Введите имена преподавателей" />
          </div>
        </div>

        <button type="submit" class="submit-button">Сохранить изменения</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  course: Object,  // Принимаем объект курса
  editing: Boolean
});

const emit = defineEmits(['update:editing', 'course-updated']);

// Никакой копии course не создается, работаем с переданным объектом напрямую

// Метод для выхода из формы редактирования
const exitButton = () => {
  emit('update:editing', false);
};

// Метод для отправки обновленных данных
const handleSubmit = async () => {
  try {
    // Эмитим событие для родительского компонента, передаем обновленный курс
    emit('course-updated', props.course);
    
    // Закрываем форму редактирования
    emit('update:editing', false);
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
  }
};
</script>


<style scoped>
/* Стили, как в AddCourse */
.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button, .exit-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.exit-button {
  background-color: #dc3545;
  margin-bottom: 20px;
}

.submit-button:hover, .exit-button:hover {
  opacity: 0.8;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.delete-button:hover {
  opacity: 0.8;
}

.schedule-panel {
  margin-top: 30px;
}

.schedule-item, .learning-type {
  margin-bottom: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>

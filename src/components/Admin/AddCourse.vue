<template>
  <div class="form-container">
    <button @click="exitButton()" class="exit-button"> Выйти</button>
    <h2>Добавить курс</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="course-form">
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
        
        <button type="button" @click="addForm">Добавить форму обучения</button>

        <button type="submit" class="submit-button">Добавить курс</button>
      </form>

      <!-- Боковая панель с дополнительными формами -->
      <div class="side-panel">
        <div v-for="(form, formIndex) in course.forms" :key="formIndex" class="form-group">
          <div class="form-header">
            <h3>Форма {{ formIndex + 1 }}</h3>
            <button class="delete-button" @click="removeForm(formIndex)">Удалить</button>
          </div>

          <label>Название формы:</label>
          <input v-model="form.name" type="text" placeholder="Введите название формы (очная/заочная)" />
          
          <label>Количество часов:</label>
          <input v-model="form.hours" type="text" placeholder="Введите количество часов" />
          
          <label>Продолжительность:</label>
          <input v-model="form.duration" type="text" placeholder="Введите продолжительность" />
          
          <label>Стоимость:</label>
          <input v-model="form.price" type="number" placeholder="Введите стоимость" />

          <!-- Кнопка для добавления нового вида обучения -->
          <button type="button" @click="addLearningType(formIndex)">Добавить вид обучения</button>

          <!-- Перечень видов обучения -->
          <div v-for="(type, typeIndex) in form.learningTypes" :key="typeIndex" class="learning-type">
            <div class="form-header">
              <h4>Вид {{ typeIndex + 1 }}</h4>
              <button class="delete-button" @click="removeLearningType(formIndex, typeIndex)">Удалить</button>
            </div>

            <label>Вид обучения:</label>
            <input v-model="type.name" type="text" placeholder="Введите вид обучения (группа/минигруппа)" />

            <label>Общее количество часов:</label>
            <input v-model="type.totalHours" type="text" placeholder="Введите общее количество часов" />

            <label>Часы индивидуальные:</label>
            <input v-model="type.individualHours" type="number" placeholder="Введите количество часов индивидуальных занятий" />

            <label>Часы групповые:</label>
            <input v-model="type.groupHours" type="number" placeholder="Введите количество часов групповых занятий" />

            <label>Продолжительность:</label>
            <input v-model="type.duration" type="text" placeholder="Введите продолжительность" />

            <label>Стоимость:</label>
            <input v-model="type.price" type="text" placeholder="Введите стоимость" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '../../store/DataStore';

const props = defineProps({
  adding: Boolean
});

const emit = defineEmits(['update:adding']);

const levels = ['Профессиональная подготовка', 'Общеобразовательные курсы', 'Повышение квалификации']; 
const directions = ['Менеджмент', 'Бухгалтерские', 'Компьютерные', 'Дизайн', 'Бизнес', 'Иностранные языки'];

const course = ref({
  title: '',
  level: '',
  direction: '',
  description: '',
  stages: '',
  forms: []
});

const resetCourseForm = () => {
  course.value = {
    title: '',
    level: '',
    direction: '',
    description: '',
    stages: '',
    forms: []
  };
};

const exit = () => {
  if (course.value.title && course.value.direction && course.value.level && course.value.description) {
    emit('update:adding', false);
  }
};

const exitButton = () => {

  emit('update:adding', false);
};

const addForm = () => {
  course.value.forms.push({
    name: '',
    hours: '',
    duration: '',
    price: '',
    learningTypes: []
  });
};

const removeForm = (formIndex) => {
  course.value.forms.splice(formIndex, 1);
};

const addLearningType = (formIndex) => {
  course.value.forms[formIndex].learningTypes.push({
    name: '',
    totalHours: '',
    individualHours: '',
    groupHours: '',
    duration: '',
    price: ''
  });
};

const removeLearningType = (formIndex, typeIndex) => {
  course.value.forms[formIndex].learningTypes.splice(typeIndex, 1);
};

const handleSubmit = async () => {
  if (course.value.title && course.value.direction && course.value.level && course.value.description) {
    // Проверка на массив для поля "forms"
    if (!Array.isArray(course.value.forms)) {
      console.error('Поле "forms" должно быть массивом.');
      return;
    }

    const dataStore = useDataStore();
    try {
      // Сначала добавляем курс в коллекцию курсов
      const courseResponse = await dataStore.addCourse({
        title: course.value.title,
        level: course.value.level,
        direction: course.value.direction,
        description: course.value.description,
        stages: course.value.stages
      });

      console.log(course.value.forms);
      // Добавляем каждую форму как отдельный документ в коллекцию FormsOfCourses
      const formPromises = course.value.forms.map(form => {
        return dataStore.addFormOfCourse({
          title: course.value.title, // Дублирование названия курса
          form: form.name,
          hours: form.hours,
          length: form.duration, // Используем 'length' вместо 'duration'
          cost: parseInt(form.price, 10) // Преобразуем стоимость в число
        });
      });

      await Promise.all(formPromises);

      // Добавляем виды обучения в коллекцию Types
      const typePromises = course.value.forms.flatMap(form => 
        form.learningTypes.map(type => 
          dataStore.addTypeOfCourse({
            title: course.value.title,
            form: form.name,
            type: type.name,
            hours: type.totalHours,
            individualHours: type.individualHours,
            groupHours: type.groupHours,
            length: type.duration,
            cost: type.price
          })
        )
      );

      await Promise.all(typePromises);

      // Очистка формы после успешного добавления
      resetCourseForm();
    } catch (error) {
      console.error('Ошибка при добавлении курса или форм обучения:', error);
    }

    exit();
  } else {
    console.error('Пожалуйста, заполните все обязательные поля.');
  }
};
</script>

<style scoped>
.form-container {
  max-width: 1200px;
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

.main-content {
  display: flex;
  gap: 100px;
}

.course-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 520px;
  gap: 15px;
}

.side-panel {
  flex: 0 0 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.delete-button {
  padding: 4px 8px;
  background-color: #f73737;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e60000;
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
  width: 100%; /* Обеспечивает заполнение всей доступной ширины */
}

input:focus, select:focus, textarea:focus {
  border-color: #6D0088;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
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

.learning-type {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f4f4f4;
}

.learning-type .form-header {
  margin-bottom: 15px;
}
</style>

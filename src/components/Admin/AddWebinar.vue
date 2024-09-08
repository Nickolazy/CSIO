<template>
  <div class="form-container">
    <button @click="exitButton" class="exit-button">Выйти</button>
    <h2>Добавить вебинар/семинар</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="course-form">
        <!-- Существующие поля для вебинара -->
        <div class="form-group">
          <label for="webOrSem">Вебинар/Семинар:</label>
          <select v-model="webOrSem" id="webOrSem">
            <option v-for="option in webOrSemChoose" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">Название:</label>
          <input v-model="course.title" id="title" type="text" placeholder="Введите название" />
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
          <textarea v-model="course.description" id="description" placeholder="Введите описание"></textarea>
        </div>
        
        <div class="form-group">
          <label for="stages">Этапы работы:</label>
          <input v-model="course.stages" id="stages" type="text" placeholder="Введите этапы работы" />
        </div>

        <div class="form-group">
          <label for="teacherName">Преподаватель:</label>
          <select v-model="course.teacherName" id="teacherName">
            <option v-for="teacher in teachers" :key="teacher.name" :value="teacher.name">
              {{ teacher.name }}
            </option>
          </select>
        </div>

        <button type="button" @click="addForm">Добавить форму обучения</button>
        <button type="submit" class="submit-button">Добавить вебинар/семинар</button>
      </form>

      <!-- Боковая панель с дополнительными формами -->
      <div class="side-panel">
        <div v-for="(form, formIndex) in course.forms" :key="formIndex" class="form-group">
          <div class="form-header">
            <h3>Форма {{ formIndex + 1 }}</h3>
            <button class="delete-button" @click="removeForm(formIndex)">Удалить</button>
          </div>

          <!-- Поля формы обучения -->
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

            <!-- Поля для вида обучения -->
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
            <input v-model="type.price" type="number" placeholder="Введите стоимость" />
          </div>
        </div>
      </div>

      <!-- Секция расписания -->
      <div class="schedule-panel">
        <h2>Добавить расписание</h2>
        <button type="button" @click="addSchedule">Добавить расписание</button>
        <div v-for="(schedule, scheduleIndex) in course.schedules" :key="scheduleIndex" class="schedule-item">
          <div class="form-header">
            <h4>Расписание {{ scheduleIndex + 1 }}</h4>
            <button class="delete-button" @click="removeSchedule(scheduleIndex)">Удалить</button>
          </div>

          <!-- Поля для расписания -->
          <label>Форма:</label>
          <input v-model="schedule.form" type="text" placeholder="Введите форму (очная/заочная)" />

          <label>Тип:</label>
          <input v-model="schedule.type" type="text" placeholder="Введите тип (в группе/в минигруппе)" />

          <label>Дата начала:</label>
          <input v-model="schedule.startDate" type="date" placeholder="Введите дату начала" />

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
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const props = defineProps({
    adding: Boolean
  });

  const emit = defineEmits(['update:adding']);

  const teachers = [
    { name: 'Усманский Николай Михайлович', description: 'Описание Ивана' },
    { name: 'Мария', description: 'Описание Марии' },
    { name: 'Петр', description: 'Описание Петра' },
  ]; 
  const directions = ['Менеджмент', 'Бухгалтерские', 'Компьютерные', 'Дизайн', 'Бизнес', 'Иностранные языки'];
  const webOrSemChoose = ['Вебинар', 'Семинар'];

  const webOrSem = ref('');

  const course = ref({
    title: '',
    direction: '',
    description: '',
    stages: '',
    isWebinar: true,
    teacherName: '',
    teacherDescription: '',
    forms: [],
    schedules: []
  });

  const selectedTeacher = computed(() => {
    return teachers.find(teacher => teacher.name === course.value.teacherName);
  });

  const resetCourseForm = () => {
    course.value = {
      title: '',
      direction: '',
      description: '',
      stages: '',
      isWebinar: true,
      teacherName: '',
      teacherDescription: '',
      forms: [],
      schedules: []
    };
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
      category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар', 
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
      category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар',
      price: ''
    });
  };

  const removeLearningType = (formIndex, typeIndex) => {
    course.value.forms[formIndex].learningTypes.splice(typeIndex, 1);
  };

  const addSchedule = () => {
    course.value.schedules.push({
      form: '',
      type: '',
      startDate: '',
      numOfClasses: '',
    time: '',
    location: '',
    teachers: '',
    category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар'
  });
};

const removeSchedule = (scheduleIndex) => {
  course.value.schedules.splice(scheduleIndex, 1);
};

const handleSubmit = async () => {
  if (course.value.title && course.value.direction && course.value.description) {
    if (!Array.isArray(course.value.forms) || !Array.isArray(course.value.schedules)) {
      console.error('Поле "forms" и "schedules" должны быть массивами.');
      return;
    }

    const dataStore = useDataStore();
    try {
      const courseResponse = await dataStore.addWebinar({
        title: course.value.title,
        direction: course.value.direction,
        description: course.value.description,
        stages: course.value.stages,
        isWebinar: webOrSem.value === 'Вебинар',
        teacherName: course.value.teacherName,
        teacherDescription: selectedTeacher.value ? selectedTeacher.value.description : ''
      });

      const formPromises = course.value.forms.map(form => {
        return dataStore.addFormOfCourse({
          title: course.value.title,
          form: form.name,
          hours: form.hours,
          length: form.duration,
          cost: parseInt(form.price, 10),
          category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар'
        });
      });

      await Promise.all(formPromises);

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
            cost: parseInt(type.price, 10),
            category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар'
          })
        )
      );

      await Promise.all(typePromises);

      const schedulePromises = course.value.schedules.map(schedule => {
        return dataStore.addSchedule({
          title: course.value.title,
          form: schedule.form,
          type: schedule.type,
          startDate: schedule.startDate,
          numOfClasses: parseInt(schedule.numOfClasses, 10),
          time: schedule.time,
          location: schedule.location,
          teachers: schedule.teachers,
          category: webOrSem.value === 'Вебинар' ? 'Вебинар' : 'Семинар'
        });
      });

      await Promise.all(schedulePromises);

      resetCourseForm();
    } catch (error) {
      console.error('Ошибка при добавлении вебинара, форм обучения или расписания:', error);
    }

    exitButton();
  } else {
    alert('Пожалуйста, заполните все обязательные поля.');
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

.schedule-panel {
  min-width: 350px;
}
</style>
  
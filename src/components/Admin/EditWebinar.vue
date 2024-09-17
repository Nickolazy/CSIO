<template>
  <div class="form-container">
    <button @click="exitButton" class="exit-button">Выйти</button>
    <h2 v-if="course.isWebinar">Редактировать вебинар</h2>
    <h2 v-else>Редактировать семинар</h2>
    <div class="main-content">
      <form @submit.prevent="handleSubmit" class="course-form">
        <!-- Основная информация о курсе -->
        <div class="form-group">
          <label for="title">Название:</label>
          <input v-model="course.title" id="title" type="text" placeholder="Введите название курса" />
        </div>

        <div class="form-group">
          <label for="direction">Направление:</label>
          <select v-model="course.direction" id="direction">
            <option v-for="option in directions" :key="option" :value="option">{{ option }}</option>
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

        <div class="form-group">
          <label for="teacherName">Преподаватель:</label>
          <select v-model="course.teacherName" id="teacherName">
            <option v-for="teacher in teachers" :key="teacher.name" :value="teacher.name">
              {{ teacher.name }}
            </option>
          </select>
        </div>

        <button type="button" @click="addForm">Добавить форму обучения</button>
        <button type="submit" class="submit-button">Сохранить изменения</button>
      </form>

      <!-- Боковая панель с формами обучения -->
      <div class="side-panel">
        <h3 style="color: red;">
            ЕСЛИ ВЫ ХОТИТЕ УДАЛИТЬ КАКУЮ-ТО ФОРМУ ОБУЧЕНИЯ, ОБЯЗАТЕЛЬНО СНАЧАЛА УДАЛИТЕ ВСЕ ЕЁ ВИДЫ!
          </h3>
        <div v-for="(form, formIndex) in course.forms" :key="formIndex" class="form-group">
          <div class="form-header">
            <h3>Форма {{ formIndex + 1 }}</h3>
            <button class="delete-button" @click="removeForm(formIndex)">Удалить</button>
          </div>

          <label>Название формы:</label>
          <input v-model="form.form" type="text" placeholder="Введите название формы (очная/заочная)" />

          <label>Количество часов:</label>
          <input v-model="form.hours" type="text" placeholder="Введите количество часов" />

          <label>Продолжительность:</label>
          <input v-model="form.length" type="text" placeholder="Введите продолжительность" />

          <label>Стоимость:</label>
          <input v-model="form.cost" type="number" placeholder="Введите стоимость" />

          <button type="button" @click="addLearningType(formIndex)">Добавить вид обучения</button>

          <!-- Виды обучения для текущей формы -->
          <div v-for="(type, typeIndex) in getLearningTypesForForm(form.form)" :key="typeIndex" class="learning-type">
            <div class="form-header">
              <h4>Вид {{ typeIndex + 1 }}</h4>
              <button class="delete-button" @click="removeLearningType(type.$id)">Удалить</button>
            </div>

            <label>Вид обучения:</label>
            <input v-model="type.type" type="text" placeholder="Введите вид обучения (группа/минигруппа)" />

            <label>Общее количество часов:</label>
            <input v-model="type.hours" type="text" placeholder="Введите общее количество часов" />

            <label>Часы индивидуальные:</label>
            <input v-model="type.individualHours" type="number" placeholder="Введите количество часов индивидуальных занятий" />

            <label>Часы групповые:</label>
            <input v-model="type.groupHours" type="number" placeholder="Введите количество часов групповых занятий" />

            <label>Продолжительность:</label>
            <input v-model="type.length" type="text" placeholder="Введите продолжительность" />

            <label>Стоимость:</label>
            <input v-model="type.cost" type="number" placeholder="Введите стоимость" />
          </div>
        </div>
      </div>

     <!-- Секция расписания -->
     <div class="schedule-panel">
        <h2>Расписание</h2>
        <button type="button" @click="addSchedule">Добавить расписание</button>
        <div v-for="(schedule, scheduleIndex) in course.schedules" :key="scheduleIndex" class="schedule-item">
          <div class="form-header">
            <h4>Расписание {{ scheduleIndex + 1 }}</h4>
            <button class="delete-button" @click="removeSchedule(scheduleIndex)">Удалить</button>
          </div>

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
            <select v-model="schedule.teachers" id="teachers">
              <option v-for="teacher in teachers" :key="teacher" :value="teacher.name">
                {{ teacher.name }}
              </option>
            </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const props = defineProps({
    course: Object
  });
  const emit = defineEmits(['update:editing', 'course-updated']);
  const dataStore = useDataStore();

  const directions = ['Менеджмент', 'Бухгалтерские', 'Компьютерные', 'Дизайн', 'Бизнес', 'Иностранные языки'];

  const course = ref({
    title: '',
    direction: '',
    description: '',
    stages: '',
    isWebinar: true,
    teacherName: '',
    forms: [],
    schedules: []
  });

  const teachers = computed(() => dataStore.Преподаватели);

  const profLevel = computed(() => course.value.level);

  onMounted(async () => {
    if (props.course && props.course.title) {
      course.value = {
        ...props.course,
        forms: await dataStore.fetchFormsByCourse(props.course.title),
        schedules: await dataStore.fetchShedulesByCourse(props.course.title),
        learningTypes: await dataStore.fetchTypesByCourse(props.course.title)
      };
    }
  });

  const exitButton = () => {
    emit('update:editing', false);
  };

  const addForm = () => {
    course.value.forms.push({
      title: '',
      cost: '',
      form: '',
      hours: '',
      length: '',
      category: 'course'
    });
  };

  const removeForm = async (formIndex) => {
    try {
      const form = course.value.forms[formIndex];
      
      // Удаляем форму из базы данных
      if (form.$id) {
        await dataStore.deleteForm(form.$id);
        console.log('Форма успешно удалена из базы данных');
      } else {
        console.warn('Форма не имеет ID и не может быть удалена из базы данных');
      }

      // Удаляем форму из локального состояния
      course.value.forms.splice(formIndex, 1);
      console.log('Форма удалена из локального состояния');

    } catch (error) {
      console.error('Ошибка при удалении формы:', error);
    }
  };

  const removeLearningType = async (typeId) => {
    try {
      const type = course.value.learningTypes.find(type => type.$id === typeId);
      
      if (type) {
        // Удаляем вид обучения из базы данных
        await dataStore.deleteType(type.$id);
        console.log('Вид успешно удален из базы данных');

        // Удаляем вид обучения из локального состояния
        course.value.learningTypes = course.value.learningTypes.filter(type => type.$id !== typeId);
        console.log('Вид удален из локального состояния');
      } else {
        console.warn('Вид не найден');
      }
    } catch (error) {
      console.error('Ошибка при удалении вида:', error);
    }
  };

  const addSchedule = () => {
    course.value.schedules.push({
      title: '',
      form: '',
      type: '',
      startDate: '',
      numOfClasses: '',
      time: '',
      location: '',
      teachers: '',
      category: 'course',
    });
  };

  const removeSchedule = async (scheduleIndex) => {
  try {
    const schedule = course.value.schedules[scheduleIndex];
    
    // Удаляем расписание из базы данных
    if (schedule.$id) {
      await dataStore.deleteShedule(schedule.$id);
      console.log('Расписание успешно удалено из базы данных');
    } else {
      console.warn('Расписание не имеет ID и не может быть удалено из базы данных');
    }

    // Удаляем расписание из локального состояния
    course.value.schedules.splice(scheduleIndex, 1);
    console.log('Расписание удалено из локального состояния');

  } catch (error) {
    console.error('Ошибка при удалении расписания:', error);
  }
};

  const addLearningType = (formIndex) => {
    const form = course.value.forms[formIndex];

    course.value.learningTypes.push({
      title: '',
      form: form.form,
      hours: '',
      length: '',
      type: '',
      individualHours: '',
      groupHours: '',
      cost: '',
      category: 'course'
    });
  };

  const getLearningTypesForForm = (formType) => {
    return course.value.learningTypes.filter(type => type.form === formType);
  };

  const handleSubmit = async () => {
    if (course.value.title && course.value.direction && course.value.description) {
      try {
        // Обновляем информацию о курсе
        await dataStore.updateWebinar(props.course.$id, course.value);

        // Обрабатываем формы
        for (const form of course.value.forms || []) {
          if(form.form !== '') {
            form.title = course.value.title;

            if (form.$id) {
              // Обновляем форму, если у неё есть ID
              await dataStore.updateFormOfCourse(form.$id, form);
            } else {
              // Добавляем новую форму, если ID нет
              await dataStore.addFormOfCourse(form);
            }
          }
        }

        for (const type of course.value.learningTypes || []) {
            if(type.type !== '') {
              type.title = course.value.title;
              console.log("я вид: ", type);

              if (type.$id) {
                // Обновляем вид обучения, если у него есть ID
                await dataStore.updateTypeOfCourse(type.$id, type);
              } else {
                // Добавляем новый вид обучения, если ID нет
                await dataStore.addTypeOfCourse(type);
              }
            }
          }

        // Обрабатываем расписание
        for (const schedule of course.value.schedules || []) {
          if(schedule.form !== '') {
            schedule.title = course.value.title;

            if (schedule.$id) {
              // Обновляем расписание, если у него есть ID
              await dataStore.updateSheduleOfCourse(schedule.$id, schedule);
            } else {
              // Добавляем новое расписание, если ID нет
              await dataStore.addSchedule(schedule);
            }      
          }
        }

        emit('course-updated');
        exitButton();
      } catch (error) {
        console.error('Ошибка при обновлении курса:', error);
      }
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
  width: 100%;
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

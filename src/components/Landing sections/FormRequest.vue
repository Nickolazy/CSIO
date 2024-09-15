<template>
  <div class="section leave-request">
    <h2 class="visually-hidden">Оставить заявку на обучение</h2>
    <div class="container">
      <form @submit.prevent="sendEmail" ref="form" class="leave-request-form">
        <h3 class="heading-four leave-request-form-title">
          Оставить заявку на обучение
        </h3>

        <div class="leave-request-form-wrapper">
          <!-- Выбор вебинара и семинара -->
          <label class="visually-hidden" for="course-or-webinar">Выбор вебинара и семинара</label>
          <select v-model="selectedActivity" :style="selectStyle" class="leave-request-form-select leave-request-form-input leave-request-course-or-webinar" name="course_or_webinar" id="course-or-webinar" @change="handleActivityChange" required>
            <option value="" disabled>Выбор вебинара и семинара</option>
            <option v-for="(activity, index) in allActivities" :key="index" :value="activity.title">{{ activity.title }}</option>
          </select>

          <!-- Форма обучения -->
          <label class="visually-hidden" for="form-of-education">Форма обучения</label>
          <select v-if="formsToSignUp.length" :style="selectStyle" v-model="formsToSignUp[0].form" class="leave-request-form-select leave-request-form-input leave-request-form-of-education" name="form_of_education" id="form-of-education" required>
            <option value="" disabled>Форма обучения</option>
            <option v-for="(form, index) in formsToSignUp" :key="index" :value="form.form">{{ form.form }}</option>
          </select>
          <select v-else class="leave-request-form-select leave-request-form-input leave-request-form-of-education" disabled>
            <option value="">Не указано</option>
          </select>

          <!-- Вид обучения -->
          <label class="visually-hidden" for="training-type">Вид обучения</label>
          <select v-if="typesToSignUp.length" v-model="typesToSignUp[0].type" :style="selectStyle" class="leave-request-form-select leave-request-form-input leave-request-training-type" name="training-type" id="training-type" required>
            <option value="" disabled>Вид обучения</option>
            <option v-for="(type, index) in typesToSignUp" :key="index" :value="type.type">{{ type.type }}</option>
          </select>
          <select v-else class="leave-request-form-select leave-request-form-input leave-request-training-type" disabled>
            <option value="">Не указано</option>
          </select>

          <!-- Ваше имя -->
          <label class="visually-hidden" for="student-name">Ваше имя</label>
          <input v-model="name" type="text" placeholder="Ваше имя" name="student-name" id="student-name" class="leave-request-form-input leave-request-student-name" required>

          <!-- Ваш номер телефона -->
          <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
          <input v-model="phone" type="text" placeholder="+7 (___) ___ - ____" name="phone-number" id="phone-number" class="leave-request-form-input leave-request-phone-number" required>

          <!-- Ваша электронная почта -->
          <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
          <input v-model="email" type="email" placeholder="E-mail" name="email-address" id="email-address" class="leave-request-form-input leave-request-email-address" required>
        </div>


        <button class="button banner-button-sing-up leave-request-form-button" type="submit">
          Записаться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import emailjs from '@emailjs/browser';

  import { onMounted, ref, computed } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  // Вычисляемое свойство для динамического стиля
  const selectStyle = computed(() => ({
    opacity: selectedActivity.value === '' ? 0.7 : 1,
    color: selectedActivity.value === '' ? '#430B51' : '#000000',

  }));

  const form = ref(null); 

  const formOfEducation = ref('');
  const trainingType = ref('');
  const name = ref('');
  const phone = ref('');
  const email = ref('');

  const selectedActivity = ref('');
  const allActivities = ref([]);
  const formsToSignUp = ref([
    { form: "" }
  ]);
  const typesToSignUp = ref([
    { type: "" }
  ]);

  const store = useDataStore();

  const webinars = computed(() => store.ВебинарыСеминары);
  const courses = computed(() => store.Курсы);

  onMounted(async () => {
    await store.fetchWebinars();
    await store.fetchCourses();
    
    allActivities.value = [...store.ВебинарыСеминары, ...store.Курсы];
    
    allActivities.value = allActivities.value.map(activity => ({
      ...activity,
      title: cropTitle(activity.title)
    }));

    console.log(allActivities.value)
  });

  function cropTitle(title) {
    if (typeof title === 'string') {
      const dotIndex = title.indexOf('.');
      if (dotIndex !== -1) {
        return title.slice(0, dotIndex).trim();
      }
    }
    return title;
  }

  function handleActivityChange(event) {
    const selectedTitle = event.target.value;
    const selectedActivity = allActivities.value.find(activity => activity.title === selectedTitle);
    if (selectedActivity) {
      changeActivity(selectedActivity);
    }
  }

  const changeActivity = async (activity) => {
    if (activity.title) {
      const webinar = webinars.value.find((webinar) => webinar.title.includes(activity.title));
      
      if (webinar) {
        const isWebinar = webinar.isWebinar;
        typesToSignUp.value = await store.fetchTypesByWebinar(webinar.title, isWebinar);
        formsToSignUp.value = await store.fetchFormsByWebinar(webinar.title, isWebinar);

        if (!formsToSignUp.value.length || !formsToSignUp.value[0].form) {
          formsToSignUp.value = [{ form: "Не указано" }];
        }

        if (!typesToSignUp.value.length || !typesToSignUp.value[0].form) {
          typesToSignUp.value = [{ type: "Не указано" }];
        }
      } else {
        const course = courses.value.find((course) => course.title.includes(activity.title));
        
        if (course) {
          typesToSignUp.value = await store.fetchTypesByCourse(course.title);
          formsToSignUp.value = await store.fetchFormsByCourse(course.title);
        }
      }
      
      if (!formsToSignUp.value.length || !formsToSignUp.value[0].form) {
        formsToSignUp.value = [{ form: "Не указано" }];
      }

      if (!typesToSignUp.value.length || !typesToSignUp.value[0].form) {
        typesToSignUp.value = [{ type: "Не указано" }];
      }
    }
  };

  const isSubmitting = ref(false); // Флаг для отслеживания состояния отправки


  const sendEmail = async () => {
    if (isSubmitting.value) return; // Предотвращаем повторные отправки

    isSubmitting.value = true; // Устанавливаем флаг отправки

    const formElement = form.value;

    if (formElement) {
      try {
        await emailjs.sendForm(
          'service_6yvb247',
          'template_xtczx08',
          formElement,
          'glyEDgvmm-UyW94MX'
        );

        resetForm();
        toast.success('Заявка успешно отправлена!');
      } catch (error) {
        toast.error('Ошибка! Ваша заявка не отправлена');
      } finally {
        isSubmitting.value = false; // Сбрасываем флаг отправки после завершения
      }
    }
  };

  const resetForm = () => {
    name.value = '';
    phone.value = '';
    email.value = '';
    selectedActivity.value = '';
    formsToSignUp.value = [{ form: "" }];
    typesToSignUp.value = [{ type: "" }];
    // Очистка значения поля select
    if (form.value) {
      form.value.reset();
    }
  };

</script>

<style scoped>
  select {
  font-size: 20px;
  font-weight: 500;
  color: #000000;
}
</style>

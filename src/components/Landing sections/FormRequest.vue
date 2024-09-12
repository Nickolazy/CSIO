<template>
  <div class="section leave-request">
    <h2 class="visually-hidden">Оставить заявку на обучение</h2>
    <div class="container">
      <form @submit.prevent="sendEmail" ref="form" class="leave-request-form">
        <h3 class="heading-four leave-request-form-title">
          Оставить заявку на обучение
        </h3>

        <div class="leave-request-form-wrapper">
          <label class="visually-hidden" for="course-or-webinar">Выбор вебинара и семинара</label>
          <select v-model="webinar" class="leave-request-form-select leave-request-form-input leave-request-course-or-webinar" id="course-or-webinar" required>
            <option value="" disabled>Выбор вебинара и семинара</option>
            <!-- <option value="" 
              v-for="webinar in webinars">
                Вебинар
            </option> -->
            <option value="Вебинар">
                Вебинар
            </option>
            <option value="Вебинар">
                Вебинар
            </option>
            <option value="Вебинар">
                Вебинар
            </option>
          </select>

          <label class="visually-hidden" for="form-of-education">Форма обучения</label>
          <select v-model="formOfEducation" class="leave-request-form-select leave-request-form-input leave-request-form-of-education" id="form-of-education" required>
            <option value="" disabled>Форма обучения</option>
            <option value="Очная">Онлайн</option>
            <option value="Заочная">Офлайн</option>
          </select>

          <!-- <label class="visually-hidden" for="training-type">Вид обучения</label>
          <select v-model="trainingType" class="leave-request-form-select leave-request-form-input leave-request-training-type" id="training-type" required>
            <option value="" disabled>Вид обучения</option>
            <option value="Группа">В группе</option>
            <option value="Минигруппа">В мини-группе</option>
          </select> -->

          <label class="visually-hidden" for="student-name">Ваше имя</label>
          <input v-model="name" type="text" placeholder="Ваше имя" id="student-name" class="leave-request-form-input leave-request-student-name" required>

          <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
          <input v-model="phone" type="text" placeholder="+7 (___) ___ - ____" id="phone-number" class="leave-request-form-input leave-request-phone-number" required>

          <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
          <input v-model="email" type="email" placeholder="E-mail" id="email-address" class="leave-request-form-input leave-request-email-address" required>
        </div>

        <button class="button header-sign-up-button leave-request-form-button" type="submit">
          Записаться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  // import emailjs from '@emailjs/browser';
  import { onMounted, ref, computed } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const webinar = ref('');
  const formOfEducation = ref('');
  const trainingType = ref('');
  const name = ref('');
  const phone = ref('');
  const email = ref('');

  const store = useDataStore();
  onMounted(async () => {
    await store.fetchWebinars();
  });

  const webinars = computed(() => store.ВебинарыСеминары);

  const sendEmail = () => {
    emailjs.sendForm(
      'service_6yvb247', 
      'YOUR_TEMPLATE_ID', 
      document.querySelector('form'), 
      'YOUR_PUBLIC_KEY' 
    )
    .then((response) => {
      console.log('SUCCESS!', response);
    }, (error) => {
      console.log('FAILED...', error);
    });
  };

</script>

<style scoped>

</style>

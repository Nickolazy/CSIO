<template>
  <div class="section leave-request">
    <h2 class="visually-hidden">Оставить заявку на обучение</h2>
    <div class="container">
      <form @submit.prevent="sendEmail" class="leave-request-form">
      <h3 class="heading-four leave-request-form-title">
        Оставить заявку на обучение
      </h3>

      <div class="leave-request-form-wrapper">
        <label class="visually-hidden" for="course-or-webinar">Выбор курса или вебинара</label>
        <select
          class="leave-request-form-select leave-request-form-input leave-request-course-or-webinar"
          id="course-or-webinar" 
          required>
          <option value="" disabled selected>Выбор курса или вебинара</option>
          <option value="Курс 1">Курс 1</option>
          <option value="Курс 2">Курс 2</option>
          <option value="Курс 3">Курс 3</option>
        </select>

        <label class="visually-hidden" for="form-of-education">Форма обучения</label>
        <select
          class="leave-request-form-select leave-request-form-input leave-request-form-of-education"
          id="form-of-education" 
          required>
          <option value="" disabled selected>Форма обучения</option>
          <option value="Очная">Очная</option>
          <option value="Заочная">Заочная</option>
        </select>

        <label class="visually-hidden" for="training-type">Вид обучения</label>
        <select
          class="leave-request-form-select leave-request-form-input leave-request-training-type"
          id="training-type" 
          required>
          <option value="" disabled selected>Вид обучения</option>
          <option value="Очная">Группа</option>
          <option value="Заочная">Минигруппа</option>
        </select>

        <label class="visually-hidden" for="student-name">Ваше имя</label>
        <input
          type="text"
          placeholder="Ваше имя"
          id="student-name"
          class="leave-request-form-input leave-request-student-name">

        <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
        <input
          type="text"
          placeholder="+7 (___) ___ - ____"
          id="phone-number"
           class="leave-request-form-input leave-request-phone-number">

        <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
        <input
          type="text"
          placeholder="E-mail"
          id="email-address"
          class="leave-request-form-input leave-request-email-address">
      </div>

        <button class="button header-sign-up-button leave-request-form-button" type="submit">
          Записаться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const course = ref('');
  const formOfEducation = ref('');
  const trainingType = ref('');
  const name = ref('');
  const phone = ref('');
  const email = ref('');

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-email', {
        course: 'Курс 1',
        formOfEducation: 'Очная',
        trainingType: 'Группа',
        name: 'Иван Иванов',
        phone: '+7 (123) 456-7890',
        email: 'example@example.com'
      });
      console.log('Email sent successfully!', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

</script>

<style scoped>

</style>

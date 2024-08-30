<template>
  <div class="section banner">
    <div class="container container-banner-wrapper">
      <h1 class="heading-one banner-title">
        Ваш путь к знаниям<br/>
        начинается здесь
      </h1>

      <div class="banner-subtitle">
        <p>
          Запишитесь на курсы и вебинары в учебном центре ЦСИО и получите практические навыки от опытных преподавателей
        </p>
      </div>

      <button @click="scrollToSection('form')" class="button banner-button-sing-up" type="button">
        Записаться сейчас
      </button>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['scroll-to-section']);

  const scrollToSection = (sectionId) => {
    emit('scroll-to-section', sectionId);
  };
  </script>

<style scoped>

</style>
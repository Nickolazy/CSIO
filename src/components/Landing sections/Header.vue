<template>
  <div class="header">
    <div class="container-header container-header-wrapper">
      <div class="header-logo-wrapper">
        <img
          src="../../assets/img/logo/logo-header.svg"
          alt="ЦСИО"
          class="header-logo-image"
          width="179"
          height="77.8"
          loading="lazy">
        <span class="header-logo-text">
          центр современного<br/>
          инновационного<br/>
          образования
        </span>
      </div>
              
      <nav class="header-menu">
        <ul class="header-menu-list">
          <li class="header-menu-item">
            <a :class="{'header-menu-link': true, 'active': activeSection === 'home'}" @click.prevent="scrollToSection('home')">
              Главная
            </a>
          </li>
          <li class="header-menu-item">
            <a :class="{'header-menu-link': true, 'active': activeSection === 'about'}" @click.prevent="scrollToSection('about')">
              О нас
            </a>
          </li>
          <li class="header-menu-item">
            <a :class="{'header-menu-link': true, 'active': activeSection === 'courses'}" @click.prevent="scrollToSection('courses')">
              Курсы
            </a>
          </li>
          <li class="header-menu-item">
            <a :class="{'header-menu-link': true, 'active': activeSection === 'teachers'}" @click.prevent="scrollToSection('teachers')">
              Вебинары
            </a>
          </li>
          <li class="header-menu-item">
            <a :class="{'header-menu-link': true, 'active': activeSection === 'news'}" @click.prevent="scrollToSection('news')">
              Акции
            </a>
          </li>
        </ul>
      </nav>

      <div class="header-buttons-wrapper">
        <button class="header-menu-burger-button" type="button">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_429_11066)">
            <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_429_11066">
            <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"/>
            </clipPath>
            </defs>
          </svg>
        </button>

        <button @click="scrollToSection('form')" class="button header-sign-up-button" type="button">
          Записаться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeSection: String,
});

const emit = defineEmits(['scroll-to-section']);

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId);
};
</script>

<style scoped>
  .header-menu-link {
    color: black;
    transition: color 0.3s ease;

    cursor: pointer;
    user-select: none;
  }

  .header-menu-link.active {
    color: #6D0088;
  }
</style>
<template>
  <Header :activeSection="activeSection" @scrollToSection="scrollToSection"/>
  <Banner id="home" @scrollToSection="scrollToSection"/>
  <AboutUs id="about"/>
  <Courses id="courses"/>
  <Teachers id="teachers"/>
  <NewsAndEvents id="news"/>
  <FormRequest id="form"/>
  <Footer />
  <!-- <SocialNetSidebar /> -->


</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  import Header from './Landing sections/Header.vue';
  import Banner from './Landing sections/Banner.vue';
  import AboutUs from './Landing sections/AboutUs.vue';
  import Courses from './Landing sections/Courses.vue';
  import Teachers from './Landing sections/Teachers.vue';
  import NewsAndEvents from './Landing sections/NewsAndEvents.vue';
  import FormRequest from './Landing sections/FormRequest.vue';
  import Footer from './Landing sections/Footer.vue';
  import SocialNetSidebar from './Landing sections/SocialNetSidebar.vue';
  
  const activeSection = ref('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (sectionTop <= scrollPos && sectionBottom > scrollPos) {
        activeSection.value = section.id;
      }
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped>
  
</style>
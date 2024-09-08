<template>
  <div @click="openTeacherPage" class="teachers-item">
    <div class="teacher-avatar-wrapper">
      <img
        :src="curPhotoUrl"
        alt="Teacher"
        class="teacher-avatar"
        loading="lazy">
    </div>

    <div class="teacher-tilted-block">
      <div class="teacher-tilted-block-line"></div>
      <span class="teacher-tilted-block-name">
        {{ nameAndSurname }}
      </span>
      <span class="teacher-tilted-block-role">
        {{ teacher.post }}
      </span>
    </div>

      <div class="teacher-main-text-block">
        <ul class="teacher-main-text-list">
          <li v-for="(skill, index) in skills"
          :key="index" 
          class="teacher-main-text-item">
            <span>
              {{ skill }}
            </span>
          </li>
        </ul>
      </div>
  </div>
  <TeacherPage v-if="isTeacherPageOpened" 
    @close="handleClose"
    :teacher="teacher"
    :nameAndSurname="nameAndSurname"
    :shedules="shedules"
    :curPhotoUrl="curPhotoUrl"
    class="courses-all"/>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { defineProps } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import TeacherPage from '../Opened sections/TeacherPage.vue'

  const props = defineProps({
    teacher: {
      type: Object,
      required: true 
    }
  });

  const store = useDataStore();
  const teacher = props.teacher;
  const shedules = ref([]);
  const teacherName = ref(props.teacher.name);

  const fetchShedules = async () => {
    if (teacherName.value) {
      await store.fetchShedulesOfTeacher(teacherName.value);
      shedules.value = store.РасписаниеПреподавателей;
    }
  };

  watch(() => props.teacher.name, (newName) => {
    teacherName.value = newName;
    fetchShedules(); 
  }, { immediate: true });

  const nameAndSurname = computed(() => {
    const nameParts = teacher.name.split(' '); 
    if (nameParts.length >= 2) {
      return `${nameParts[0]} ${nameParts[1]}`; 
    }
    return teacher.name; 
  });

  const isTeacherPageOpened = ref(false);

  const openTeacherPage = () => {
    isTeacherPageOpened.value = true;
  }

  const handleClose = () => {
    isTeacherPageOpened.value = false;
  }

  const skills = computed(() => {
    return props.teacher?.skills ? skillsObj(props.teacher.skills) : [];
  });

  const skillsObj = (skills) => {
    if (!skills || typeof skills !== 'string') return []; 

    const parts = skills.split(';')
      .map(part => part.trim())
      .filter(part => part.length > 0);

    return parts;
  };

  const curPhotoUrl = ref('');
  
  onMounted(async () => {
    await store.fetchAllImages();
    let photoList = await store.Фото; // Получаем массив фото
    const updatedPhotoList = photoList.map(photo => ({
      name: removeExtension(photo.name),
      url: photo.url
    }));
    const photo = updatedPhotoList.find(photo => photo.name === teacher.name); // Ищем нужное фото
    if (photo) {
      curPhotoUrl.value = await photo.url; // Получаем url
    }
  });

  const removeExtension = (photoList) => {
    return photoList.replace(/\.[^.]*$/, '');
  };
</script> 

<style scoped>
  .courses-all {
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--z-index-big) + 1000);
    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.8);
  }
</style>
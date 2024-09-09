<template>
  <li class="webinars-seminars-drop-item">
     <div>
       <div v-if="haveForms" class="webinars-seminars-drop-item-length">
         <span>Количество часов:</span>
         <strong v-if="isWebinar">
           {{ formsWebinars[0]?.hours }}
         </strong>
         <strong v-else>
           {{ formsSeminars[0]?.hours }}
         </strong>
         &nbsp;
 
         <span>Продолжительность:</span>
         <strong v-if="isWebinar">
           {{ formsWebinars[0]?.length }}
         </strong>
         <strong v-else>
           {{ formsSeminars[0]?.length }}
         </strong>
         &nbsp;
       </div>
       <button @click="openDetails" class="button banner-button-sing-up courses-drop-item-more" type="button">
         Подробнее
       </button>
     </div>
 
     <div class="webinars-seminars-drop-item-programm">
       <span>{{ webinar.direction }}</span>
     </div>
 
     <div class="webinars-seminars-drop-item-title">
       <p>{{ webinar.title }}</p>
     </div>
 
     <div class="webinars-seminars-drop-item-teacher">
       <span>Преподаватель:</span>
       <a href="#" class="webinars-seminars-drop-item-teacher-link">
         {{ webinar.teacherName }}
       </a>
     </div>
   </li>
 </template>
 
 <script setup>
   import { computed, defineProps, onMounted, ref, watch } from 'vue';
   import { useDataStore } from '../../store/DataStore';
 
   const props = defineProps({
     webinar: Object
   });
 
   const webinar = props.webinar;
   const store = useDataStore();
 
   // Определяем, вебинар это или семинар
   const isWebinar = computed(() => {
     return props.webinar?.isWebinar || false;
   });
 
   // Форма для вебинаров и семинаров
   const formsWebinars = ref([{ hours: '', length: '' }]);
   const formsSeminars = ref([{ hours: '', length: '' }]);
 
   // Проверка наличия формы
   const haveForms = computed(() => {
     if (isWebinar.value) {
       return formsWebinars.value[0]?.hours || false;
     } else {
       return formsSeminars.value[0]?.hours || false;
     }
   });
 
   const emit = defineEmits(['openDetails']);
 
   // Открываем детали вебинара
   const openDetails = () => {
     emit('openDetails', props.webinar);
   };
 
   // Загружаем формы
   const fetchForms = async () => {
     if (props.webinar && props.webinar.title) {
       const title = props.webinar.title;
 
       // Получаем формы по названию вебинара
       formsWebinars.value = await store.fetchFormsByWebinar(title, true);
       formsSeminars.value = await store.fetchFormsByWebinar(title, false);
     }
   };
 
   // Загружаем данные при монтировании
   onMounted(() => {
     fetchForms();
   });
 
   // Следим за изменением вебинара
   watch(() => props.webinar, (newWebinar) => {
     if (newWebinar) {
       fetchForms();
     }
   });
 </script>
 
 <style scoped>
  
 </style>
 
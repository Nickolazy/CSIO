<template>
  <!-- Проверка на наличие shedule, если null или undefined, то строка не рендерится -->
  <tr v-if="sheduleExists" >
    <th>
      <span>{{ shedule.form || 'Не указано' }}</span>
    </th>
    <th>
      <span>{{ shedule.type || 'Не указано' }}</span>
    </th>
    <th>
      <span>
        <time :datetime="shedule.startDate">{{ shedule.startDate || 'Не указано' }}</time>
      </span>
    </th>
    <th>
      <span>{{ shedule.numOfClasses || 'Не указано' }}</span>
    </th>
    <th>
      <span>{{ shedule.time || 'Не указано' }}</span>
    </th>
    <th>
      <span>
        <address>{{ shedule.location || 'Не указано' }}</address>
      </span>
    </th>
    <th>
      <a @click="handleGoToTeacher" class="timetable-body-link-to-teacher">
        {{ shedule.teachers || 'Не указано' }}
      </a>
    </th>
    <th>
      <button @click="handleSignUp" class="button banner-button-sing-up timetable-sing-up-button" type="button">
        Записаться
      </button>
    </th>
  </tr>
</template>

<script setup>
import { computed} from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  shedule: {
    type: Object,
    default: () => null
  }
});

const sheduleExists = computed(() => {
  return props.shedule !== null && props.shedule !== undefined;
});

const emit = defineEmits(['signUp'], ['goToTeacher']);

// Функция для обработки регистрации
const handleSignUp = () => {
  emit('signUp', props.shedule);
};

const handleGoToTeacher = () => {
  emit('goToTeacher');
};
</script>

<style scoped>
  a {
    cursor: pointer;
  }
</style>

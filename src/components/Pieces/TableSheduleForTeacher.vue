<template>
  <!-- Проверка на наличие shedule, если null или undefined, то строка не рендерится -->
  <tr v-if="sheduleExists">
    <th>
      <span>{{ formattedTitle || 'Не указано' }}</span>
    </th>
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
      <button @click="handleSignUp" class="button banner-button-sing-up timetable-sing-up-button" type="button">
        Записаться
      </button>
    </th>
  </tr>
</template>

<script setup>
  import { computed, watch, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    shedule: {
      type: Object,
      default: () => null
    }
  });

  const sheduleExists = computed(() => {
    return props.shedule !== null && props.shedule !== undefined;
  });

  watch(() => props.shedule, (newShedule) => {
    console.log('Новое расписание:', newShedule);
  });

  const emit = defineEmits(['signUp']);

  const handleSignUp = () => {
    emit('signUp', props.shedule);
  };

  const splitTitle = (title) => {
    if (title) {
      const dotIndex = title.indexOf('.');
      if (dotIndex !== -1) {
        const beforeDot = title.slice(0, dotIndex).trim();
        const afterDot = title.slice(dotIndex + 1).trim();
        return { beforeDot, afterDot };
      }
      return { beforeDot: title.trim(), afterDot: '' };
    }
    return { beforeDot: '', afterDot: '' };
  };

  const titleParts = computed(() => {
    if (sheduleExists.value && props.shedule.title) {
      return splitTitle(props.shedule.title);
    }
    return { beforeDot: '', afterDot: '' };
  });

  const formattedTitle = computed(() => titleParts.value.beforeDot);
</script>

<style scoped>
  
</style>

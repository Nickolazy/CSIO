<template>
  <div class="edit-event">
    <h2>Редактировать событие</h2>
    <form @submit.prevent="updateEvent">
      <div class="form-group">
        <label for="title">Заголовок</label>
        <input v-model="form.title" type="text" id="title" required />
      </div>

      <div v-if="props.eventToEdit.dates" class="form-group">
        <label for="dates">Даты</label>
        <input v-model="form.dates" type="text" id="dates" required />
      </div>

      <div class="form-group">
        <label for="content">Содержание</label>
        <textarea v-model="form.content" id="content" required></textarea>
      </div>

      <button type="submit" class="button">Сохранить изменения</button>
      <button type="button" @click="cancelEdit" class="button cancel">Отмена</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';
import { useDataStore } from '../../store/DataStore';
import { onMounted } from 'vue';

const props = defineProps({
  eventToEdit: Object,
  type: String
});

const emit = defineEmits(['update:editing']);

const store = useDataStore();
const form = ref({
  title: '',
  dates: '',
  content: ''
});

onMounted(() => {
  if (props.eventToEdit) {
    form.value.title = props.eventToEdit.title;
    form.value.content = props.eventToEdit.content;
    if(props.eventToEdit.dates)
      form.value.dates = props.eventToEdit.dates;
  }
});

const updateEvent = async () => {
  try {
    await store.updateEvent(props.eventToEdit.$id, form.value, props.type);
    emit('update:editing', false);
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

const cancelEdit = () => {
  emit('update:editing', false);
};
</script>

<style scoped>
.edit-event {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #3023f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button.cancel {
  background-color: #f44336;
}

.button:hover {
  background-color: #1a00ac;
}

.button.cancel:hover {
  background-color: #d32f2f;
}
</style>

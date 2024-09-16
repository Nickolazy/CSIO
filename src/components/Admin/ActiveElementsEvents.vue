<template>
  <div>
    <div class="addingCourses">
      <h1>Акции/События/Новости</h1>
      <button class="button" @click="openAdding()">Добавить</button>
    </div>
    <div v-if="adding">
      <AddEvent :adding="adding" @update:adding="adding = $event" />
    </div>
    <div v-if="editing">
      <EditEvent :eventToEdit="eventToEdit" :type="typeToEdit"  @update:editing="editing = $event" />
    </div>
    <div v-else>
      <ul v-if="sales.length || news.length || events.length">
        <li v-for="sale in sales" :key="sale.$id">
          <div>
            <h3>
              Акция
            </h3>
          </div>
          <h4>{{ sale.dates }}</h4>
          <h2>{{ sale.title }}</h2>
          <p>{{ sale.content }}</p>
          <button @click="editItem('sale', sale)">Редактировать</button>
          <button @click="deleteSale(sale.$id)">Удалить</button>
        </li>

        <li v-for="n in news" :key="n.$id">
          <div>
            <h4>
              Новость
            </h4>
          </div>
          <h2>{{ n.title }}</h2>
          <p>{{ n.content }}</p>
          <button @click="editItem('news', n)">Редактировать</button>
          <button @click="deleteNew(n.$id)">Удалить</button>
        </li>

        <li v-for="event in events" :key="event.$id">
          <div>
            <h4>
              Событие
            </h4>
          </div>
          <h4>{{ event.dates }}</h4>
          <h2>{{ event.title }}</h2>
          <p>{{ event.content }}</p>
          <button @click="editItem('event', event)">Редактировать</button>
          <button @click="deleteEvent(event.$id)">Удалить</button>
        </li>
      </ul>
      <p v-else>Нет акций/событий/новостей</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import AddEvent from './AddEvent.vue';
  import EditEvent from './EditEvent.vue';

  const store = useDataStore();
  const news = computed(() => store.Новости);
  const sales = computed(() => store.Акции);
  const events = computed(() => store.События);

  const adding = ref(false);

  onMounted(async () => {
    await store.fetchNews();
    await store.fetchSales();
    await store.fetchEvents();
  });

  const openAdding = () => {
    adding.value = true;
  }

  const deleteSale = async (id) => {
    if (confirm('Вы уверены, что хотите удалить эту акцию?')) {
      await store.deleteSale(id);
    }
  };

  const deleteNew = async (id) => {
    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
      await store.deleteNew(id);
    }
  };

  const deleteEvent = async (id) => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      await store.deleteEvent(id);
    }
  };

  // const editingEvent = ref(false);
  // const editingNews = ref(false);
  const eventToEdit = ref(null);
  const typeToEdit = ref('');
  const editing = ref(false);

  const editItem = (type, item) => {
    eventToEdit.value = { ...item };
    typeToEdit.value = type;
    editing.value = true;
  }
</script>

<style scoped>
.addingCourses {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.addingCourses h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.button {
  height: 40px;
  padding: 8px 16px;
  background-color: #3023f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #1a00ac;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #ccc;
}
</style>

<template>
 <li class="webinars-seminars-drop-item">
                    <div class="webinars-seminars-drop-item-length">
                        <span>
                            Количество часов:
                        </span>
                        <!-- <strong v-if="formsWebinars[0].hours !== undefined" v-show="formsWebinars">{{ formsWebinars[0].hours }}</strong>
                        <strong v-else-if="formsSeminars[0].hours !== undefined" v-show="formsSeminars">{{ formsSeminars[0].hours }}</strong> -->
                        &nbsp;

                        <span>
                            Продолжительность:
                        </span>
                        <!-- <strong v-if="formsWebinars[0].length" v-show="formsWebinars">{{ formsWebinars[0].length }}</strong>
                        <strong v-else-if="formsSeminars[0].length" v-show="formsSeminars">{{ formsSeminars[0].length }}</strong> -->
                        &nbsp;

                        <button @click="openDetails" class="button banner-button-sing-up courses-drop-item-more" type="button">
                            Подробнее
                        </button>
                    </div>

                    <div class="webinars-seminars-drop-item-programm">
                        <span>
                          {{ webinar.direction }}
                        </span>
                    </div>

                    <div class="webinars-seminars-drop-item-title">
                        <p>
                          {{ webinar.title }}
                        </p>
                    </div>

                    <div class="webinars-seminars-drop-item-teacher">
                        <span>
                            Преподаватель:
                        </span>
                        
                        <a
                            href="#"
                            class="webinars-seminars-drop-item-teacher-link"
                        >
                          {{ webinar.teacherName }}
                        </a>
                    </div>
                </li>
</template>

<script setup>
  import { defineProps, onMounted, ref, watch } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const props = defineProps({
    webinar: Object
  })

  const webinar = props.webinar;
  const store = useDataStore();

  const formsWebinars = ref([{
    hours: '',
    length: ''
  }]);

  const formsSeminars = ref([{
    hours: '',
    length: ''
  }]);
  
  const emit = defineEmits(['openDetails']);

  // Передаем курс в событие
  const openDetails = () => {
    emit('openDetails', props.course);
  };

  const fetchForms = async () => {
    if (props.webinar && props.webinar.title) {
      const title = props.webinar.title;

      // Получаем формы по курсу
      formsWebinars.value = await store.fetchFormsByWebinar(title, true);
      formsSeminars.value = await store.fetchFormsByWebinar(title, false);
    }
  };

  onMounted(() => {
    fetchForms();
  });

  watch(() => props.webinar, (newWebinar) => {
    if (newWebinar) {
      fetchForms();
    }
  });
</script>

<style scoped>

</style>

<template>
	<li class="courses-drop-item">
        <div class="courses-drop-item-length-wrapper">
                        <div v-if="forms.length > 0" class="courses-drop-item-length">
                            <span>
                                Количество часов:
                            </span>
                            <strong v-show="forms">{{ forms[0].hours }}</strong>
                            &nbsp;

                            <span>
                                Продолжительность:
                            </span>
                            <strong v-show="forms">{{ forms[0].length }}</strong>
                            &nbsp;
                        </div>

                        <div v-else class="courses-drop-item-length">
                            <span>
                                Количество часов:
                            </span>
                            <span>
                                не указано
                            </span>
                            &nbsp;

                            <span>
                                Продолжительность:
                            </span>
                            <span>
                                не указано
                            </span>
                            &nbsp;
                        </div>

                        <button @click="openDetails" class="button banner-button-sing-up courses-drop-item-more" type="button">
                            Подробнее
                        </button>
                    </div>

					<div class="courses-drop-item-name">
						<p>
							{{ course.title }}
						</p>
					</div>

					<ul v-if="isProfessional" class="courses-drop-item-skills-list">
						<li class="courses-drop-item-skills-item">
							<p>
								Диплом предоставляет право на {{course.grantingRights }}
							</p>
						</li>
						<li class="courses-drop-item-skills-item">
							<p>
								Квалификация {{ course.qualification }}
							</p>
						</li>
					</ul>
				</li>
</template>

<script setup>
  import { defineProps, onMounted, ref, watch } from 'vue';
  import { useDataStore } from '../../store/DataStore';

  const props = defineProps({
    course: Object
  })

  const course = props.course;
  const store = useDataStore();

  let isProfessional = ref(false);
  const forms = ref([{
    hours: '',
    length: ''
  }]);

  onMounted(async () => {
    if (course.level === 'Профессиональная подготовка') {
      isProfessional.value = true;
    } else {
      isProfessional.value = false;
    }
  });
  
  const emit = defineEmits(['openDetails']);

  // Передаем курс в событие
  const openDetails = () => {
    emit('openDetails', props.course);
  };

  const fetchForms = async () => {
    if (props.course && props.course.title) {
      const title = props.course.title;

      // Получаем формы по курсу
      forms.value = await store.fetchFormsByCourse(title);
    }
  };

  onMounted(() => {
    fetchForms();
  });

  watch(() => props.course, (newCourse) => {
    if (newCourse) {
      fetchForms();
    }
  });

</script>

<style scoped>

</style>

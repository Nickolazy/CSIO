<template>
      <div v-if="!isCourseOpened" class="sidebar-drop-wrapper">
        <section class="sidebar-drop teacher-drop">
            <h2 class="sidebar-drop-title teacher-drop-title">
                {{ props.nameAndSurname }} - {{ teacher.post }}
            </h2>

            <div class="teacher-drop-info-image-wrapper">
                <div class="teacher-drop-info">
                    <div class="teacher-drop-info-description">
                        <p>
                            {{ teacher.name }} - {{ teacher.description }}
                        </p>
                    </div>
                    <ul class="teacher-drop-info-list">
                        <li class="teacher-drop-info-item">
                            <span>
                                Общий стаж работы:
                            </span>

                            <span>
                                {{ teacher.totalWorkExp }} лет
                            </span>
                        </li>

                        <li class="teacher-drop-info-item">
                            <span>
                                Стаж работы по специальности:
                            </span>

                            <span>
                              {{ teacher.localWorkExp }} лет
                            </span>
                        </li>

                        <li class="teacher-drop-info-item">
                            <span>
                                Образовательные программы:
                            </span>
                            <div>
                              <div v-for="(filteredTitle, index) in filteredTitles"
                              :key="index">
                                <a @click="goToCourse(filteredTitle.title)" class="link-to-course">
                                  {{ truncateText(filteredTitle.title) }}
                                </a>
                              </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <img
                    :src="curPhotoUrl"
                    alt="Фото учителя"
                    class="teacher-drop-image"
                    loading="lazy">
                
            </div>

            <h3  v-show="shedules" class="sidebar-drop-title teacher-drop-timetable-title">
                Расписание
            </h3>

            <div  v-show="shedules" class="courses-drop-more-timetable-wrapper">
                <table class="timetable">
                    <thead class="timetable-head">
                        <tr>
                          <th>
                              <span>Программа</span>
                          </th>
                          <th>
                              <span>Форма обучения</span>
                          </th>
                          <th>
                              <span>Вид обучения</span>
                          </th>
                          <th>
                              <span>Дата начала</span>
                          </th>
                          <th>
                              <span>Кол-во занятий</span>
                          </th>
                          <th>
                              <span>Время обучения</span>
                          </th>
                          <th>
                              <span>Место проведения</span>
                          </th>
                          <th class="visially-hidden"></th>
                        </tr>
                    </thead>
                    <tbody class="timetable-body">
                      <TableSheduleForTeacher @signUp="handleSignUp" v-for="(shedule, index) in shedules" 
                      :key="index" 
                      v-if="shedules !== null && shedules !== undefined" 
                      :shedule="shedule" />
                    </tbody>
                </table>
            </div>

            <button v-if="haveButtonBack" @click="handleBackButton" class="button close-button sidebar-drop-go-back-button" type="button">
                <svg viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="29.5386" y1="11.5769" x2="0.000112534" y2="11.5769" stroke="black"/>
                    <line x1="11.4307" y1="0.353553" x2="0.353779" y2="11.4305" stroke="black"/>
                    <line y1="-0.5" x2="15.6651" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 11.0771 23.0769)" stroke="black"/>
                </svg>
            </button>
            <button @click="closePage" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>

            <form v-if="wantToSignUp" ref="formCourse" @submit.prevent="sendEmail" class="courses-drop-more-leave-request" :key="JSON.stringify(sheduleToSignUp)">
                <h2 class="visually-hidden">Оставить заявку на обучение</h2>
                <div class="courses-drop-more-leave-request-wrapper">

                    <input type="hidden" v-model="title" name="title">

                    <label class="visually-hidden" for="in-group">В группе</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="in-group" 
                        name="form_of_education"
                        v-model="sheduleToSignUp.form"
                        :style="selectStyle"
                        required>
                        <option value="" disabled selected>Форма</option>
                        <option :value="sheduleToSignUp.form">{{sheduleToSignUp.form}}</option>
                    </select>

                    <label class="visually-hidden" for="in-minigroup">Мини-группа</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="in-minigroup" 
                        name="training-type"
                        :style="selectStyle"
                        v-model="sheduleToSignUp.type"
                        required>
                        <option value="" disabled selected>Вид</option>
                        <option :value="sheduleToSignUp.type">{{sheduleToSignUp.type}}</option>
                        
                    </select>

                    <label class="visually-hidden" for="start-date">Дата</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="start-date" 
                        name="start-date"
                        v-model="sheduleToSignUp.startDate"
                        :style="selectStyle"
                        required>
                        <option value="" disabled selected>Дата</option>
                        <option :value="sheduleToSignUp.startDate">{{sheduleToSignUp.startDate}}</option>
                    </select>

                    <label class="visually-hidden" for="student-name">Ваше имя</label>
                    <input
                        v-model="name"
                        type="text"
                        placeholder="Ваше имя"
                        id="student-name"
                        name="student-name"
                        class="leave-request-form-input leave-request-student-name courses-drop-more-input" required>

                    <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
                    <input
                        v-model="phone"
                        type="text"
                        placeholder="+7 (___) ___ - ____"
                        id="phone-number"
                        name="phone-number"
                        class="leave-request-form-input leave-request-phone-number courses-drop-more-input" required>

                    <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
                    <input
                        v-model="email"
                        type="text"
                        placeholder="E-mail"
                        id="email-address"
                        name="email-address"
                        class="leave-request-form-input leave-request-email-address courses-drop-more-input" required>
                </div>

                <button class="button banner-button-sing-up courses-drop-more-button" type="submit">
                    Записаться
                </button>
            </form>
        </section>
      </div>
        <WebinarPage v-else-if="isCourseOpened && isWebinar"
          @close="handleClose" 
          @back="handleBack" 
          :webinar="courseToOpen"/>
        <CoursePage v-else-if="isCourseOpened && !isWebinar"
          @close="handleClose" 
          @back="handleBack" 
          :course="courseToOpen"/>
</template>

<script setup>
  import { ref, computed, nextTick, reactive } from 'vue';
  import { onMounted, onUnmounted } from 'vue';

  import { defineEmits } from 'vue';
  import { defineProps } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import TableSheduleForTeacher from '../Pieces/TableSheduleForTeacher.vue';
  import CoursePage from './CoursePage.vue'
  import WebinarPage from './WebinarPage.vue';

  import emailjs from '@emailjs/browser';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  // Вычисляемое свойство для динамического стиля
  const selectStyle = computed(() => ({
    opacity: wantToSignUp.value === true ? 1 : 0.7,
    color: wantToSignUp.value === true ? '#000000' : '#430B51',

  }));

  onMounted(() => {
    // Блокируем прокрутку страницы
    document.body.classList.add('no-scroll');
  });

  onUnmounted(() => {
    // Разблокируем прокрутку при размонтировании компонента
    document.body.classList.remove('no-scroll');
  });

  const wantToSignUp = ref(false);
  const sheduleToSignUp = reactive({});
  const isCourseOpened = ref(false);

  const isWebinar = ref(false);
  let courseToOpen = ref({});

  const store = useDataStore();

  const props = defineProps({
    teacher: {
      type: Object,
      required: true 
    },
    nameAndSurname: {
      type: String,
      required: true 
    },
    shedules: {
      type: Object,
      required: true 
    },
    curPhotoUrl: {
      type: String,
      required: true 
    },
    haveButtonBack: {
      type: Boolean,
      required: false
    }
  });

  const curPhotoUrl = computed(() => {
    return props.curPhotoUrl;
  });

  const filteredTitles = computed(() => {
    return filterTitles(props.shedules);
  })

  const teacher = props.teacher;
  const shedulesAll = store.РасписаниеПреподавателей;
  
  const emit = defineEmits(['close']);

  const closePage = () => {
    emit('close');
  };

  const handleBackButton = () => {
    emit('backButton');
  };

  const handleSignUp = (shedule) => {
    wantToSignUp.value = true;
    Object.assign(sheduleToSignUp, shedule);
    
    nextTick(() => {
      const formElement = document.querySelector(".courses-drop-more-leave-request");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  function truncateText(text) {
    if (!text) return '';

    const parts = text.split('.');

    return parts[0].trim();
  }

  const goToCourse = (title) => {
    store.fetchWebinars();
    store.fetchCourses();
    
    const courses = store.Курсы;
    const webinars = store.ВебинарыСеминары;

    courseToOpen = courses.find(course => course.title === title);
    if(!courseToOpen) {
      courseToOpen = webinars.find(webinar => webinar.title === title);

      isWebinar.value = true;
    } else {
      isWebinar.value = false;
    }

    isCourseOpened.value = true;
  }

  function filterTitles(shedules) {
    const filterShedules = new Set();

    return shedules.filter(shedule => {
      if(filterShedules.has(shedule.title)) {
        return false;
      } else {
        filterShedules.add(shedule.title);
        return true;
      }
    });
  }

  // Метод для закрытия деталей курса
  const handleClose = () => {
    isCourseOpened.value = false;
    emit('close');
  };

  // Метод для возврата к списку курсов
  const handleBack = () => {
    isCourseOpened.value = false;
  };

  const formCourse = ref(null); 

  const title = computed(() => {
    if (sheduleToSignUp.title) {
      return truncateText(sheduleToSignUp.title);
    }
    return '';
  });

  const name = ref('');
  const phone = ref('');
  const email = ref('');

  const isSubmitting = ref(false); // Флаг для отслеживания состояния отправки

  const sendEmail = async () => {
    if (isSubmitting.value) return; // Предотвращаем повторные отправки

    isSubmitting.value = true; // Устанавливаем флаг отправки

    const formElement = formCourse.value;

    if (formElement) {
      try {
        await emailjs.sendForm(
        'service_6yvb247',
        'template_w02xpsb',
        formElement,
        'glyEDgvmm-UyW94MX'
        );

        resetForm();
        toast.success('Заявка успешно отправлена!');
      } catch (error) {
        toast.error('Ошибка! Ваша заявка не отправлена');
      } finally {
        isSubmitting.value = false; // Сбрасываем флаг отправки после завершения
      }
    }
  };

  const resetForm = () => {
    name.value = '';
    phone.value = '';
    email.value = '';

    // Очистка значения поля select
    if (formCourse.value) {
      formCourse.value.reset();
    }
  };

</script>

<style scoped>
  .shedule-item {
    display: block;
  }

  .link-to-course {
    cursor: pointer;
  }

  .link-to-course:hover {
    text-decoration: underline;
  }

</style>

<style>
  .no-scroll {
    overflow: hidden;
  }
</style>

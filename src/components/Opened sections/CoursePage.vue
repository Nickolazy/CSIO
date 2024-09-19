<template>
  <div v-if="!isGoingToTeacher" class="sidebar-drop-wrapper">
        <section class="sidebar-drop courses-drop-more">
            <h2 class="sidebar-drop-title courses-drop-more-title">
                {{ formattedTitle }}
            </h2>

            <div class="courses-drop-more-essential-wrapper">
                <div class="courses-drop-more-essential-info">
                    <div class="courses-drop-more-essential-info-title">
                        <p>
                            {{ subTitle }}
                        </p>
                    </div>

                    <div class="info-table-wrapper">
                        <table class="info-table">
                            <thead class="info-table-head">
                                <tr>
                                    <th>
                                        <span>Форма обучения</span>
                                    </th>
                                    <th>
                                        <span>Количество часов</span>
                                    </th>
                                    <th>
                                        <span>Продолжительность</span>
                                    </th>
                                    <th>
                                        <span>Стоимость (руб.)</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="info-table-body">
                                <TableForm v-for="(form, index) in forms"
                                  :key="index"
                                  :form="form"
                                  :haveTypes="isHaveTypes(form)"
                                  :types="searchTypes(form)"/>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="courses-drop-more-essential-steps">
                    <ul class="more-essential-steps-list">
                      <li v-for="(stage, index) in stages" 
                        :key="index" 
                        class="more-essential-steps-item">
                        <span>
                          {{ stage }}
                        </span>
                      </li>
                    </ul>
                </div>
            </div>

            <h3 class="sidebar-drop-title courses-drop-more-subtitle">
                О курсе
            </h3>

            <div class="courses-drop-more-description">
                <p>
                  {{ description }}
                </p>
            </div>

            <h3 v-show="shedules.length > 0" class="sidebar-drop-title courses-drop-more-subtitle">
                Расписание
            </h3>

            <div v-show="shedules.length > 0" class="courses-drop-more-timetable-wrapper">
                <table class="timetable">
                    <thead class="timetable-head">
                        <tr>
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
                            <th>
                                <span>Преподаватели</span>
                            </th>
                            <th class="visially-hidden"></th>
                        </tr>
                    </thead>
                    <tbody class="timetable-body">
                      <TableShedule @signUp="handleSignUp" @goToTeacher="handleGoToTeacher" v-for="(shedule, index) in shedules" 
                      :key="index" 
                      v-if="shedules !== null && shedules !== undefined" 
                      :shedule="shedule" />
                    </tbody>
                </table>
            </div>

            <form v-if="wantToSignUp" ref="formCourse" @submit.prevent="sendEmail" class="courses-drop-more-leave-request">
                <h2 class="visually-hidden">Оставить заявку на обучение</h2>
                <div class="courses-drop-more-leave-request-wrapper">

                  <input type="hidden" v-model="title" name="title">
                  <input type="hidden" v-model="sheduleToSignUp.time" name="time">

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
                        v-model="sheduleToSignUp.type"
                        :style="selectStyle"
                        required
                    >
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
                        class="leave-request-form-input leave-request-student-name courses-drop-more-input"
                        required
                    >

                    <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
                    <input
                        v-model="phone"
                        type="text"
                        placeholder="+7 (___) ___ - ____"
                        id="phone-number"
                        name="phone-number"
                        class="leave-request-form-input leave-request-phone-number courses-drop-more-input"
                        required
                    >

                    <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
                    <input
                        v-model="email"
                        type="text"
                        placeholder="E-mail"
                        id="email-address"
                        name="email-address"
                        class="leave-request-form-input leave-request-email-address courses-drop-more-input"
                        required
                    >
                </div>

                <button class="button banner-button-sing-up courses-drop-more-button" type="submit">
                    Записаться
                </button>
            </form>

            <form v-if="!hasShedules" ref="formCourse" @submit.prevent="sendEmail" class="courses-drop-more-leave-request">
                <h2 class="visually-hidden">Оставить заявку на обучение</h2>
                <div class="courses-drop-more-leave-request-wrapper">

                  <input type="hidden" v-model="title" name="title">

                  <input type="hidden" v-model="formNone" name="form_of_education">

                  <input type="hidden" v-model="formNone" name="training-type">

                  <input type="hidden" v-model="formNone" name="start-date">

                    <label class="visually-hidden" for="student-name">Ваше имя</label>
                    <input
                        v-model="name"
                        type="text"
                        placeholder="Ваше имя"
                        id="student-name"
                        name="student-name"
                        class="leave-request-form-input leave-request-student-name courses-drop-more-input"
                        required
                    >

                    <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
                    <input
                        v-model="phone"
                        type="text"
                        placeholder="+7 (___) ___ - ____"
                        id="phone-number"
                        name="phone-number"
                        class="leave-request-form-input leave-request-phone-number courses-drop-more-input"
                        required
                    >

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

            <button @click="handleBack" class="button close-button sidebar-drop-go-back-button" type="button">
                <svg viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="29.5386" y1="11.5769" x2="0.000112534" y2="11.5769" stroke="black"/>
                    <line x1="11.4307" y1="0.353553" x2="0.353779" y2="11.4305" stroke="black"/>
                    <line y1="-0.5" x2="15.6651" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 11.0771 23.0769)" stroke="black"/>
                </svg>
            </button>

            <button  @click="handleClose" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>
        </section>
    </div>
    <TeacherPage v-else
      @close="handleClose"
      @backButton="handleBackButton"
      :haveButtonBack="true"
      :teacher="teacher"
      :nameAndSurname="nameAndSurname"
      :shedules="shedulesAll"
      :curPhotoUrl="curPhotoUrl"/>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, watch, nextTick, reactive } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import TableForm from '../Pieces/TableForm.vue';
  import TableShedule from '../Pieces/TableShedule.vue';
  import TeacherPage from '../Opened sections/TeacherPage.vue';

  import emailjs from '@emailjs/browser';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  const props = defineProps({
    course: {
      type: Object,
      required: false 
    }
  });

  // Вычисляемое свойство для динамического стиля
  const selectStyle = computed(() => ({
    opacity: wantToSignUp.value === true ? 1 : 0.7,
    color: wantToSignUp.value === true ? '#000000' : '#430B51',

  }));

  const emit = defineEmits(['close', 'back']);

  const handleClose = () => {
    emit('close');
    wantToSignUp.value = false;
  };

  const handleBack = () => {
    emit('back');
    wantToSignUp.value = false;
  };

  const handleBackButton = () => {
    emit('backButton');
    isGoingToTeacher.value = false;
  }

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
    if (props.course && props.course.title) {
      return splitTitle(props.course.title);
    }
    return { beforeDot: '', afterDot: '' };
  });

  const formattedTitle = computed(() => titleParts.value.beforeDot);
  const subTitle = computed(() => titleParts.value.afterDot);

  const description = computed(() => {
    return props.course?.description || '';
  });

  const store = useDataStore();

  const forms = ref([]);
  const types = ref([]);
  const shedules = ref([]);

  const wantToSignUp = ref(false);
  const sheduleToSignUp = reactive({});

  const isGoingToTeacher = ref(false);
  const teacher = ref({});

  const teachers = ref([]);
  const curPhotoUrl = ref('');
  const shedulesAll = ref([]);

  const hasShedules = ref(true);

  const fetchFormsAndTypes = async () => {
    if (props.course && props.course.title) {
      const title = props.course.title;

      // Получаем формы и типы по курсу
      forms.value = await store.fetchFormsByCourse(title);
      types.value = await store.fetchTypesByCourse(title);
      shedules.value = await store.fetchShedulesByCourse(title);

      if(shedules.value.length < 1) {
        hasShedules.value = false;
      }
    }

    if (shedules.value && shedules.value[0]) {
      teachers.value = await store.fetchTeachersByWebinar(shedules.value[0].teachers);
    }
  };

  watch(() => props.course, (newCourse) => {
    if (newCourse) {
      hasShedules.value = true;
      shedules.value = [];

      fetchFormsAndTypes();
    }
  });

  onMounted(() => {
    document.body.classList.add('no-scroll');

    fetchFormsAndTypes();
  });

  onUnmounted(() => {
    document.body.classList.remove('no-scroll');

    hasShedules.value = true;
    name.value = phone.value = email.value = "";
  });

  watch(() => props.course, (newCourse) => {
    if (newCourse) {
      fetchFormsAndTypes();
    }
  });

  const stagesObj = (stages) => {
    if (!stages) return [];

    const parts = stages.split(';').map(part => part.trim());

    return parts;
  };

  const stages = computed(() => {
    return props.course?.stages ? stagesObj(props.course.stages) : [];
  });

  const isHaveTypes = (form) => {
    return types.value.some(item => item.form === form.form);
  };

  const searchTypes = (form) => {
    return types.value.filter(item => item.form === form.form);
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

  const handleGoToTeacher = (name) => {
    teacher.value = teachers.value.filter(teacher => 
      teacher.name === name);

    teacher.value = teacher.value[0];

    isGoingToTeacher.value = true;
  }

  const teacherName = computed(() => {
    // Проверяем, что расписание существует и содержит преподавателя
    if (shedules.value.length > 0 && shedules.value[0].teachers) {
      return shedules.value[0].teachers;
    }
    return ''; // Если нет данных, возвращаем пустую строку
  });

  const nameAndSurname = computed(() => {
    if (shedules.value[0].teachers) {
      const teacher = shedules.value[0].teachers; // Получаем значение teachers
      const nameParts = teacher.split(' '); // Предполагаем, что teacher — это строка
      if (nameParts.length >= 2) {
        return `${nameParts[0]} ${nameParts[1]}`; // Возвращаем имя и фамилию
      }
      return teacher; // Если имя состоит только из одного слова
    }
    return ''; // Если нет данных о преподавателе
  });

  onMounted(async () => {
    await store.fetchAllImages(); // Ждем загрузки всех изображений

    // Получаем массив фото
    let photoList = store.Фото;
    
    // Если store.Фото возвращает Promise, то надо дождаться его разрешения
    if (photoList instanceof Promise) {
      photoList = await photoList;
    }
    
    const updatedPhotoList = photoList.map(photo => ({
      name: removeExtension(photo.name),
      url: photo.url
    }));

    // Следим за изменениями в teacherName
    watch(teacherName, (newName) => {
      const photo = updatedPhotoList.find(photo => photo.name === newName.trim()); // Ищем нужное фото

      if (photo) {
        // Если photo.url — Promise, то ждем его разрешения
        if (photo.url instanceof Promise) {
          photo.url.then(url => {
            curPhotoUrl.value = url; // Устанавливаем URL
            console.log("URL Фото: ", curPhotoUrl.value);
          }).catch(error => {
            console.error('Ошибка при разрешении URL:', error);
          });
        } else {
          curPhotoUrl.value = photo.url; // Устанавливаем URL
          console.log("URL Фото: ", curPhotoUrl.value);
        }
      }
    });
  });

  const removeExtension = (photoList) => {
    return photoList.replace(/\.[^.]*$/, '');
  };

  watch(teacherName, (newTeacherName) => {
    if (newTeacherName) {
      fetchShedules(newTeacherName);
    }
  });

  const fetchShedules = async (name) => {
    if (name) {
      await store.fetchShedulesOfTeacher(name);
      shedulesAll.value = store.РасписаниеПреподавателей;
    }
  };

  const formCourse = ref(null); 

  const title = computed(() => {
    if (formattedTitle.value) {
      return formattedTitle.value.toString();
    }
    return '';
  });
  
  const name = ref('');
  const phone = ref('');
  const email = ref('');

  const formNone = "Не указано";

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

</style>

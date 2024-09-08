<template>
<div class="sidebar-drop-wrapper">
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
                                  :types="searchTypes(form)" />

                                <tr class="info-table-body-other">
                                    <th>
                                        <span>Группа</span>
                                    </th>
                                    <th>
                                        <span>40</span>
                                    </th>
                                    <th>
                                        <span>1 неделя</span>
                                    </th>
                                    <th>
                                        <span>от 2000</span>
                                    </th>
                                </tr>

                                <tr class="info-table-body-other">
                                    <th>
                                        <span>Мини группа</span>
                                    </th>
                                    <th>
                                        <span>40</span>
                                    </th>
                                    <th>
                                        <span>1 недели</span>
                                    </th>
                                    <th>
                                        <span>от 2000</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span>Очно-заочная</span>
                                    </th>
                                    <th>
                                        <span>40</span>
                                    </th>
                                    <th>
                                        <span>2 недели</span>
                                    </th>
                                    <th>
                                        <span>от 5000</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th class="info-table-body-more">
                                        <span>Заочная</span>
                                        <button class="button info-table-body-more-button" type="button">
                                            <img
                                                src="./img/icons/table-icon-more-arrow.svg"
                                                alt="Больше информации"
                                                loading="lazy"
                                            >
                                        </button>
                                    </th>
                                    <th>
                                        <span>40</span>
                                    </th>
                                    <th>
                                        <span>2 недели</span>
                                    </th>
                                    <th>
                                        <span>от 5000</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span>Индивидуальная</span>
                                    </th>
                                    <th>
                                        <span>40</span>
                                    </th>
                                    <th>
                                        <span>2 недели</span>
                                    </th>
                                    <th>
                                        <span>от 5000</span>
                                    </th>
                                </tr>
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

            <div class="webinar-about-wrapper">
                <div class="webinar-description">
                    <h3 class="webinar-title courses-drop-more-subtitle">
                        О вебинаре
                    </h3>

                    <div class="webinar-description-text">
                        <p>
                            {{ description }}
                        </p>
                    </div>
                </div>

                <div class="webinar-teacher">
                    <h3 class="webinar-title courses-drop-more-subtitle">
                        Преподаватель
                    </h3>

                    <div class="webinar-teacher-image">
                        <img src="./img/drop-sidebars/teacher.png" alt="Фото преподавателя" loading="lazy">
                    </div>

                    <span class="webinar-teacher-name">
                        Максим Андреев
                    </span>

                    <span class="webinar-teacher-role">
                        Ведущий аналитик данных
                    </span>
                </div>
            </div>

            <h3 class="sidebar-drop-title courses-drop-more-subtitle">
                Расписание
            </h3>

            <div class="courses-drop-more-timetable-wrapper">
                <table class="timetable">
                    <thead class="timetable-head">
                        <tr>
                            <th>
                                <span>Форма обучения</span>
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
                        <tr>
                            <th>
                                <span>В группе</span>
                            </th>
                            <th>
                                <span>
                                    <time datetime="2022-11-30">
                                        30.11.2022
                                    </time>
                                </span>
                            </th>
                            <th>
                                <span>15</span>
                            </th>
                            <th>
                                <span>пн, пт 16:00-19:00</span>
                            </th>
                            <th>
                                <span>
                                    <address>
                                        Чернышевского, 82, ауд. 244
                                    </address>
                                </span>
                            </th>
                            <th>
                                <a href="#" class="timetable-body-link-to-teacher">
                                    Артемова Дарья Сергеевна
                                </a>
                            </th>
                            <th>
                                <button 
                                    class="button banner-button-sing-up timetable-sing-up-button"
                                    type="button"
                                >
                                    Записаться
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <span>В группе</span>
                            </th>
                            <th>
                                <span>
                                    <time datetime="2022-11-30">
                                        30.11.2022
                                    </time>
                                </span>
                            </th>
                            <th>
                                <span>15</span>
                            </th>
                            <th>
                                <span>пн, пт 16:00-19:00</span>
                            </th>
                            <th>
                                <span>
                                    <address>
                                        Чернышевского, 82, ауд. 244
                                    </address>
                                </span>
                            </th>
                            <th>
                                <a href="#" class="timetable-body-link-to-teacher">
                                    Артемова Дарья Сергеевна
                                </a>
                            </th>
                            <th>
                                <button 
                                    class="button banner-button-sing-up timetable-sing-up-button"
                                    type="button"
                                >
                                    Записаться
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <span>В группе</span>
                            </th>
                            <th>
                                <span>
                                    <time datetime="2022-11-30">
                                        30.11.2022
                                    </time>
                                </span>
                            </th>
                            <th>
                                <span>15</span>
                            </th>
                            <th>
                                <span>пн, пт 16:00-19:00</span>
                            </th>
                            <th>
                                <span>
                                    <address>
                                        Чернышевского, 82, ауд. 244
                                    </address>
                                </span>
                            </th>
                            <th>
                                <a href="#" class="timetable-body-link-to-teacher">
                                    Артемова Дарья Сергеевна
                                </a>
                            </th>
                            <th>
                                <button 
                                    class="button banner-button-sing-up timetable-sing-up-button"
                                    type="button"
                                >
                                    Записаться
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <form v-if="wantToSignUp" class="courses-drop-more-leave-request">
                <h2 class="visually-hidden">Оставить заявку на обучение</h2>
                <div class="courses-drop-more-leave-request-wrapper">
                    <label class="visually-hidden" for="in-group">В группе</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="in-group" 
                        required>
                        <option value="" disabled selected>Форма</option>
                        <option value="Очная">Очная</option>
                        <option value="Заочная">Заочная</option>
                    </select>

                    <label class="visually-hidden" for="in-minigroup">Мини-группа</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="in-minigroup" 
                        required
                    >
                        <option value="" disabled selected>Вид</option>
                        <option value="В минигруппе">Мини-группа</option>
                        <option value="В группе">Группа</option>
                        
                    </select>

                    <label class="visually-hidden" for="start-date">Дата</label>
                    <select
                        class="leave-request-form-select leave-request-form-input courses-drop-more-input"
                        id="start-date" 
                        required>
                        <option value="" disabled selected>Дата</option>
                        <option value="30.11.2022">30.11.2022</option>
                        <option value="30.11.2022">30.11.2022</option>
                        <option value="30.11.2022">30.11.2022</option>
                        <option value="30.11.2022">30.11.2022</option>
                    </select>

                    <label class="visually-hidden" for="student-name">Ваше имя</label>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        id="student-name"
                        class="leave-request-form-input leave-request-student-name courses-drop-more-input"
                    >

                    <label class="visually-hidden" for="phone-number">Ваш номер телефона</label>
                    <input
                        type="text"
                        placeholder="+7 (___) ___ - ____"
                        id="phone-number"
                        class="leave-request-form-input leave-request-phone-number courses-drop-more-input"
                    >

                    <label class="visually-hidden" for="email-address">Ваша электронная почта</label>
                    <input
                        type="text"
                        placeholder="E-mail"
                        id="email-address"
                        class="leave-request-form-input leave-request-email-address courses-drop-more-input"
                    >
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

            <button @click="handleClose" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>
        </section>
    </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useDataStore } from '../../store/DataStore';
  import TableForm from '../Pieces/TableForm.vue';
  import TableShedule from '../Pieces/TableShedule.vue';
  import TeacherPage from '../Opened sections/TeacherPage.vue';

  const props = defineProps({
    webinar: {
      type: Object,
      required: false 
    }
  });

  const emit = defineEmits(['close', 'back']);

  const handleClose = () => {
    emit('close');
    wantToSignUp.value = false;
  };

  const handleBack = () => {
    emit('back');
    wantToSignUp.value = false;
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
    if (props.webinar && props.webinar.title) {
      return splitTitle(props.webinar.title);
    }
    return { beforeDot: '', afterDot: '' };
  });

  const formattedTitle = computed(() => titleParts.value.beforeDot);
  const subTitle = computed(() => titleParts.value.afterDot);

  const description = computed(() => {
    return props.webinar?.description || '';
  });

  const store = useDataStore();

  const forms = ref([]);
  const types = ref([]);
  const shedules = ref([]);

  const wantToSignUp = ref(false);
  const sheduleToSignUp = ref([]);

  const fetchFormsAndTypes = async () => {
    if (props.webinar && props.webinar.title) {
      const title = props.webinar.title;

      // Получаем формы и типы по курсу
      forms.value = await store.fetchFormsByWebinar(title, true);
      types.value = await store.fetchFormsByWebinar(title, true);
      shedules.value = await store.fetchFormsByWebinar(title, true);
    }
  };

  onMounted(() => {
    fetchFormsAndTypes();
  });

  watch(() => props.webinar, (newWebinar) => {
    if (newWebinar) {
      fetchFormsAndTypes();
    }
  });

  const stagesObj = (stages) => {
    if (!stages) return [];

    const parts = stages.split(';').map(part => part.trim());

    return parts;
  };

  const stages = computed(() => {
    return props.webinar?.stages ? stagesObj(props.webinar.stages) : [];
  });

  const isHaveTypes = (form) => {
    return types.value.some(item => item.form === form.form);
  };

  const searchTypes = (form) => {
    return types.value.filter(item => item.form === form.form);
  };

  const handleSignUp = (shedule) => {
    wantToSignUp.value = true;

    sheduleToSignUp.value = shedule;
  }

</script>

<style>

</style>

<template>
  <div class="sidebar-drop-wrapper">
        <section class="sidebar-drop teacher-drop">
            <h2 class="sidebar-drop-title teacher-drop-title">
                {{ props.nameAndSurname }} - {{ teacher.post }}
            </h2>

            <div class="teacher-drop-info-image-wrapper">
                <div class="teacher-drop-info">
                    <div class="teacher-drop-info-description">
                        <p>
                            {{ teacher.name }} = {{ teacher.description }}
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

                            <span v-for="(shedule, index) in shedules"
                            :key="index">
                              {{ truncateText(shedule.title) }}
                            </span>
                        </li>
                    </ul>
                </div>

                <img
                    :src="curPhotoUrl"
                    alt="Фото учителя"
                    class="teacher-drop-image"
                    loading="lazy"
                >
                
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

            <button @click="closePage" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>

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
        </section>
    </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { defineEmits } from 'vue';
  import { defineProps } from 'vue';
  import TableSheduleForTeacher from '../Pieces/TableSheduleForTeacher.vue';

  const wantToSignUp = ref(false);
  const sheduleToSignUp = ref([]);

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
    }
  });

  const curPhotoUrl = computed(() => {
    return props.curPhotoUrl;
  });

  const teacher = props.teacher;
  
  const emit = defineEmits(['close']);

  const closePage = () => {
    emit('close');
  };

  const handleSignUp = (shedule) => {
    wantToSignUp.value = true;

    sheduleToSignUp.value = shedule;
    console.log(sheduleToSignUp.value);
  }

  function truncateText(text) {
  if (!text) return '';

  const parts = text.split('.');

  return parts[0].trim();
}

</script>

<style scoped>
  
</style>

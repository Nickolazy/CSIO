<template>
  <div class="sidebar-drop-wrapper">
        <section class="sidebar-drop teacher-drop">
            <h2 class="sidebar-drop-title teacher-drop-title">
                Максим Андреев - Ведущий аналитик данных
            </h2>

            <div class="teacher-drop-info-image-wrapper">
                <div class="teacher-drop-info">
                    <div class="teacher-drop-info-description">
                        <p>
                            Максим Андреев – опытный аналитик данных с более чем 12-летним стажем работы в сфере бизнес-аналитики и обработки больших данных. Он специализируется на разработке и внедрении аналитических решений, которые помогают компаниям принимать обоснованные решения на основе данных. Максим является экспертом в области машинного обучения, анализа данных и их визуализации, а также активно участвует в научных исследованиях и публикациях на тему применения искусственного интеллекта в бизнесе.
                        </p>
                    </div>
                    <ul class="teacher-drop-info-list">
                        <li class="teacher-drop-info-item">
                            <span>
                                Общий стаж работы:
                            </span>

                            <span>
                                40 лет
                            </span>
                        </li>

                        <li class="teacher-drop-info-item">
                            <span>
                                Стаж работы по специальности:
                            </span>

                            <span>
                                18 лет
                            </span>
                        </li>

                        <li class="teacher-drop-info-item">
                            <span>
                                Образовательные программы:
                            </span>

                            <span>
                                27.01.01 Менеджер по продажам 38.03.11 Финансовый менеджмент
                            </span>
                        </li>
                    </ul>
                </div>

                <img
                    src="../../assets/img/drop-sidebars/teacher.png"
                    alt="Фото учителя"
                    class="teacher-drop-image"
                    loading="lazy"
                >
                
            </div>

            <h3 class="sidebar-drop-title teacher-drop-timetable-title">
                Расписание
            </h3>

            <div class="courses-drop-more-timetable-wrapper">
                <table class="timetable">
                    <thead class="timetable-head">
                        <tr>
                            <th>
                                <span>Вебинар</span>
                            </th>
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
                                <span>Менеджмент продаж</span>
                            </th>
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
                                <span>Менеджмент продаж</span>
                            </th>
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
                                <span>Менеджмент продаж</span>
                            </th>
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

            <button @click="closePage" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>
        </section>
    </div>
</template>

<script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['close']);

  const closePage = () => {
    emit('close');
  };
</script>

<style scoped>
  
</style>

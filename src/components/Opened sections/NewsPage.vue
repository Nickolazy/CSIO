<template >
  <div class="sidebar-drop-wrapper">
        <section class="sidebar-drop news-events-drop">
            <h2 class="sidebar-drop-title news-events-drop-title">
                Путин поддержал идею допподготовки педагогов по другим направлениям
            </h2>

            <div class="news-events-drop-content">
                <p>
                    Президент России Владимир Путин поддержал идею о курсах дополнительной подготовки для педагогов по другим направлениям, речь об этом зашла на встрече главы государства с финалистами всероссийского конкурса "Учитель года".  "Я бы это поддержал. <br><br>Конечно, это вопрос денег, вопрос организации. Я специально спросил, вы имеете в виду полноценное такое высшее образование дополнительное, здесь высшее образование дополнительное ни к чему, но вот какие-то знания такие, серьезные, конечно, по другим направлениям точно не помешают, надо подумать над этим. Для педагогов, для преподавателей они не помешают, особенно если они, как в данном случае, совершенно очевидно востребованы", - сказал Путин.  Путин напомнил, что современный образовательный тренд нацелен на поддержку многопрофильности, а научные открытия делаются на стыке дисциплин. "Я даже не вижу здесь тех проблем, которые могли бы возникнуть в связи с тем, что учитель в школе будет иметь многопрофильную подготовку. И, наоборот, мне кажется, это дает дополнительные возможности там, где не хватает специалистов, а такие школы всё-таки есть", - сообщил Путин.  В свою очередь, помощник президента Андрей Фурсенко отметил, что преподавать учителям в таком случае должны люди, которые смогут объяснить новый предмет не с точки зрения "каких-то конкретных специфических вещей".
                </p>
            </div>

            <div class="news-events-drop-socials">
                <div class="news-events-drop-socials-title">
                    <p>
                        Поделиться в соц. сетях
                    </p>
                </div>
                <ul class="news-events-drop-socials-list">
                    <li class="news-events-drop-socials-item">
                        <a href="#" class="news-events-drop-socials-link">
                            <img
                                src="../../assets/img/social-networks/telegram-logo-icon.svg"
                                alt="Telegram"
                                class="news-events-drop-socials-link-image"
                                width="40"
                                height="40"
                                loading="lazy"
                            >
                        </a>
                    </li>
    
                    <li class="news-events-drop-socials-item">
                        <a href="#" class="news-events-drop-socials-link">
                            <img
                                src="../../assets/img/social-networks/vk-logo-icon.svg"
                                alt="VK"
                                class="news-events-drop-socials-link-image"
                                width="40"
                                height="40"
                                loading="lazy"
                            >
                        </a>
                    </li>
    
                    <li class="news-events-drop-socials-item">
                        <a href="#" class="news-events-drop-socials-link">
                            <img
                                src="../../assets/img/social-networks/ok-logo-icon.svg"
                                alt="OK"
                                class="news-events-drop-socials-link-image"
                                width="40"
                                height="40"
                                loading="lazy"
                            >
                        </a>
                    </li>
    
                    <li class="news-events-drop-socials-item">
                        <a href="#" class="news-events-drop-socials-link">
                            <img
                                src="../../assets/img/social-networks/mail-ru-logo-icon.svg"
                                alt="Mail.ru"
                                class="news-events-drop-socials-link-image"
                                width="40"
                                height="40"
                                loading="lazy"
                            >
                        </a>
                    </li>
                </ul>
            </div>

            <button @click="closeNews" type="button" class="button close-button sidebar-drop-close-button">
                <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 26L26 1" stroke="black"/>
                    <path d="M26 26L0.999999 1" stroke="black"/>
                </svg>
            </button>
        </section>
    </div>
</template>

<script setup>
  const emit = defineEmits(['close'])

  const closeNews = () => {
    emit('close')
  }
</script>

<style scoped>
  
</style>
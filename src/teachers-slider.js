export function initializeTeachersSlider() {
  
  const sliders = document.querySelectorAll('.teachers-slider');
  console.log(sliders)
  sliders.forEach(slider => {
    const leftButton = slider.querySelector('.news-shares-left-button');
    console.log("FDFDF")
    const rightButton = slider.querySelector('.news-shares-right-button');
    const list = slider.querySelector('.teachers-list');
    const items = list.querySelectorAll('.teachers-item');
    const itemWidth = items[0]?.offsetWidth || 0;

    if (items.length === 0) return;

    // Функция для получения значения gap
    function getGapValue() {
      const computedStyle = getComputedStyle(list);
      const gapValue = computedStyle.getPropertyValue('column-gap').trim();

      // Если значение в процентах
      if (gapValue.includes('%')) {
        const parentWidth = list.offsetWidth;
        return (parseFloat(gapValue) / 100) * parentWidth;
      }

      // Если значение в vw
      if (gapValue.includes('vw')) {
        const viewportWidth = window.innerWidth;
        return (parseFloat(gapValue) / 100) * viewportWidth;
      }

      return parseInt(gapValue) || 0;
    }

    // Получаем значение gap
    let gap = getGapValue();

    // Проверяем количество элементов и скрываем кнопки, если их меньше
    if (items.length <= 3) {
      leftButton.style.display = 'none';
      rightButton.style.display = 'none';
      return;
    }

    const scrollStep = itemWidth + gap; // Шаг прокрутки

    rightButton.addEventListener('click', function() {
      gap = getGapValue();
      list.scrollBy({
        left: scrollStep,
        behavior: 'smooth'
      });
    });

    leftButton.addEventListener('click', function() {
      gap = getGapValue();
      list.scrollBy({
        left: -scrollStep,
        behavior: 'smooth'
      });
    });

    // Обновляем шаг прокрутки при изменении размера окна
    window.addEventListener('resize', function() {
      gap = getGapValue();
    });
  });
}
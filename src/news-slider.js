export function initializeSlider() {
  const sliders = document.querySelectorAll('.news-shares-wrapper');

  sliders.forEach(slider => {
      const leftButton = slider.querySelector('.news-shares-left-button');
      const rightButton = slider.querySelector('.news-shares-right-button');
      const list = slider.querySelector('.news-shares-list');
      const items = list.querySelectorAll('.news-shares-item');
      const itemWidth = items[0].offsetWidth;

              // Функция для получения численного значения gap
              function getGapValue() {
                const computedStyle = getComputedStyle(list);
                const gapValue = computedStyle.getPropertyValue('--newsSharesListColumnGap').trim();
                
                // Если значение в процентах относительно родителя
                if (gapValue.includes('%')) {
                    const parentWidth = list.offsetWidth;
                    return (parseFloat(gapValue) / 100) * parentWidth;
                }
    
                // Если значение в vw (процент от ширины окна браузера)
                if (gapValue.includes('vw')) {
                    const viewportWidth = window.innerWidth;
                    return (parseFloat(gapValue) / 100) * viewportWidth;
                }
    
                // Если значение в пикселях или другое числовое значение
                return parseInt(gapValue) || 0;
            }
    
            // Функция для получения количества видимых элементов в зависимости от ширины экрана
            function getVisibleItemsCount() {
                const viewportWidth = window.innerWidth;
    
                if (viewportWidth <= 820) return 1; // 1 элемент
                if (viewportWidth <= 1280) return 2; // 2 элемента
                if (viewportWidth <= 1540) return 3; // 3 элемента
                return 4; // По умолчанию 4 элемента
            }
    
            // Функция для управления отображением кнопок
            function updateButtonsVisibility() {
                const visibleItemsCount = getVisibleItemsCount();
                const totalItemsCount = items.length;
    
                // Скрывать кнопки, если элементов меньше или равно количеству видимых элементов
                if (totalItemsCount <= visibleItemsCount) {
                    leftButton.style.display = 'none';
                    rightButton.style.display = 'none';
                } else {
                    leftButton.style.display = 'flex';
                    rightButton.style.display = 'flex';
                }
            }
    
            // Функция для обновления прокрутки
            function updateScrollStep() {
                gap = getGapValue(); // Обновляем gap при каждом вызове
                return itemWidth + gap;
            }
    
            // Инициализация
            let gap = getGapValue();
            let scrollStep = updateScrollStep();
    
            updateButtonsVisibility(); // Обновляем видимость кнопок
    
            rightButton.addEventListener('click', function () {
                scrollStep = updateScrollStep(); // Обновляем scrollStep при каждом клике
                list.scrollBy({
                    left: scrollStep,
                    behavior: 'smooth'
                });
            });
    
            leftButton.addEventListener('click', function () {
                scrollStep = updateScrollStep(); // Обновляем scrollStep при каждом клике
                list.scrollBy({
                    left: -scrollStep,
                    behavior: 'smooth'
                });
            });
    
            // Слушатель события resize для адаптации при изменении размера окна
            window.addEventListener('resize', function () {
                updateButtonsVisibility(); // Обновляем видимость кнопок
                scrollStep = updateScrollStep(); // Обновляем шаг прокрутки при изменении размера окна
            });
  });
}

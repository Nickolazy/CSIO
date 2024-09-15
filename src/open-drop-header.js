export function burgerMenu () {
  document.getElementById('header-menu-burger-button').addEventListener('click', function() {
      const headerDrop = document.querySelector('.header-drop');
      const currentTop = window.getComputedStyle(headerDrop).top;
      const burgerButton = document.getElementById('header-menu-burger-button');

      // Проверяем текущее положение меню
      if (currentTop === '-500px') {
          headerDrop.style.top = 'var(--header-height)'; // Открываем меню
          burgerButton.classList.add('active'); // Добавляем класс для изменения кнопки
      } else {
          headerDrop.style.top = '-500px'; // Закрываем меню
          burgerButton.classList.remove('active'); // Убираем класс для изменения кнопки
      }
  });
}

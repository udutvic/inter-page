//NOTE - Функція для обробки подій на кнопках
function handleButtonEvents() {
  // Вибирає всі кнопки в секції з класом "button-section" та додає обробник подій для кожної
  document.querySelectorAll(".button-section button").forEach((button) => {
    // Додає обробник подій для кліків на кожну кнопку
    button.addEventListener("click", (event) => {
      // Отримує ID натиснутої кнопки
      const buttonId = event.target.id;

      // Видаляє клас "active" у всіх кнопок
      document
        .querySelectorAll(".button-section button")
        .forEach((btn) => btn.classList.remove("active"));

      // Додає клас "active" до натиснутої кнопки
      event.target.classList.add("active");

      // Вибирає заголовок та текст секції контенту
      const contentSection = document.querySelector(".content-section-title");
      const contentTitle = contentSection.querySelector("h2"); // Заголовок h2
      const contentText = contentSection.querySelector("p"); // Текст p
      const titleButton = document.querySelector(".section-title-button"); // Кнопка заголовка
      const contentBody = document.querySelector(".content-section-body"); // Тіло контенту

      // Очищає вміст тіла контенту
      contentBody.textContent = "";

      // Видаляє існуючий контейнер вкладок (якщо є)
      const existingTabContainer = document.querySelector(".btn-tab-sect");
      if (existingTabContainer) existingTabContainer.remove();

      // Перевіряє, чи є заголовок та текст для оновлення
      if (contentTitle && contentText) {
        // Виконує дії залежно від ID натиснутої кнопки
        if (buttonId === "button-section-tab1") {
          // Налаштовує заголовок та текст для вкладки "Кулька"
          contentTitle.textContent = "Кулька";
          contentText.textContent =
            "Використовуйте стрілки вгору 🔼 та вниз 🔽 для зміни розміру кульки.";
          titleButton.style.display = "inline-block"; // Показує кнопку заголовка

          // Створює елемент для кульки
          const ball = document.createElement("p");
          ball.textContent = "🏀";
          ball.style.fontSize = "40px"; // Встановлює початковий розмір шрифту
          contentBody.appendChild(ball); // Додає кульку до тіла контенту

          let fontSize = 40; // Початковий розмір шрифту

          // Функція для обробки натискань клавіш
          function handleKeys(event) {
            if (event.key === "ArrowUp")
              increaseFontSize(
                ball
              ); // Збільшує розмір шрифту при натисканні на стрілку вгору
            else if (event.key === "ArrowDown") decreaseFontSize(ball); // Зменшує розмір шрифту при натисканні на стрілку вниз
            event.preventDefault(); // Запобігає стандартній обробці клавіші
          }

          // Функція для збільшення розміру шрифту
          function increaseFontSize(element) {
            fontSize *= 1.1; // Збільшує розмір шрифту на 10%
            element.style.fontSize = `${fontSize}px`;
            if (fontSize > 200) {
              element.textContent = "🎉"; // Змінює кульку на святковий значок, якщо розмір більше 200px
              document.body.removeEventListener("keydown", handleKeys); // Видаляє обробник подій клавіатури
            }
          }

          // Функція для зменшення розміру шрифту
          function decreaseFontSize(element) {
            fontSize *= 0.9; // Зменшує розмір шрифту на 10%
            element.style.fontSize = `${fontSize}px`;
          }

          // Додає обробник подій для натискань клавіш
          document.body.addEventListener("keydown", handleKeys);

          // Додає обробник подій для кнопки заголовка
          titleButton.addEventListener("click", () => {
            contentBody.textContent = ""; // Очищає вміст тіла контенту
            fontSize = 40; // Скидає розмір шрифту до початкового
            ball.textContent = "🏀"; // Повертає кульку
            ball.style.fontSize = `${fontSize}px`; // Встановлює початковий розмір шрифту
            contentBody.appendChild(ball); // Додає кульку знову до тіла контенту
            document.body.removeEventListener("keydown", handleKeys); // Видаляє обробник подій клавіатури
            document.body.addEventListener("keydown", handleKeys); // Додає обробник подій клавіатури
          });
        } else if (buttonId === "button-section-tab2") {
          // Налаштовує заголовок та текст для вкладки "Мишачий слід"
          contentTitle.textContent = "Мишачий слід";
          contentText.textContent = "Відслідковуємо рух вашого мишачого вказівника.";
          titleButton.style.display = "none"; // Ховає кнопку заголовка

          const trailLength = 10; // Довжина сліду
          const trailElements = []; // Массив для елементів сліду
          let animationFrameId = null; // Ідентифікатор анімаційного кадру

          // Створює елементи сліду та додає їх до тіла контенту
          for (let i = 0; i < trailLength; i++) {
            const trail = document.createElement("div");
            trail.className = "trail"; // Додає клас "trail"
            trail.style.position = "absolute"; // Встановлює абсолютне позиціонування
            trail.style.width = "5px"; // Встановлює ширину сліду
            trail.style.height = "5px"; // Встановлює висоту сліду
            trail.style.backgroundColor = "teal"; // Задає колір сліду
            trail.style.borderRadius = "50%"; // Задає округлість елемента
            contentBody.appendChild(trail); // Додає слід до тіла контенту
            trailElements.push({ element: trail, x: 0, y: 0 }); // Додає елемент сліду до масиву
          }

          // Функція для отримання абсолютної позиції елемента
          function getAbsolutePosition(el) {
            const rect = el.getBoundingClientRect();
            return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
          }

          // Функція для оновлення позицій сліду
          function updateTrail() {
            // Переміщує сліди за мишкою
            for (let i = trailElements.length - 1; i > 0; i--) {
              trailElements[i].x = trailElements[i - 1].x;
              trailElements[i].y = trailElements[i - 1].y;
            }
            trailElements.forEach((trail) => {
              trail.element.style.left = `${trail.x}px`;
              trail.element.style.top = `${trail.y}px`;
            });
            animationFrameId = requestAnimationFrame(updateTrail); // Продовжує анімацію
          }

          // Додає обробник подій для руху миші
          contentBody.addEventListener("mousemove", (event) => {
            const { left, top } = getAbsolutePosition(contentBody);
            const x = event.pageX - left; // Обчислює позицію X миші відносно тіла контенту
            const y = event.pageY - top; // Обчислює позицію Y миші відносно тіла контенту

            // Перевіряє, чи мишка знаходиться в межах тіла контенту
            if (
              x >= 0 &&
              y >= 0 &&
              x <= contentBody.offsetWidth &&
              y <= contentBody.offsetHeight
            ) {
              trailElements[0].x = x; // Оновлює позицію першого елемента сліду
              trailElements[0].y = y;
              if (!animationFrameId) updateTrail(); // Починає оновлення сліду, якщо не запущено
            }
          });
        } else if (buttonId === "button-section-tab3") {
          // Налаштовує заголовок та текст для вкладки "Вкладки"
          contentTitle.textContent = "Вкладки";
          contentText.textContent = "Тут можна переглядати різні вкладки.";
          titleButton.style.display = "none"; // Ховає кнопку заголовка

          // Створює контейнер для кнопок вкладок
          const btnTabSect = document.createElement("div");
          btnTabSect.className = "btn-tab-sect";
          btnTabSect.style.display = "flex"; // Встановлює flex-контейнер для кнопок вкладок
          btnTabSect.style.gap = "10px"; // Додає проміжок між кнопками
          contentSection.appendChild(btnTabSect); // Додає контейнер до секції контенту

          // Масив назв вкладок
          const tabs = ["Вкладка 1", "Вкладка 2", "Вкладка 3"];
          tabs.forEach((tab) => {
            // Створює кнопку для кожної вкладки
            const tabButton = document.createElement("button");
            tabButton.textContent = tab; // Встановлює текст кнопки вкладки
            tabButton.className = "tab-button"; // Додає клас "tab-button"
            tabButton.style.border = "none"; // Вимикає обводку кнопки
            tabButton.style.backgroundColor = "blue"; // Встановлює фон кнопки
            tabButton.style.color = "white"; // Встановлює колір тексту кнопки
            tabButton.style.fontSize = "16px"; // Встановлює розмір шрифту кнопки
            tabButton.style.cursor = "pointer"; // Встановлює курсор для кнопки
            tabButton.style.padding = "8px 15px"; // Додає відступи всередині кнопки
            tabButton.style.borderRadius = "5px"; // Додає округлення кутів кнопки

            // Додає обробник подій для кліків на кнопку вкладки
            tabButton.addEventListener("click", () => {
              contentBody.textContent = tab; // Відображає текст вкладки в тілі контенту
            });
            btnTabSect.appendChild(tabButton); // Додає кнопку вкладки до контейнера
          });
        }
      }
    });
  });
}
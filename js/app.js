document.addEventListener("DOMContentLoaded", () => {
  // Структура сторінки
  const pageStructure = {
    type: "section",
    className: "page-content",
    children: [
      {
        type: "article",
        className: "button-section",
        children: [
          { type: "button", id: "button-section-tab1", text: "Кулька" },
          { type: "button", id: "button-section-tab2", text: "Мишачий слід" },
          { type: "button", id: "button-section-tab3", text: "Вкладки" },
        ],
      },
      {
        type: "section",
        className: "content-section",
        children: [
          {
            type: "article",
            className: "content-section-title",
            children: [
              { type: "h2", text: "Інтерактивні проєкти" },
              { type: "p", text: "Натисніть одну із трьох кнопок" },
              { type: "button", className: "section-title-button", text: "Рестарт" },
            ],
          },
          {
            type: "article",
            className: "content-section-body",
          },
        ],
        },
        {
            type: "footer",
      className: "page-footer",
      children: [
        {
          type: "p",
          children: [
            { type: "text", text: '© 2024 Всі права захищені.' }
          ]
        },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: 'Coded by '
            },
            {
              type: "a",
              href: "https://github.com/udutvic/rpsls-game-ukr",
              target: "_blank",
              text: "Udut Viktor"
            }
          ]
        }
      ]
        },      
    ],
  };

  // Створюємо та додаємо елементи на сторінку
  document.body.appendChild(createElementFromStructure(pageStructure));
  applyStyles();
  handleButtonEvents();

  // Приховати кнопку при завантаженні сторінки
  const titleButton = document.querySelector(".section-title-button");
  if (titleButton) {
    titleButton.style.display = "none";
  }
});

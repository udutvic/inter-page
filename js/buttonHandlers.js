// Обробники подій для кнопок
function handleButtonEvents() {
  document.querySelectorAll(".button-section button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonId = event.target.id;

      document
        .querySelectorAll(".button-section button")
        .forEach((btn) => btn.classList.remove("active"));
      event.target.classList.add("active");

      const contentSection = document.querySelector(".content-section-title");
      const contentTitle = contentSection.querySelector("h2");
      const contentText = contentSection.querySelector("p");
      const titleButton = document.querySelector(".section-title-button");
      const contentBody = document.querySelector(".content-section-body");

      contentBody.innerHTML = "";
      const existingTabContainer = document.querySelector(".btn-tab-sect");
      if (existingTabContainer) existingTabContainer.remove();

      if (contentTitle && contentText) {
        if (buttonId === "button-section-tab1") {
          contentTitle.textContent = "Кулька";
          contentText.textContent =
            "Використовуйте стрілки вгору 🔼 та вниз 🔽 для зміни розміру кульки.";
          titleButton.style.display = "inline-block";

          const ball = document.createElement("p");
          ball.textContent = "🏀";
          ball.style.fontSize = "40px";
          contentBody.appendChild(ball);

          let fontSize = 40;

          function handleKeys(event) {
            if (event.key === "ArrowUp") increaseFontSize(ball);
            else if (event.key === "ArrowDown") decreaseFontSize(ball);
            event.preventDefault();
          }

          function increaseFontSize(element) {
            fontSize *= 1.1;
            element.style.fontSize = `${fontSize}px`;
            if (fontSize > 200) {
              element.textContent = "🎉";
              document.body.removeEventListener("keydown", handleKeys);
            }
          }

          function decreaseFontSize(element) {
            fontSize *= 0.9;
            element.style.fontSize = `${fontSize}px`;
          }

          document.body.addEventListener("keydown", handleKeys);

          titleButton.addEventListener("click", () => {
            contentBody.innerHTML = "";
            fontSize = 40;
            ball.textContent = "🏀";
            ball.style.fontSize = `${fontSize}px`;
            contentBody.appendChild(ball);
            document.body.removeEventListener("keydown", handleKeys);
            document.body.addEventListener("keydown", handleKeys);
          });
        } else if (buttonId === "button-section-tab2") {
          contentTitle.textContent = "Мишачий слід";
          contentText.textContent = "Відслідковуємо рух вашого мишачого вказівника.";
          titleButton.style.display = "none";

          const trailLength = 10;
          const trailElements = [];
          let animationFrameId = null;

          for (let i = 0; i < trailLength; i++) {
            const trail = document.createElement("div");
            trail.className = "trail";
            trail.style.position = "absolute";
            trail.style.width = "5px";
            trail.style.height = "5px";
            trail.style.backgroundColor = `rgba(255, 0, 0, ${1 - i / trailLength})`;
            trail.style.borderRadius = "50%";
            trail.style.pointerEvents = "none";
            trail.style.display = "none";
            contentBody.appendChild(trail);
            trailElements.push({ element: trail, x: 0, y: 0 });
          }

          function getAbsolutePosition(el) {
            const rect = el.getBoundingClientRect();
            return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
          }

          function updateTrail() {
            for (let i = trailElements.length - 1; i > 0; i--) {
              trailElements[i].x = trailElements[i - 1].x;
              trailElements[i].y = trailElements[i - 1].y;
            }
            trailElements.forEach((trail) => {
              trail.element.style.left = `${trail.x}px`;
              trail.element.style.top = `${trail.y}px`;
              trail.element.style.display = "block";
            });
            animationFrameId = requestAnimationFrame(updateTrail);
          }

          contentBody.addEventListener("mousemove", (event) => {
            const { left, top } = getAbsolutePosition(contentBody);
            const x = event.pageX - left;
            const y = event.pageY - top;

            if (
              x >= 0 &&
              y >= 0 &&
              x <= contentBody.offsetWidth &&
              y <= contentBody.offsetHeight
            ) {
              trailElements[0].x = x;
              trailElements[0].y = y;
              if (!animationFrameId) updateTrail();
            }
          });
        } else if (buttonId === "button-section-tab3") {
          contentTitle.textContent = "Вкладки";
          contentText.textContent = "Тут можна переглядати різні вкладки.";
          titleButton.style.display = "none";

          const btnTabSect = document.createElement("div");
          btnTabSect.className = "btn-tab-sect";
          btnTabSect.style.display = "flex";
          btnTabSect.style.gap = "10px";
          contentSection.appendChild(btnTabSect);

          const tabs = ["Вкладка 1", "Вкладка 2", "Вкладка 3"];
          tabs.forEach((tab) => {
            const tabButton = document.createElement("button");
            tabButton.textContent = tab;
            tabButton.className = "tab-button";
            tabButton.style.border = "none";
            tabButton.style.backgroundColor = "blue";
            tabButton.style.color = "white";
            tabButton.style.fontSize = "16px";
            tabButton.style.cursor = "pointer";
            tabButton.style.padding = "8px 15px";
            tabButton.style.borderRadius = "5px";

            tabButton.addEventListener("click", () => {
              contentBody.textContent = tab;
            });
            btnTabSect.appendChild(tabButton);
          });
        }
      }
    });
  });
}

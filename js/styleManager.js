//NOTE - Массив стилів для різних елементів
const stylesElements = [
  { selector: "*", styles: { "box-sizing": "border-box", margin: "0", padding: "0" } },
  {
    selector: "body",
    styles: { "font-family": "Arial, sans-serif", "font-size": "18px", height: "100vh" },
  },
  { selector: ".page-content", styles: { "min-height": "100vh", padding: "20px" } },
  {
    selector: ".button-section",
    styles: {
      display: "flex",
      "justify-content": "space-around",
      height: "50px",
      "align-items": "center",
      "border-radius": "10px",
    },
  },
  {
    selector: ".content-section",
    styles: {
      "margin-top": "20px",
      height: "80vh",
      position: "relative",
      "margin-bottom": "20px",
    },
  },
  {
    selector: ".content-section-title",
    styles: {
      "text-align": "center",
      padding: "25px 0",
      "margin-bottom": "25px",
      display: "flex",
      "flex-wrap": "wrap",
      "flex-direction": "column",
      "align-items": "center",
      "row-gap": "10px",
      border: "1px solid #a6a6a6",
      "border-radius": "10px",
    },
  },
  {
    selector: ".section-title-button",
    styles: {
      border: "none",
      "background-color": "blue",
      color: "white",
      "font-size": "16px",
      cursor: "pointer",
      padding: "8px 15px",
      "border-radius": "5px",
    },
  },
  {
    selector: ".content-section-body",
    styles: {
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      height: "75%",
      border: "1px solid #a6a6a6",
      "border-radius": "10px",
      color: "red",
      "font-size": "54px",
      "text-transform": "uppercase",
      position: "relative",
    },
  },
  {
    selector: "#button-section-tab1, #button-section-tab2, #button-section-tab3",
    styles: {
      border: "none",
      "background-color": "blue",
      color: "white",
      "font-size": "16px",
      cursor: "pointer",
      padding: "8px 15px",
      "border-radius": "5px",
    },
  },
  {
    selector: ".page-footer",
    styles: {
      display: "flex",
      "justify-content": "space-between",
    },
  },
];

// Функція для застосування стилів
function applyStyles() {
  stylesElements.forEach(({ selector, styles }) => {
    document.querySelectorAll(selector).forEach((el) => Object.assign(el.style, styles));
  });
}

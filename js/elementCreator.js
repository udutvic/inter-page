// Функція для створення елементів на основі структури
function createElementFromStructure(structure) {
  const element = document.createElement(structure.type);

  if (structure.className) element.className = structure.className;
  if (structure.id) element.id = structure.id;
  if (structure.href)  element.href = structure.href;
  if (structure.target) element.target = structure.target;
  if (structure.text) element.textContent = structure.text;
  if (structure.active) element.classList.add("active");

  if (structure.children) {
    structure.children.forEach((child) =>
      element.appendChild(createElementFromStructure(child))
    );
  }

  return element;
}

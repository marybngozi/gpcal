import { elements } from "./base.mjs";

let numOfGpField = 0;

export const addGpField = () => {
  numOfGpField += 1;
  const gpFieldHtml = `
  <li>
    <span class="list-icon"><span class="list-num">${numOfGpField}</span></span>
    <div>
      <input type="number" min="0" placeholder="Credit Unit" class="creditUnit">
      <select name="grade" class="grade">
        <option value="-1">Grade</option>
        <option value="5">A</option>
        <option value="4">B</option>
        <option value="3">C</option>
        <option value="2">D</option>
        <option value="1">E</option>
        <option value="0">F</option>
      </select>
      <button>remove</button>
    </div>
  </li>
  `;
  elements.gpCalcUl.insertAdjacentHTML('beforeend', gpFieldHtml);
}

export const removeGpField = () => {

}

export const toggleCanvas = () => {
  elements.menu.forEach(icon => {
    icon.addEventListener('click', (e) => {
      elements.canvas.classList.toggle('open');
      e.stopPropagation();
    });
  });
}

export const showCalcArea = () => {
  elements.showCalcAreaBtn.addEventListener('click', () => {
    elements.noGpView.style.display = 'none';
    elements.calcArea.style.display = 'block';
    addGpField();
    addGpField();
    addGpField();
  })
  
}

const getUl = () => {
  elements.gpCalcUl
} 
import { elements } from "./base.mjs";
import { add2gpArr, loadSavedGp } from "./calcGp.mjs";

const addSavedGpField = (gpa) => {
  const showGpFieldHtml = `
  <li>
    <span class="gp-name">${gpa.name.toUpperCase()}</span>
    <span class="gpa">${gpa.gpa}</span>
    <button>remove</button>
  </li>
  `;
  elements.gpShowUl.insertAdjacentHTML('beforeend', showGpFieldHtml);
}

export const addGpField = () => {
  const gpFieldHtml = `
  <li>
    <input type="text" placeholder="Course Code" class="courseCode">
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
    
  </li>
  `;
  elements.gpCalcUl.insertAdjacentHTML('beforeend', gpFieldHtml);
}

export const removeGpField = () => {

}

export const showCalcArea = () => {
  elements.noGpView.style.display = 'none';
  elements.calcArea.style.display = 'block';
  elements.showSavedGp.style.display = 'none';
  
}

export const showSavePop = () => {
  elements.savePopup.style.display = 'block';
}

export const saveGp = (gpName) => {
  elements.savePopup.style.display = 'none';
  add2gpArr(gpName, elements.gpDisplay.innerHTML);
  elements.gpNameInput.value = "";
}

export const showSavedGp = () => {
  elements.calcArea.style.display = 'none';
  elements.noGpView.style.display = 'none';
  elements.showSavedGp.style.display = 'block';
  elements.canvas.classList.toggle('open');
  elements.gpDisplay.innerHTML = "5.00"
  elements.gpDisplayP.innerHTML = "My GPAs"
  loadSavedGp().forEach(gpa => {
    addSavedGpField(gpa)
  });

}


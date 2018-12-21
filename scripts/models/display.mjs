import { elements } from "./base.mjs";
import { add2gpArr, getGpa, removeGpa } from "./calcGp.mjs";

const addSavedGpField = (gpa) => {
  const showGpFieldHtml = `
  <li>
    <span class="gp-name">${gpa.name.toUpperCase()}</span>
    <input type="hidden" id="gpaId" value="${gpa.id}">
    <span class="gpa">${gpa.gpa}</span>
    <button class="edit-gpa">edit</button>
    <button class="remove-gpa">remove</button>
  </li>
  `;
  elements.gpShowUl.insertAdjacentHTML('beforeend', showGpFieldHtml);
}

const addEditGpField = (gpResult) => {
  const gpEditFieldHtml = `
  <li>
    <input type="text" class="courseCode" value = "${gpResult.cCode}">
    <input type="number" min="0" value = "${gpResult.cCredUnit}" class="creditUnit">
    <select name="grade" class="grade">
      <option value="${gpResult.grade}">${gpResult.grade}</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
    </select>
    <button>remove</button>
    
  </li>
  `;
  
  elements.gpEditUl.insertAdjacentHTML('beforeend', gpEditFieldHtml);
}

export const createGpField = () => {
  return `
    <li>
      <input type="text" placeholder="Course Code" class="courseCode">
      <input type="number" min="0" placeholder="Credit Unit" class="creditUnit">
      <select name="grade" class="grade">
        <option value="-1">Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
      <button>remove</button>
      
    </li>
  `;
}

export const addGpField = () => {
  elements.gpCalcUl.insertAdjacentHTML('beforeend', createGpField());
}

export const removeGpaField = (parent, child, gpaId) => {
  parent.removeChild(child);
  removeGpa(gpaId);
}

export const showCalcArea = () => {
  elements.noGpView.style.display = 'none';
  elements.calcArea.style.display = 'block';
  elements.showSavedGp.style.display = 'none';
  elements.editArea.style.display = 'none';

}

export const showSavePop = () => {
  elements.savePopup.style.display = 'block';
}

export const saveGp = (gpObj) => {
  elements.savePopup.style.display = 'none';
  add2gpArr(gpObj);
  elements.gpNameInput.value = "";
}

export const showSavedGp = () => {
  elements.calcArea.style.display = 'none';
  elements.noGpView.style.display = 'none';
  elements.editArea.style.display = 'none';
  elements.showSavedGp.style.display = 'block';
  elements.gpShowUl.innerHTML = "";
  elements.canvas.classList.toggle('open');
  elements.gpDisplay.style.display = "none";
  elements.gpDisplayP.innerHTML = "My GPAs"
  elements.searchInput.focus();
  getGpa().forEach(gpa => {
    addSavedGpField(gpa)
  });

}

export const searchGp = (searchText) => {
  elements.gpShowUl.innerHTML = "";
  if (typeof searchText === "string") {
    let filterGp =  getGpa().filter((gpa) => gpa.name.toLowerCase().includes(searchText.toLowerCase()));
    filterGp.forEach(gpa => {
      addSavedGpField(gpa)
    });
  }
}

export const showEditGp = (gpaId) => {
  elements.editArea.style.display = 'block';
  elements.calcArea.style.display = 'none';
  elements.noGpView.style.display = 'none';
  elements.showSavedGp.style.display = 'none';
  elements.gpDisplay.style.display = "block";
  elements.gpEditUl.innerHTML = "";
  let gpaInfo = getGpa().find(gpa => gpa.id === gpaId);

  if (gpaInfo) {
    const gpDetailFieldHtml = `
    <div>
      <label>GPA Name: <input type="text" id"gpaName" value="${gpaInfo.name}"></label>
      <input type="hidden" id="gpaId" value="${gpaInfo.id}">
    </div>
    `;
    elements.gpEditUl.insertAdjacentHTML('beforeend', gpDetailFieldHtml);
    elements.gpDisplay.innerHTML = gpaInfo.gpa;
    if (gpaInfo.results.length > 0) {
      gpaInfo.results.forEach(gpResult => {
        addEditGpField(gpResult);
      })  
    }
  
  }
  
}
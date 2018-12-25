import { elements } from "./base.mjs";
import { add2gpArr, getGpa, removeGpa, updateGpa } from "./calcGp.mjs";

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
    <input type="text" class="courseCode" value="${gpResult.cCode}">
    <input type="number" min="0" value="${gpResult.cCredUnit}" class="creditUnit">
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

export const createGpFieldUni = () => {
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

export const createGpFieldPoly = () => {
  return `
    <li>
      <input type="text" placeholder="Course Code" class="courseCode">
      <input type="number" min="0" placeholder="Credit Unit" class="creditUnit">
      <select name="grade" class="grade">
        <option value="-1">Grade</option>
        <option value="A">A</option>
        <option value="AB">AB</option>
        <option value="B">B</option>
        <option value="BC">BC</option>
        <option value="C">C</option>
        <option value="E">E</option>
      </select>
      <button>remove</button>
      
    </li>
  `;
}

export const addGpField = (mode) => {
  if (mode === "university") {
    elements.gpCalcUl.insertAdjacentHTML('beforeend', createGpFieldUni());
  }else if(mode === "polytechnic"){
    elements.gpCalcUlPoly.insertAdjacentHTML('beforeend', createGpFieldPoly());
  }  
}

export const removeGpaField = (parent, child, gpaId) => {
  parent.removeChild(child);
  removeGpa(gpaId);
}

export const showCalcArea = (mode) => {
  elements.modePop.style.display = "none";
  elements.noGpView.style.display = 'none';
  elements.showSavedGp.style.display = 'none';
  elements.editArea.style.display = 'none';
  elements.gpDisplayP.innerHTML = "My Gp is"
  elements.gpDisplay.style.display = "block";
  elements.gpDisplay.innerHTML = "0.00";
  if (mode === "university") {
    elements.calcAreaUni.style.display = 'block';
    elements.calcAreaPoly.style.display = 'none';
  }else if(mode === "polytechnic"){
    elements.calcAreaUni.style.display = 'none';
    elements.calcAreaPoly.style.display = 'block';
  }
  
}

export const showModePop = () => {
  elements.modePop.style.display = "block";
  elements.gpNameInput.focus();
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
}

export const showSavePop = () => {
  elements.savePopup.style.display = 'block';
  elements.gpNameInput.focus();
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
}

export const saveGp = (gpObj) => {
  elements.savePopup.style.display = 'none';
  add2gpArr(gpObj);
  elements.gpNameInput.value = "";
}

export const showSavedGp = () => {
  elements.calcAreaUni.style.display = 'none';
  elements.calcAreaPoly.style.display = 'none';
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

export const showEditGp = (gpaId, mode) => {
  if (mode === "university") {
    elements.editAreaPoly.style.display = 'none';
    elements.editAreaUni.style.display = 'block';
  }else if (mode === "polytechnic") {
    elements.editAreaUni.style.display = 'none';
    elements.editAreaPoly.style.display = 'block';
  }
  elements.calcAreaUni.style.display = 'none';
  elements.calcAreaPoly.style.display = 'none';
  elements.noGpView.style.display = 'none';
  elements.showSavedGp.style.display = 'none';
  elements.gpDisplay.style.display = "block";
  elements.gpEditUl.innerHTML = "";
  let gpaInfo = getGpa().find(gpa => gpa.id === gpaId);

  if (gpaInfo) {
    elements.gpDisplayP.innerHTML = gpaInfo.name;
    elements.gpDisplayInput.value = gpaInfo.id
    elements.gpDisplay.innerHTML = gpaInfo.gpa;
    if (gpaInfo.results.length > 0) {
      gpaInfo.results.forEach(gpResult => {
        addEditGpField(gpResult);
      })  
    }
  
  }
  
}

export const showUpdatePop = () => {
  elements.updatePopup.style.display = "block";
  elements.gpEditNameInput.value = elements.gpDisplayP.innerHTML;
  elements.gpEditNameInput.focus();
  //add the overlays
}

export const updateGp = (updateObj) => {
  updateGpa(updateObj);
  elements.updatePopup.style.display = "none";
  showSavedGp();
  elements.canvas.classList.toggle('open');
}
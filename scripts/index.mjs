import { showCalcArea, addGpField, showSavePop, saveGp, removeGpaField, showSavedGp, searchGp, showEditGp, createGpField, showUpdatePop, updateGp } from "./models/display.mjs";
import { elements } from './models/base.mjs';
import { productCredUnitGrade, getGpa } from "./models/calcGp.mjs";

if(getGpa().length > 0) {
  elements.noGpViewP.innerHTML = "Some GPAs Calculated :-)"
  elements.showCalcAreaBtn.innerHTML = "Calculate more GPAs"
}

const footerP = `
  <p>&copy; Swisel ${new Date().getFullYear()}</p>
`;
elements.footerDiv.forEach(footDiv => {footDiv.insertAdjacentHTML('beforeend', footerP)});

const gpResults = [];
const gpResultsEdit = [];

const calcRenderGp = (lists) => {
  let gpTempArr = [];
  let creditSum = 0;
  let sum = 0;
  let gp = 0;
  lists.forEach(list => {
    let eachCUVal = Number(list.querySelector('.creditUnit').value);
    let eachCCVal = list.querySelector('.courseCode').value;
    let eachSelectVal = list.querySelector('select').value;
    if (eachCUVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1" && eachSelectVal !== -1) {
      creditSum += eachCUVal;
      sum += productCredUnitGrade(eachCUVal, eachSelectVal);
      gpTempArr.push({
        id: uuidv4(),
        cCode: eachCCVal,
        cCredUnit: eachCUVal,
        grade: eachSelectVal
      });
    }
  });
  gp = (sum === 0 || creditSum === 0) ? "0.00" : ((sum / creditSum).toFixed(2));

  elements.gpDisplay.innerHTML = gp;
  gpResults.push(gpTempArr);
}

const editCalcRenderGp = (lists) => {
  let gpEditTempArr = [];
  let creditSumEdit = 0;
  let sumEdit = 0;
  let gpEdit = 0;
  lists.forEach(list => {
    let eachCUVal = Number(list.querySelector('.creditUnit').value);
    let eachCCVal = list.querySelector('.courseCode').value;
    let eachSelectVal = list.querySelector('select').value;
    if (eachCUVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1") {
      creditSumEdit += eachCUVal;
      sumEdit += productCredUnitGrade(eachCUVal, eachSelectVal);
      gpEditTempArr.push({
        cCode: eachCCVal,
        cCredUnit: eachCUVal,
        grade: eachSelectVal
      });
    }
  });
  gpEdit = (sumEdit === 0 || creditSumEdit === 0) ? "0.00" : ((sumEdit / creditSumEdit).toFixed(2));

  elements.gpDisplay.innerHTML = gpEdit;
  gpResultsEdit.push(gpEditTempArr);
}

const popSaver = (e) => {
  e.preventDefault();
  let gpName = elements.gpNameInput.value.trim();
  let gpa = elements.gpDisplay.innerHTML;
  /*******undo these *//***get a function to do this so it can be reusable */
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
  if(gpName !== "" && gpName.length !== 0){
    if (elements.gpDisplay.innerHTML !== "0.00") {
      saveGp({
        name: gpName,
        gpa,
        results: gpResults[gpResults.length - 1]
      });
    }else{
      elements.savePopupP.innerHTML = "GPA is 0.00";
    }
  }else{
    elements.savePopupP.innerHTML = "Name Field can't be empty!";
    elements.gpNameInput.focus();
  }
}

const popUpdater = (e) => {
  e.preventDefault();
  let gpEditName = elements.gpEditNameInput.value.trim();
  if (gpEditName !== "" && gpResultsEdit.length > 0) {
    let results = gpResultsEdit[gpResultsEdit.length - 1];
    /*******undo these *//***get a function to do this so it can be reusable */
    // get overlay for the back
    // trap focus in the popup
    // fix focus in input
    updateGp({
      id: elements.gpDisplayInput.value,
      name: gpEditName,
      gpa: elements.gpDisplay.innerHTML,
      results: results
    });
  
  }else{
    updateGp({
      id: elements.gpDisplayInput.value,
      name: gpEditName,
      gpa: elements.gpDisplay.innerHTML
    });
  }
}

elements.menu.forEach(icon => {
  icon.addEventListener('click', (e) => {
    elements.canvas.classList.toggle('open');
    e.stopPropagation();
  });
});

elements.showCalcAreaBtn.addEventListener('click', showCalcArea)

elements.showCalcArea.addEventListener('click', () => {
  showCalcArea();
  elements.canvas.classList.toggle('open');
})

elements.addGpRowBtn.addEventListener('click', () => {
  addGpField();
  let h = elements.gpCalcUl.clientHeight;
  window.scrollTo({
    top: h,
    behavior: 'smooth'
  })
  
});

['input', 'change'].forEach(evt => {
  elements.gpCalcUl.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      calcRenderGp(li);
    }
  })
});

elements.gpCalcUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    calcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.closePop.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    elements.savePopup.style.display = 'none';
    elements.updatePopup.style.display = 'none';
  });
});

elements.showSaveGpPopBtn.addEventListener('click', () => {
  showSavePop();

});

elements.gpNameInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13) {
    popSaver(e);
  }
});

elements.saveGp.addEventListener('click', popSaver);

elements.showSavedGpBtn.addEventListener('click', () => { // shows the save popup
  elements.gpNameInput.focus();
  showSavedGp();
  
});

elements.searchInput.addEventListener('input', (e) => {
  let searchText = e.target.value.trim();
  searchGp(searchText);
});

elements.gpShowUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('.remove-gpa')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    let gpaId = child.querySelector('input').value;
    removeGpaField(parent, child, gpaId);
  }
});
  
elements.gpShowUl.addEventListener('click', (e) => { // edits a saved gp
  if (e.target.matches('.edit-gpa')) {
    let gpaId = e.target.parentNode.querySelector('input').value;
    showEditGp(gpaId);
  }
});

['input', 'change'].forEach(evt => {
  elements.gpEditUl.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      editCalcRenderGp(li);
    }
  })
});

elements.gpEditUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    editCalcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.addGpRowEdit.addEventListener('click', () => {
  elements.gpEditUl.insertAdjacentHTML('beforeend', createGpField());
  let h = elements.gpEditUl.clientHeight;
  window.scrollTo({
    top: h,
    behavior: 'smooth'
  })
});

elements.showUpdateGpPopBtn.addEventListener('click', () => {
  showUpdatePop();

});

elements.gpEditNameInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13) {
    popUpdater(e);
  }
});

elements.updateGp.addEventListener('click', popUpdater);
import { showCalcArea, addGpField, showSavePop, saveGp, removeGpaField, showSavedGp, searchGp, showEditGp, createGpFieldUni, createGpFieldPoly, showUpdatePop, updateGp, showModePop } from "./models/display.mjs";
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
      sum += productCredUnitGrade(eachCUVal, eachSelectVal, elements.gpDisplayMode.value);
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
      sumEdit += productCredUnitGrade(eachCUVal, eachSelectVal, elements.gpDisplayMode.value);
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
        mode: elements.gpDisplayMode.value,
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

elements.showCalcAreaBtn.addEventListener('click', () => {
  showModePop();
})

elements.proceedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let mode = e.target.parentElement.querySelector("input[name='mode']:checked");
  if (mode) {
    elements.gpDisplayMode.value = mode.value;
    showCalcArea(mode.value);
  }
  
});

elements.showCalcArea.addEventListener('click', () => {// needs work
  showModePop();
  elements.canvas.classList.toggle('open');
})

elements.addGpRowBtn.forEach(addBtn => {
  addBtn.addEventListener('click', () => {
    console.log(elements.gpDisplayMode.value);
    addGpField(elements.gpDisplayMode.value);
  });
});

['input', 'change'].forEach(evt => {
  elements.gpCalcUl.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      calcRenderGp(li);
    }
  })
});

['input', 'change'].forEach(evt => {
  elements.gpCalcUlPoly.addEventListener(evt, (e) => {
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

elements.gpCalcUlPoly.addEventListener('click', (e) => { // deletes a removed gp
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
    elements.modePop.style.display = 'none';
  });
});

elements.showSaveGpPopBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    showSavePop();
  });
})

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
    showEditGp(gpaId, elements.gpDisplayMode.value);
  }
});

['input', 'change'].forEach(evt => {
  elements.gpEditUlUni.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      editCalcRenderGp(li);
    }
  })
});

['input', 'change'].forEach(evt => {
  elements.gpEditUlPoly.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      editCalcRenderGp(li);
    }
  })
});

elements.gpEditUlUni.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    editCalcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.gpEditUlPoly.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    editCalcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.addGpRowEdit.forEach(btn => {
  btn.addEventListener('click', () => {
    if (elements.gpDisplayMode.value === "university") {
      elements.gpEditUlUni.insertAdjacentHTML('beforeend', createGpFieldUni());
      let h = elements.gpEditUlUni.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }else if(elements.gpDisplayMode.value === "polytechnic"){
      elements.gpEditUlPoly.insertAdjacentHTML('beforeend', createGpFieldPoly());
      let h = elements.gpEditUlPoly.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }
  });
});

elements.showUpdateGpPopBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    showUpdatePop();
  });
})

elements.gpEditNameInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13) {
    popUpdater(e);
  }
});

elements.updateGp.addEventListener('click', popUpdater);
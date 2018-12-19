import { showCalcArea, addGpField, showSavePop, saveGp, removeGpField, showSavedGp } from "./models/display.mjs";
import {elements} from './models/base.mjs';
import { productCredUnitGrade } from "./models/calcGp.mjs";

const calcRenderGp = (lists) => {
  let creditSum = 0;
  let sum = 0;
  let gp = 0;
  lists.forEach(list => {
    let eachInputVal = Number(list.querySelector('.creditUnit').value);
    let eachSelectVal = Number(list.querySelector('select').value);
    if (eachInputVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1" && eachSelectVal !== -1) {
      creditSum += eachInputVal;
      sum += productCredUnitGrade(eachInputVal, eachSelectVal);
    }
  });
  gp = (sum === 0 || creditSum === 0) ? "0.00" : ((sum / creditSum).toFixed(2));

  elements.gpDisplay.innerHTML = gp;
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

elements.gpCalcUl.addEventListener('change', (e) => {
  if (e.target.matches('.creditUnit') || e.target.matches('select')) {
    const li = e.target.parentNode.parentNode.querySelectorAll('li');
    calcRenderGp(li);
  }
})

elements.gpCalcUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    removeGpField();
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    calcRenderGp(parent.querySelectorAll('li'));
  }
})

elements.closePop.addEventListener('click', () => {
  elements.savePopup.style.display = 'none';

})

elements.showSaveGpPopBtn.addEventListener('click', () => {
  showSavePop();
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
})

elements.saveGp.addEventListener('click', () => {
  let gpName = elements.gpNameInput.value.trim();
  /*******undo these */
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
  if(gpName !== "" || gpName.length !== 0){
    saveGp(gpName);
  }
})

elements.showSavedGpBtn.addEventListener('click', () => { // shows the save popup
  showSavedGp();
  
})



  
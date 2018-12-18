import { toggleCanvas, showCalcArea, addGpField, showSavePop, saveGp } from "./views/display.mjs";
import {elements} from './views/base.mjs';
import { productCredUnitGrade } from "./models/calcGp.mjs";

toggleCanvas();
showCalcArea();

const calcRenderGp = (lists) => {
  let creditSum = 0;
    let sum = 0;
    let gp = 0;
    lists.forEach(list => {
      let eachInputVal = Number(list.querySelector('div input').value);
      let eachSelectVal = Number(list.querySelector('div select').value);
      if (eachInputVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1" && eachSelectVal !== -1) {
        creditSum += eachInputVal;
        sum += productCredUnitGrade(eachInputVal, eachSelectVal);
      }
    });
    gp = (sum === 0 || creditSum === 0) ? 0.00 : ((sum / creditSum).toFixed(2));

    
    elements.gpDisplay.innerHTML = gp;
}

elements.addGpRowBtn.addEventListener('click', () => {
  addGpField();
  let h = elements.gpCalcUl.clientHeight;
  window.scrollTo({
    top: h,
    behavior: 'smooth'
  })
  
});

elements.gpCalcUl.addEventListener('change', (e) => {
  if (e.target.matches('input') || e.target.matches('select')) {
    const li = e.target.parentNode.parentNode.parentNode.querySelectorAll('li');
    calcRenderGp(li);
  }
})

elements.gpCalcUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode.parentNode;
    let parent = e.target.parentNode.parentNode.parentNode;
    parent.removeChild(child);
    calcRenderGp(parent.querySelectorAll('li'));
  }
})

elements.saveGpBtn.addEventListener('click', () => {
  showSavePop();
  // get overlay for the back
  // trap focus in the popup
  // fix focus in input
})


elements.saveGp.addEventListener('click', () => {
  let gpName = elements.gpNameInput.value.trim();
  if(gpName !== "" || gpName.length !== 0){
    console.log(saveGp(gpName));
  }
})
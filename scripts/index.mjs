import { toggleCanvas, showCalcArea, addGpField } from "./views/display.mjs";
import {elements} from './views/base.mjs';
import { productCredUnitGrade, add2gpArr } from "./models/calcGp.mjs";

toggleCanvas();
showCalcArea();

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
    let creditSum = 0;
    let sum = 0;
    let gp = 0;
    li.forEach(list => {
      let eachInputVal = Number(list.querySelector('div input').value);
      let eachSelectVal = Number(list.querySelector('div select').value);
      if (eachInputVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1" && eachSelectVal !== -1) {
        creditSum += eachInputVal;
        sum += productCredUnitGrade(eachInputVal, eachSelectVal);
      }
    });
    gp = (sum === 0 || creditSum === 0) ? 0.00 : ((sum / creditSum).toFixed(2));

    console.log(gp);
    elements.gpDisplay.innerHTML = gp;

  }
})

let gpArr =  [];

const matchGradeScoreUni = (grade) => {
  let score;
  switch (grade) {
    case "A":
      score = 5;
      break;
    case "B":
      score = 4;
      break;
    case "C":
      score = 3;
      break;
    case "D":
      score = 2;
      break;
    case "E":
      score = 1;
      break;
    case "F":
      score = 0;
      break;
  }
  return score;
}

const loadSavedGp = () => {
  const gpaJSON = localStorage.getItem('gpArr');
  try {
    return gpaJSON ? JSON.parse(gpaJSON) : []
  } catch (e) {
    return []
  } 
}

// Save the gpa to localStorage
const saveGpStore = () => {
  localStorage.setItem('gpArr', JSON.stringify(gpArr))
  
}

export const removeGpa = (gpaId) => {
  let gpId = gpArr.findIndex(gpa => gpa.id === gpaId)
  gpArr.splice(gpId, 1);
  saveGpStore();
}

export const getGpa = () => gpArr; 

export const add2gpArr = (gpObj) => {
  gpArr.push({
    id: uuidv4(),
    name: gpObj.name,
    gpa: gpObj.gpa,
    results: gpObj.results
  });
  saveGpStore();
}

export const productCredUnitGrade = (credUnit, grade) => {
  return matchGradeScoreUni(grade) * credUnit;
} 

gpArr = loadSavedGp();
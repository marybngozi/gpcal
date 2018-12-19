let gpArr =  [];

export const loadSavedGp = () => {
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

export const add2gpArr = (name, gpa) => {
  gpArr = loadSavedGp() || [];
  gpArr.push({
    name,
    gpa
  });
  saveGpStore();
}

export const productCredUnitGrade = (credUnit, grade) => {
  return credUnit * grade;
} 

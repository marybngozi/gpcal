const gpArr = [];

export const add2gpArr = (name, gpa) => {
  gpArr.push({
    name,
    gpa
  });
  return gpArr;
}

export const productCredUnitGrade = (credUnit, grade) => {
  return credUnit * grade;
} 

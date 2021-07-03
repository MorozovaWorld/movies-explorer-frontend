
const filterIt = (arr, isChecked, searchKey) => {
  return arr.filter((obj) => { 
    if(isChecked) {
      return (obj.nameRU !== null && obj.nameRU.includes(searchKey) && obj.duration <= 40) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey) && obj.duration <= 40)
    }
    return (obj.nameRU !== null && obj.nameRU.includes(searchKey)) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey))
  });
}

export const handleSavedFilter = (value, data, isChecked, callback) => {
  const result = filterIt(data, isChecked, value);
  callback(result);
}

export const handleFilter = (value, isChecked, callback) => {
  const data = JSON.parse(localStorage.getItem("initialMoviesObject"));
  
  const result = filterIt(data, isChecked, value);
  callback(result);
}

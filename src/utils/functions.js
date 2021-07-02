
const filterIt = (arr, searchKey) => {
  return arr.filter((obj) => { 
    return obj.nameRU.includes(searchKey) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey))
  });
}

export const handleSavedFilter = (value, data, callback) => {
  const result = filterIt(data, value);
  callback(result);
}

export const handleFilter = (value, callback) => {
  const data = JSON.parse(localStorage.getItem("initialMoviesObject"));
  
  const result = filterIt(data, value);
  callback(result);
}

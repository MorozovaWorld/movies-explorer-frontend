const filterIt = (arr, isChecked, searchKey) => {
  return arr.filter((obj) => { 
    if(isChecked) {
      return (obj.nameRU !== null && obj.nameRU.includes(searchKey) && obj.duration <= 40) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey) && obj.duration <= 40)
    }
    return (obj.nameRU !== null && obj.nameRU.includes(searchKey)) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey))
  });
}

export const handleFilter = (value, data, isChecked, callback) => {
  const result = filterIt(data, isChecked, value);
  callback(result);
}

import {
  SHORT_MOVIE_DURATION,
} from './constants'

const filterIt = (arr, isChecked, searchKey) => {  
  return arr.filter((obj) => { 
    if(isChecked) {
      return (obj.nameRU !== null && obj.nameRU.includes(searchKey) && obj.duration <= SHORT_MOVIE_DURATION) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey) && obj.duration <= SHORT_MOVIE_DURATION)
    } 
    return (obj.nameRU !== null && obj.nameRU.includes(searchKey)) ||  (obj.nameEN !== null && obj.nameEN.includes(searchKey))
  });
}

export const handleFilter = (value, data, isChecked, callback) => {
  const result = filterIt(data, isChecked, value);

  callback(result);
}

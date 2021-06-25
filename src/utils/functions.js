
// функция фильтрации данных
export const handleFilter = (value, callback) => {
  // const data = JSON.parse(localStorage.getItem("initialMoviesObject"));
  // console.log(data);
  // console.log(value);
  console.log('localStorage хранит данные о фильмах');
  const result = [];
  callback(result);

  return result;
}

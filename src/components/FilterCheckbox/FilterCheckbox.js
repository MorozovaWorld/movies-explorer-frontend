
function FilterCheckbox({ handleFilterCheckbox, word, isChecked }) {

  const handleCheck = (e) => {
    if (e.target.checked) {
      handleFilterCheckbox(true, word)
    } else {
      handleFilterCheckbox(false, word)
    }
  }

  return (
      <form className="filterCheckbox">
        <label className="filterCheckbox__label">
          <input type="checkbox" className="filterCheckbox__input" defaultChecked={isChecked} onChange={handleCheck}/>
          <span className="filterCheckbox__input-span"></span>
        </label>
      <p className="filterCheckbox__text">Короткометражки</p>
      </form>
  );
}

export default FilterCheckbox;
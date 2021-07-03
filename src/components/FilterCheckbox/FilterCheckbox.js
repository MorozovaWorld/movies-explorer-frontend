
function FilterCheckbox({ handleFilterCheckbox }) {
  const handleCheck = (e) => {
    if (e.target.checked) {
      handleFilterCheckbox(true)
    } else {
      handleFilterCheckbox(false)
    }
  }

  return (
      <form className="filterCheckbox">
        <label className="filterCheckbox__label">
          <input type="checkbox" className="filterCheckbox__input" defaultChecked={false} onChange={handleCheck}/>
          <span className="filterCheckbox__input-span"></span>
        </label>
      <p className="filterCheckbox__text">Короткометражки</p>
      </form>
  );
}

export default FilterCheckbox;
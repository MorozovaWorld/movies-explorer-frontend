
function FilterCheckbox() {
  return (
      <div className="filterCheckbox">
        <label className="filterCheckbox__label">
          <input type="checkbox" className="filterCheckbox__input"/>
          <span className="filterCheckbox__input-span"></span>
        </label>
      <p className="filterCheckbox__text">Короткометражки</p>
      </div>
  );
}

export default FilterCheckbox;
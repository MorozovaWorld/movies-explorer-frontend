function BurgerMenu({ onBurgerMenuOpen }) {
  return (
    <label className="burgerMenu__toggleBtn">
      <input type="checkbox" className="burgerMenu__toggleBtn-input"/>
      <span className="burgerMenu__toggleBtn-span"></span>
    </label>
  );
}

export default BurgerMenu;
import { Link, } from 'react-router-dom';
import logo from '../../images/logo.svg';

function FormPage({title, children, btnText, linkText, linkUrl, linkReason, isDisabled, handleSubmit }) {
  return (
    <>
      <form className="formPage" name="name" onSubmit={handleSubmit}>
        <Link className="formPage__logo opacity opacity_useAt_link" to="/" ><img src={logo} alt="логотип сайта, иконка перехода на страницу о проекте" /></Link>
        <fieldset className="formPage__fieldset">
          <legend className="formPage__title">{title}</legend>
          {children}
        </fieldset>
        <button type="submit" disabled={isDisabled} className={"formPage__button-submit opacity opacity_useAt_button" + (!isDisabled ? '   formPage__button-submit_active' : '')}>{btnText}</button>
        <p className="formPage__bottomText">{linkReason}<Link to={linkUrl} className="formPage__link opacity opacity_useAt_button">{linkText}</Link></p>
      </form>
    </>
  )
}

export default FormPage;
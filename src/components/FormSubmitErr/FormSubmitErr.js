import { USER_INFO_UPDATE_SUCCEED, REGISTER_SUCCEED_MESSAGE } from '../../utils/constants'

function FormSubmitErr({ errText }) {
  return (
    <p id="email-error" className={"formPage__submit-error" + (errText === USER_INFO_UPDATE_SUCCEED ||  errText === REGISTER_SUCCEED_MESSAGE ? " formPage__submit-error_color_green" : '')}>{errText}</p>
  )
}

export default FormSubmitErr;
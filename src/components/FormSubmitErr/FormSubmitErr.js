function FormSubmitErr({ isSubmitResultData }) {
  return (
    <p id="email-error" className={"formPage__submit-error" + (isSubmitResultData.submitResultMessageStyle === 'succeed' ? " formPage__submit-error_color_green" : '')}>{isSubmitResultData.submitResultMessage}</p>
  )
}

export default FormSubmitErr;
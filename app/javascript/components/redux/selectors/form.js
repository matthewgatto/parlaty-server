export const getParameterError = (formKey) => ({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.fieldErrors && (form[formKey].errors.fieldErrors.parameter_name || form[formKey].errors.fieldErrors.parameter_value_8_pack) ? "This field is required" : null
export const getFormError = (formKey) => ({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.formError
export const getFormFieldError = (formKey, name) => ({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.fieldErrors && form[formKey].errors.fieldErrors[name]
export const isFormProcessing = (formKey) => ({form}) => form[formKey] && form[formKey].isProcessing

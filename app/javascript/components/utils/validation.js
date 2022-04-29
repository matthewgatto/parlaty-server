import {string, object, array, number, mixed, ref} from 'yup';

export const forgotPasswordSchema = object().shape({
  email: string().email('Invalid email').required('Email is required')
})

export const resetPasswordSchema = object().shape({
  password: string()
    .required('Password is required')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  password_confirmation: string()
    .required('Passwords must match')
    .oneOf([ref('password'), null], 'Passwords must match')
})

export const loginSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required')
})

export const registrationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  name: string().required('This field is required'),
  password: string()
      .required('Password is required')
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
          'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  password_confirmation: string()
      .required('Passwords must match')
      .oneOf([ref('password'), null], 'Passwords must match')
})

export const inviteSchema = object().shape({
  email: string().email('Invalid email').required('This field is required'),
  name: string().required('This field is required'),
  roleable: string().notOneOf([""], 'This field is required'),
  client: mixed().when('roleable',{
    is: roleable => roleable === "parlatyadmin" || roleable === undefined || roleable === "",
    then: mixed(),
    otherwise: mixed().required('This field is required')
  })
})

export const inviteConfirmationSchema = object().shape({
  password: string()
    .required('Password is required')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  password_confirmation: string()
    .required('Passwords must match')
    .oneOf([ref('password'), null], 'Passwords must match')
})

export const oemSchema = object().shape({
  name: string().required('This field is required'),
  procedures_limit: string().nullable().matches(/(^[0-9]+$|^$)/, 'Must be a positive number')
})

export const stepSchema = object().shape({
  title: string().required('This field is required'),
  loop_value: string().when('enabled_loop',{
    is: enabled_loop => !enabled_loop,
    then: string().matches(/(^[0-9]+$|^$)/, 'Must be a positive number'),
    otherwise: string()
  }),
  steps_in_loop: string().when('enabled_loop',{
    is: enabled_loop => !enabled_loop,
    then: string().matches(/(^[0-9]+$|^$)/, 'Must be a positive number'),
    otherwise: string()
  }),
})

export const procedureSchema = object().shape({
  name: string().required('This field is required'),
  description: string().required('This field is required').max(200, 'Too Long symbols, max: 200'),
  steps: array().of(stepSchema)//.required('Must have steps')
})

export const oemBusinessSchema = object().shape({
  name: string().required('This field is required')
})

export const actionSchema = object().shape({
  name: string().required('This field is required')
})
export const deviceSchema = object().shape({
  name: string().required('This field is required'),
  actions: array().of(actionSchema)//.required('Device actions required')
})

export const procedureOemBusinessesSchema = object().shape({

})

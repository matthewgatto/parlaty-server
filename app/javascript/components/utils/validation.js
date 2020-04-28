import {string, object, array, number,mixed, ref} from 'yup';

export const forgotPasswordSchema = object().shape({
  email: string().email('Invalid email').required('Email is required')
})

export const resetPasswordSchema = object().shape({
  reset_password_token: string().required('SHOULD NOT BE SEEING THIS User should be directed away from page and error displayed'),
  password: string().required('Password is required'),
  password_confirmation: string().required('Passwords must match').oneOf([ref('password'), null], 'Passwords must match')
})

export const loginSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required')
})

export const inviteSchema = object().shape({
  email: string().email('Invalid email').required('This field is required'),
  name: string().required('This field is required'),
  roleable: string(),
  client: string().when('roleable',{
    is: "parlatyadmin",
    then: string(),
    otherwise: string().required('This field is required').min(1)
  })
})

export const inviteConfirmationSchema = object().shape({
  password: string().required('Password is required'),
  password_confirmation: string().required('Passwords must match').oneOf([ref('password'), null], 'Passwords must match')
})

export const oemSchema = object().shape({
  email: string().email('Invalid email').required('This field is required'),
  name: string().required('This field is required'),
  password: string()
})

export const stepSchema = object().shape({
  title: string().required('This field is required'),
})

export const procedureSchema = object().shape({
  name: string().required('This field is required'),
  description: string().required('This field is required'),
  steps: array().of(stepSchema)//.required('Must have steps')
})

export const businessSchema = object().shape({
  name: string().required('This field is required')
})

export const actionSchema = object().shape({
  name: string().required('This field is required')
})
export const deviceSchema = object().shape({
  name: string().required('This field is required'),
  actions: array().of(actionSchema)//.required('Device actions required')
})

export const procedureCategoriesSchema = object().shape({
  
})

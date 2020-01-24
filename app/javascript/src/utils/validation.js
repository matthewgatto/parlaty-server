import {string, object, array, number, ref} from 'yup';

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
  name: string().required('This field is required')
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
  time: number().required('This field is required'),
  parameter_name: string().required('This field is required'),
  parameter_value_8_pack: string().required('This field is required')
})

export const procedureSchema = object().shape({
  name: string().required('This field is required'),
  description: string().required('This field is required'),
  steps: array().of(stepSchema)//.required('Must have steps')
})

export const businessSchema = object().shape({
  name: string().required('This field is required')
})

export const deviceSchema = object().shape({
  name: string().required('This field is required')
})

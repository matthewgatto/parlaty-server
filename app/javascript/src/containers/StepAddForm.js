import React from 'react';
import StepForm from '../components/StepForm';
import { connect } from 'react-redux';

export default connect(
  ({form}) => ({isOpen: form.type === 'create'})
)(StepForm)

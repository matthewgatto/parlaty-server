import React from 'react';
import StepEditForm from '../components/StepEditForm';
import { connect } from 'react-redux';

export default connect(
  ({form}, {id}) => ({isOpen: (form.type === 'edit' && form.id === id) ? true : false})
)(StepEditForm)

import React from 'react';
import { connect } from 'react-redux';
import Field from '../components/Field';

export default connect(
  ({form}, props) => ({error: form[props.form] && form[props.form].inputErrors ? form[props.form].inputErrors[props.name] : ''})
)(Field);

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import ProcedureSteps from './index.js';
const mockStore = configureStore();
const steps = [{id: 0, title: "Test", number: 1}]
const initialValues = {procedure: {steps}, form: {step: {values: {actions: []}, initialValues: {actions: []}}}};

const store = mockStore(initialValues)
it('displays placeholder if an empty step array is passed', () => {
  const testRenderer = TestRenderer.create(<ProcedureSteps steps={[]} />);
  const testInstance = testRenderer.root;
  const placeholder = testInstance.findByProps({ text: 'This procedure currently has no steps' });
});

it('displays placeholder if steps are undefined', () => {
  const testRenderer = TestRenderer.create(<ProcedureSteps />);
  const testInstance = testRenderer.root;
  const placeholder = testInstance.findByProps({ text: 'This procedure currently has no steps' });
});
/*
it('displays steps if steps are passed', () => {
  const testRenderer = TestRenderer.create(<Provider store={store}><ProcedureSteps steps={steps} onDragEnd={() => {}} /></Provider>);
  const testInstance = testRenderer.root;
  const list = testInstance.findByProps({ className: 'list' });
  expect(list.children.length).toBe(steps.length);
  for (var i = 0; i < list.children.length; i++) {
    expect(list.children[i].props.draggableId).toEqual(steps[i].id)
  }
});
*/

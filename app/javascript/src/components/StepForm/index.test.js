import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import StepForm from './index.js';
const mockStore = configureStore();
const initialValues = {procedure: {},form: {step: {values: {}}}};

const store = mockStore(initialValues)
it('mounts when open', () => {
  const testRenderer = TestRenderer.create(<Provider store={store}><StepForm isOpen={true} /></Provider>);
  const testInstance = testRenderer.root;
  const provider = testInstance.children[0];
  const form = provider.children[0];
  const formIsMounted = form ? true : false;
  expect(formIsMounted).toBe(true);
});

it('unmounts when closed', () => {
  const testRenderer = TestRenderer.create(<Provider store={store}><StepForm isOpen={false} /></Provider>);
  const testInstance = testRenderer.root;
  const provider = testInstance.children[0];
  const form = provider.children[0];
  const formIsMounted = form ? true : false;
  expect(formIsMounted).toBe(false);
});

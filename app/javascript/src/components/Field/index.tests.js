import React from 'react';
import TestRenderer from 'react-test-renderer';
import Field from './index.js';

it('displays label correctly', () => {
  const testRenderer = TestRenderer.create(<Field label="Test" />);
  const testInstance = testRenderer.root;
  const field = testInstance.children[0];
  const label = field.children[0];
  const labelText = label.children[0].children[0];
  expect(labelText).toBe("Test")
});

it('displays error if passed both label and error props', () => {
  const testRenderer = TestRenderer.create(<Field label="Test" error />);
  const testInstance = testRenderer.root;
  const field = testInstance.children[0];
  const label = field.children[0];
  const displayingError = label.children[0].children[2] ? true : false;
  expect(displayingError).toBe(true)
});

it('does not show error if no error is passed', () => {
  const testRenderer = TestRenderer.create(<Field label="Test" />);
  const testInstance = testRenderer.root;
  const field = testInstance.children[0];
  const label = field.children[0];
  const displayingError = label.children[0].children[2] ? true : false;
  expect(displayingError).toBe(false)
});

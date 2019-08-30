import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProcedureImages from './index.js';

const images = [{id: 0, src: "https://www.gravatar.com/avatar/6aeef582429fc21a0c76e126d814a8d9?s=32&d=identicon&r=PG&f=1"}, {id: 1, src: "https://www.gravatar.com/avatar/6aeef582429fc21a0c76e126d814a8d9?s=32&d=identicon&r=PG&f=1"}]
it('displays placeholder if an empty image array is passed', () => {
  const testRenderer = TestRenderer.create(<ProcedureImages images={[]} />);
  const testInstance = testRenderer.root;
  const placeholder = testInstance.findByProps({ text: 'This procedure currently has no images' });
});

it('displays placeholder if images are undefined', () => {
  const testRenderer = TestRenderer.create(<ProcedureImages />);
  const testInstance = testRenderer.root;
  const placeholder = testInstance.findByProps({ text: 'This procedure currently has no images' });
});

it('displays images if images are passed', () => {
  const testRenderer = TestRenderer.create(<ProcedureImages images={images} />);
  const testInstance = testRenderer.root;
  const list = testInstance.findByProps({ className: 'list' });
  expect(list.children.length).toBe(images.length);
  for (var i = 0; i < images.length; i++) {
    expect(list.children[i].props.image).toBe(images[i].src);
  }
});

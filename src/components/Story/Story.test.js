import React from 'react';
import Story from './Story';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const component = renderer.create(<Story key={1} id={1} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('initiate with the correct init state', () => {});

it('fetch story data after component mount', () => {});

it('caches at localstorage to prevent duplicated fetches', () => {});

import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const app = renderer.create(<App />);
  const tree = app.toJSON();
  expect(tree).toMatchSnapshot();
});

it('initiate with the correct init state', () => {});

it('preloads data on page load', () => {});

it('increases display limit when scrolled to bottom', () => {});

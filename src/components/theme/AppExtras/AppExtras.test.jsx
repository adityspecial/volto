import React from 'react';
import renderer from 'react-test-renderer';
import AppExtras from './AppExtras';

jest.mock('~/config', () => ({
  settings: {},
  views: {},
  appExtras: [
    {
      match: {
        path: '',
      },
      component: jest.fn((props) => (
        <div className="everywhere">{props.pathname}</div>
      )),
    },
    {
      match: {
        path: '/all-blogs/*',
      },
      component: jest.fn((props) => <div className="blog-listing" />),
    },
    {
      match: {
        path: '/blog/edit',
      },
      component: jest.fn((props) => <div className="blog-edit" />),
    },
    {
      match: {
        path: '/blog',
        exact: true,
      },
      component: jest.fn((props) => (
        <div className="blog-view">{JSON.stringify(props.match)}</div>
      )),
    },
    {
      match: '/something',
      component: jest.fn((props) => (
        <div className="something">{JSON.stringify(props.match)}</div>
      )),
    },
  ],
}));

describe('AppExtras', () => {
  it('renders one app extras registered on empty string', () => {
    const component = renderer.create(<AppExtras pathname="/"></AppExtras>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders 2 app extras on specific path /blog/edit', () => {
    const component = renderer.create(
      <AppExtras pathname="/blog/edit"></AppExtras>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders other 2 app extras on exact path /blog', () => {
    const component = renderer.create(<AppExtras pathname="/blog"></AppExtras>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('can take string path as match', () => {
    const component = renderer.create(
      <AppExtras pathname="/something"></AppExtras>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

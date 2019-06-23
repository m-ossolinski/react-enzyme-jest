import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App, { Link } from './App';
import { jsxEmptyExpression } from '@babel/types';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<App />)
  it('should contain 1 p', () => {
    expect(wrapper.find('a').text()).toBe('Learn React');
  })
  it('matches the snapshop', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  })
  it('update className with new State', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.blue').length).toBe(1);
    expect(wrapper.find('.red').length).toBe(0);
    wrapper.setState({ mainColor: 'red' })
    expect(wrapper.find('.blue').length).toBe(0);
    expect(wrapper.find('.red').length).toBe(1);
  })
  it('on button click changes p text', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('button');
    expect(wrapper.find('.button-state').text()).toBe('No!');
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('Yes!')
  })
  it('on input change title change text', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('input');
    expect(wrapper.find('h2').text()).toBe('');
    input.simulate('change', {target: { value: 'Mateusz' }});
    expect(wrapper.find('h2').text()).toBe('Mateusz');
  })
  it('calls component did mount, updates p tag', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifecycle').text()).toBe('componentDidMount')
  })
  it('set props calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App />)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifecycle').text()).toBe('componentWillReceiveProps');
  })
})

describe('<Link />', () => {
  it('link component accepts address', () => {
    const wrapper = shallow(<Link address="google.com" />)
    expect(wrapper.instance().props.address).toBe('google.com');
  })
  it('a tag node renders href', () => {
    const wrapper = shallow(<Link address="google.com" />)
    expect(wrapper.props().href).toBe('google.com');
  })
  it('returns null with true hide props', () => {
    const wrapper = shallow(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1);
    wrapper.setProps({ hide: true });
    expect(wrapper.get(0)).toBeNull()
  })
})


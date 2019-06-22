import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App, { Link } from './App';

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


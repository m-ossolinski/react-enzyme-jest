import React from 'react';
import Form from './Form';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import api from './api';

configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate('change', {
    currentTarget: {value: newValue}
  })

  return wrapper.find(instance)
}

describe('<Form />', () => {
  test('receive promotions default is true', () => {
    const wrapper = shallow(<Form />)
    const promotionInput = wrapper.find('[data-testid="checked"]')
    expect(promotionInput.props().checked).toBe(true)
  })
  test('allows user to fill out form', () => {
    const wrapper = shallow(<Form />)
    const nameInput = updateInput(wrapper, '[data-testid="name"]', 'Mateusz')
    const emailInput = updateInput(wrapper, '[data-testid="email"]', 'mateusz@gmail.com')
    const numberInput = updateInput(wrapper, '[data-testid="number"]', '1234444')
    wrapper.find('[data-testid="checked"]').simulate('click')

    expect(nameInput.props().value).toBe('Mateusz')
    expect(emailInput.props().value).toBe('mateusz@gmail.com')
    expect(numberInput.props().value).toBe('1234444')
    expect(wrapper.find('[data-testid="checked"]').props().checked).toBe(false)
  })
  test('submits the form', () => {
    jest.spyOn(api, 'addUser').mockImplementation(() => Promise.resolve({
      data: 'New User Added',
    }))
    const wrapper = shallow(<Form />)
    const nameInput = updateInput(wrapper, '[data-testid="name"]', 'Mateusz')
    const emailInput = updateInput(wrapper, '[data-testid="email"]', 'mateusz@gmail.com')
    const numberInput = updateInput(wrapper, '[data-testid="number"]', '1234444')
    wrapper.find('[data-testid="addUserForm"]').simulate('submit', {
      preventDefault: () => {}
    })
    expect(api.addUser).toHaveBeenCalledWith('Mateusz', 'mateusz@gmail.com', '1234444')
  })
  test('matches snapshot', () => {
    const wrapper = shallow(<Form />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
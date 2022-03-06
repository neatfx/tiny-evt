import { mount } from '@vue/test-utils'

import Navbar from './Navbar.vue'

describe('Navbar.vue', () => {
  test('have a NavC tab', () => {
    const wrapper = mount(Navbar, {})
    expect(wrapper.html()).toContain('NavC')
  })
})

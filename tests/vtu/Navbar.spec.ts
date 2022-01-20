import { mount } from '@vue/test-utils'

import Navbar from '../../renderer/components/Navbar.vue'

describe('Navbar.vue', () => {
  test('have a NavC', () => {
    const wrapper = mount(Navbar, {})
    expect(wrapper.html()).toContain('NavC')
  })
})

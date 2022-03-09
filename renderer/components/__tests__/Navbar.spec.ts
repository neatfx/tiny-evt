import { describe, it, expect } from "vitest"
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from "../../router"

import Navbar from '../Navbar.vue'
import App from '../../App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})


test('have a NavC tab', () => {
  const wrapper = mount(Navbar,{
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.html()).toContain('NavC')
})

test('have a NavD tab', async() => {
  router.push('/d')

  await router.isReady()

  const wrapper = mount(App,{
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.html()).toContain('ViewD')
})

import { describe, it, expect } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
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
  await router.push('/d')

  await router.isReady()

  const wrapper = mount(App,{
    global: {
      plugins: [router]
    }
  })
  console.log(wrapper.html())
  console.log(wrapper.getComponent(RouterView).vm)
  expect(wrapper.html()).toContain('ViewC')
})

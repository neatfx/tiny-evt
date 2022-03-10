import { describe, it, expect } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import {routes} from "../../router"

import Navbar from '../Navbar.vue'
import App from '../../App.vue'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes,
// })

let router

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })

  router.push('/')
  await router.isReady()
})

test('have a NavC tab', () => {
  const wrapper = mount(Navbar,{
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.html()).toContain('NavC')
})

test('nav to /d', async() => {
  await router.push('/d')

  await router.isReady()

  const wrapper = mount(App,{
    global: {
      plugins: [router],
    }
  })

  // console.log(wrapper.html())
  expect(wrapper.html()).toContain('ViewD')
})

import { expect } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from "../../router"

import DataRows from '../DataRows.vue'

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
  const wrapper = mount(DataRows,{
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.html()).toContain('NavC')
})

// test('nav to /c', async() => {
//   await router.push('/c')

//   await router.isReady()

//   const wrapper = mount(App,{
//     global: {
//       plugins: [router],
//     }
//   })

//   expect(wrapper.html()).toContain('ViewD')
// })

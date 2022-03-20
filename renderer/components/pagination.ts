import { computed, onMounted, ref, type ComputedRef } from "vue"

const total = ref(0)
const page = ref(1)
const offset = ref(0)
const limit = ref(5)
const pages = computed(() => {
  return Math.ceil(total.value / limit.value)
})

function head() {
  console.log('head')

  offset.value = 0
  page.value = 1
}
function prev() {
  console.log('prev')

  if (page.value >= 2) {
    page.value = page.value - 1
    offset.value = limit.value * (page.value - 1)
  }
}
function next() {
  console.log('next')

  if (page.value < pages.value) {
    page.value = page.value + 1
    offset.value = limit.value * (page.value - 1)
  }
}
function end() {
  console.log('end')

  page.value = pages.value
  offset.value = total.value - total.value % limit.value
}



onMounted(() => {

})

export function usePagination() {
  return { offset, limit, total, pages, page, head, prev, next, end }
}

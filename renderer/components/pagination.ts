import { ref } from "vue"

const offset = ref(0)
const limit = ref(7)
const total = ref(0)
const pages = ref(1)

function head() {
  console.log('head')
  offset.value = 0
}
function prev() {
  console.log('prev')
  offset.value = offset.value - limit.value
}
function next() {
  console.log('next')
  offset.value = offset.value + limit.value
}
function end() {
  console.log('end')
}

export function usePagination() {
  return { offset, limit, total, pages, head, prev, next, end }
}

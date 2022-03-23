import { computed, ref, watch } from "vue"

const total = ref(0)
const limit = ref(5)
const offset = ref(0)
const pages = computed(() => {
  return Math.ceil(total.value / limit.value)
})
const page = ref(1)

watch(pages, () => {
  console.log('pages', offset.value, total.value)
  if (offset.value === total.value && page.value > 1) {
    console.log('x')
    page.value = page.value - 1
    offset.value = offset.value - limit.value;
  }
})

function head() {
  page.value = 1
  offset.value = 0
}
function prev() {
  if (page.value >= 2) {
    page.value = page.value - 1
    offset.value = limit.value * (page.value - 1)
  }
}
function next() {
  if (page.value < pages.value) {
    page.value = page.value + 1
    offset.value = limit.value * (page.value - 1)
  }
}
function end() {
  page.value = pages.value
  offset.value = limit.value * (page.value - 1)
}

function reset() {
  offset.value = 0
  page.value = 1
}

export function usePagination() {
  return { offset, limit, total, pages, page, head, prev, next, end, reset }
}

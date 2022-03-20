import { computed, onMounted, ref, type ComputedRef } from "vue"

const total = ref(0)
const page = ref(1)
const offset = ref(0)
const limit = ref(5)

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

  if (page.value <= pages.value) {
    page.value = page.value + 1
    offset.value = limit.value * (page.value - 1)
    console.log(offset.value)
  }
}
function end() {
  console.log('end')

  page.value = pages.value
  offset.value = total.value - total.value % limit.value
}

const pages = computed(() => {
  if (total.value % limit.value === 0) {
    return total.value / limit.value
  } else {
    return parseInt((total.value / limit.value).toFixed()) + 1
  }
})

onMounted(() => {

})

export function usePagination() {
  return { offset, limit, total, pages, page, head, prev, next, end }
}

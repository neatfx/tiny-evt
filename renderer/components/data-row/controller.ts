import { watch, watchEffect } from "vue"

import { useFilter } from '@comps/data-row/filter'
import { usePagination } from '@comps/pagination'

const { workingFilters } = useFilter()

interface IController {
  filter: Function,
  fetchPagedRows: Function,
  fetchFiltersMeta: Function
}

export function useDataRowsController(store: IController) {
  watch([usePagination().page], async () => {
    // console.log('Controller: ', workingFilters.value)
    if (workingFilters.value.size) {

      const obj = {}
      for (let key of workingFilters.value.keys()) {
        obj[key] = workingFilters.value.get(key)
      }
      // console.log(obj)
      await store.filter(obj)
    } else {
      await store.fetchPagedRows()
    }
  })

  watch(workingFilters.value, () => {
    if (workingFilters.value.size === 0) {
      usePagination().reset()
    }
  })

  watchEffect(async () => {
    if (workingFilters.value.size) {

      usePagination().reset()

      const obj = {}
      for (let key of workingFilters.value.keys()) {
        obj[key] = workingFilters.value.get(key)
      }
      // console.log(obj)
      await store.filter(obj)
    } else {
      await store.fetchPagedRows()
    }
  })

  watchEffect(async () => {
    await store.fetchPagedRows()
    await store.fetchFiltersMeta()
  })

  return { workingFilters }
}
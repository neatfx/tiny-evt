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
    if (workingFilters.categories.size || workingFilters.publishing.size) {

      const obj = {
        categories: Array.from(workingFilters.categories),
        publishing: Array.from(workingFilters.publishing)
      }

      await store.filter(obj)
    } else {
      await store.fetchPagedRows()
    }
  })

  watch([workingFilters.categories, workingFilters.publishing], () => {
    if (workingFilters.categories.size == 0 && workingFilters.publishing.size == 0) {
      usePagination().reset()
    }
  })

  watchEffect(async () => {
    if (workingFilters.categories.size || workingFilters.publishing.size) {

      usePagination().reset()

      const obj = {
        categories: Array.from(workingFilters.categories),
        publishing: Array.from(workingFilters.publishing)
      }

      console.log(obj)
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
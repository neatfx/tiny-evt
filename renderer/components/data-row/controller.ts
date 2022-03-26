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
    console.log(workingFilters.value)
    if (Object.keys(workingFilters.value).length) {
      await store.filter(workingFilters.value)
    } else {
      await store.fetchPagedRows()
    }
  })

  watch(workingFilters, () => {
    if (Object.keys(workingFilters.value).length === 0) {
      usePagination().reset()
    }
  })

  watchEffect(async () => {
    if (Object.keys(workingFilters.value).length) {

      usePagination().reset()

      await store.filter(workingFilters.value)
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
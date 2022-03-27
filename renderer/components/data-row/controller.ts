import { watch, watchEffect } from "vue"

import { useFilter } from '@comps/data-row/filter'
import { usePagination } from '@comps/pagination'

const { workingFilters, filtersCount } = useFilter()

interface IController {
  filter: Function,
  fetchPagedRows: Function,
  fetchFiltersMeta: Function
}

export function useDataRowsController(store: IController) {
  watch([usePagination().page], async () => {
    if (workingFilters.size) {
      await store.filter(workingFilters)
    } else {
      await store.fetchPagedRows()
    }
  })

  watch([filtersCount], async() => {
    if (filtersCount) {
      usePagination().reset()

      await store.filter(workingFilters)
    } else {
      await store.fetchPagedRows()
    }
  })

  // watchEffect(async () => {
  //   if (filtersCount) {
  //     usePagination().reset()

  //     await store.filter(workingFilters)
  //   } else {
  //     await store.fetchPagedRows()
  //   }
  // })

  watchEffect(async () => {
    await store.fetchPagedRows()
    await store.fetchFiltersMeta()
  })

  return { workingFilters }
}
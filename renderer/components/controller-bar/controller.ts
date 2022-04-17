import { watch, watchEffect } from "vue"

import { useFilter } from './filter'
import { usePagination } from '@comps/pagination'
// import { useBooksStore } from '../../stores';

// const booksStore = useBooksStore()

const { workingFilters, filtersCount } = useFilter()

interface IController {
  currBooklist: number[],
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

  watch([filtersCount, store.currBooklist], async () => {
    if (filtersCount.value > 0 || store.currBooklist.length > 0) {
      usePagination().reset()

      await store.filter(workingFilters)
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
import { watch, watchEffect } from "vue"

import { useFilter } from '@comps/data-row/filter'
import { usePagination } from '@comps/pagination'

const { workingFilters } = useFilter()

interface IController {
  filter: Function,
  fetchPagedRows: Function,
  fetchFiltersMeta: Function
}

function transformFilterData(workingFilters: {
  type: string;
  value: string;
}[]): {
  categories: string[],
  publishing: string[]
} {

  const categories = new Set<string>()
  const publishing = new Set<string>()

  workingFilters.forEach(element => {
    if (element.type === 'categories') categories.add(element.value)
    if (element.type === 'publishing') publishing.add(element.value)
  });

  return {
    categories: Array.from(categories),
    publishing: Array.from(publishing)
  }
}

export function useDataRowsController(store: IController) {
  watch([usePagination().page], async () => {
    if (workingFilters.length) {
      await store.filter(transformFilterData(workingFilters))
    } else {
      await store.fetchPagedRows()
    }
  })

  watch([workingFilters], () => {
    if (workingFilters.length == 0) {
      usePagination().reset()
    }
  })

  watchEffect(async () => {
    if (workingFilters.length) {
      usePagination().reset()

      await store.filter(transformFilterData(workingFilters))
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
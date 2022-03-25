import { watch, watchEffect } from "vue"

// import { useContactsStore } from '../../stores'
import { useFilter } from '@comps/data-row/filter'
import { usePagination } from '@comps/pagination'
import type { Store } from "pinia"
import type { IndexableTypeArray } from 'dexie';
import { Contact } from '../../db/testing/contact';

// const store = useContactsStore()
const { workingFilters } = useFilter()

export function useDataRowsOpt (store: {
  items: Contact[],
  total: number,
  filters: {
    sex: IndexableTypeArray,
    role: IndexableTypeArray,
  }
}) {
  watch([usePagination().page], async () => {
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

  return {store, workingFilters}
}
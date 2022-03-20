// import type { Store } from "pinia";
import { onMounted, reactive, ref } from "vue"

const currentExpandedPanel = new Map<
  HTMLElement|null,
  any
>()

export function useCurrentExpandedPanel() {
  return { currentExpandedPanel }
}
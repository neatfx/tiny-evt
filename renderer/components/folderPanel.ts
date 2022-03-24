import { ref } from "vue"

const currentExpandedPanel = ref<Function | null>(null)

export function useFolderPanel() {
  return { currentExpandedPanel }
}
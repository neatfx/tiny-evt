import { onMounted, ref } from "vue"

const x = ref(0)
const y = ref(0)
const show = ref('none')

function update(event: MouseEvent) {
  x.value = event.clientX
  y.value = event.clientY
}

export function useContextMenu() {
  onMounted(() => {
    // 拦截默认菜单
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
    // 点击任意位置后隐藏右键菜单
    document.addEventListener("click", () => {
      show.value = "none"
    })
  })

  return { show, x, y }
}

export const vContextMenu = {
  mounted: (el: HTMLLIElement, binding: any) => {
    el.oncontextmenu = (e: MouseEvent) => {
      update(e)
      show.value = 'block'
      console.log('contextMenu', x.value, y.value, el, binding.value)
    }
  }
}
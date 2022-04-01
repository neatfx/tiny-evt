import { onMounted, ref } from "vue"

// const x = ref(0)
// const y = ref(0)
// const show = ref('none')
// const target = ref<EventTarget | null>()
// const targetId = ref<number>()

// function update(event: MouseEvent, id: number) {
//   x.value = event.clientX
//   y.value = event.clientY
//   targetId.value = id
// }

// export function useContextMenu() {
//   onMounted(() => {
//     // 拦截默认菜单
//     window.addEventListener('contextmenu', (e) => {
//       e.preventDefault()
//       // console.log('all',e.target, target.value)
//       if (e.target !== target.value) show.value = "none"
//     })
//     // 点击任意位置后隐藏右键菜单
//     window.addEventListener("click", () => {
//       show.value = "none"
//     })
//   })

//   return { show, x, y, targetId }
// }

export const vFocus = {
  mounted: (el: HTMLLIElement, binding: any) => {
    el.focus()
  }
}
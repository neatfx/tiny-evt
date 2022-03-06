export function useList() {
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [], // 列表数据
  });

  // 获取列表
  function getList() {
    state.loading = true;
    return request({
      url: "/getUsers",
      method: "get",
    }).then(({ data, total }) => {
      // 设置列表数据
      state.list = data;
    }).finally(() => {
      state.loading = false;
    });
  }
  
  // 首次获取数据
  getList();

  return { state, getList };
}

export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  // 初始化时，根据isEdit判定是否需要获取详情
  onMounted(() => {
    if (isEdit && id) {
      // 获取详情
      request({
        url: "/getUser",
        method: "get",
        params: { id },
      }).then(({ data }) => {
        model.value = data;
      });
    }
  });
  return { model };
}
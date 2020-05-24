# *tiny-evt*

![screenshot](screenshot.png)

基于 `Vite` 实现的 `(E)lectron`+`(V)ue`+`(T)ypeScript` 项目基础代码。

依赖简单，无需复杂配置，编程前准备工作更少，运行、HMR、编译打包速度更快，关注 [应用安全](https://www.electronjs.org/docs/tutorial/security)、自动化测试。

---

| Dependence | Category | Optional | Version | Description |
| :---:|:---:|:---:|:---:|:---:|
| `env-cmd`| `dev` | `true` | `^10.1.0`|
| `vue-router` | | `true` | `^4.0.0-alpha.12` |
| `@vue/compiler-sfc` | `dev` | `false` | `^3.0.0-beta.14` | 版本必须与 `vite` 中的 `vue` 版本保持一致
| `electron` | `dev` | `false` | `^9.0.0`
| `electron-builder` | `dev` | `false` | `^22.6.0`
| [`vite`](https://github.com/vuejs/vite) | `dev` | `false` | `^0.16.7` | `vue@3.0.0-beta.14`、[`esbuild`](https://github.com/evanw/esbuild)

> 关于 Vite 的定位:
>
> *It's more like a more streamlined, opinionated development workflow tool. Think webpack-dev-server + webpack but lighter, faster, and pre-configured.*
>
> &mdash; *Evan You ( [@youyuxi](https://twitter.com/youyuxi/status/1258112624300118022) ) May 6, 2020*

---

> First Run

```bash
cp configs/.env.example .env
```

> 启动测试

```bash
# 启动本地服务器运行 Renderer Process ( Vue APP )
# renderer/**/* ---> Vite ---> dev-server @ localhost:3000

# 利用 Vite 中引入的 esbuild 编译打包 Main Process ( TypeScript APP )
# main/**/* ---> esbuild.build() ---> build/main.js、build/preload.js

# 运行 Electron 应用
# electron ---> build/main.js

# 开发版环境下，测试版本 Electron 应用的 main-window 指向本地 Vite-dev-server
# main-window @ TinyEvt @ development ---> localhost:3000

npm run dev
```

> 应用打包

```bash
# 编译打包 Renderer Process ( Vue APP )
# renderer/**/* ---> Vite.build() ---> build/renderer/

# 编译打包 Main Process ( TypeScript APP )
# main/**/* ---> esbuild.build() ---> build/main.js、build/preload.js、

# 打包应用
# main/resources/**/* ---> electron-builder ---> build/resources/
# build/**/* ---> electron-builder ---> dist/

# 以可分发格式打包后的 Electron 应用指向 Vue 应用打包后的本地文件
# main-window @ TinyEvt（ packaged，DMG 格式 ）---> build/renderer/index.html

npm run dist
```

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 一分钟搭建 Vite + Cesium 开发环境 - 知乎: https://zhuanlan.zhihu.com/p/354856692
import cesium from "vite-plugin-cesium"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()]
})

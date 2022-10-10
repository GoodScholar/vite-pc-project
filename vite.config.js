import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  // 基本公共路径
  base: './',
  // 服务端渲染
  // ssr: false,
  plugins: [
    vue({
      // 将ref的.value去除
      reactivityTransform: true,
    }),
    // 可直接在setup标签中添加name属性
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 在plugins配置数组里添加gzip插件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 添加下面这块
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
  ],
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名
  },
  server: {
    host: '0.0.0.0',
    // 是否自动在浏览器打开
    // open: true,
    // 是否开启 https
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true, // true/false, 默认值:false - 将主机报头的来源更改为目标URL
      },
    },
  },
  build: {
    // 设置打包后文件的名称
    outDir: 'niHao',
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    // 启用/禁用 brotli 压缩大小报告
    brotliSize: true,
    // chunks 大小限制
    chunkSizeWarningLimit: 1500,
    minify: 'terser',
    // 删除文件中console、debugger等调试用的多余代码
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        // 将静态文件进行分类存放
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})

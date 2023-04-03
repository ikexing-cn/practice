import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Component from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: './src/typings/vue-router.d.ts'
    }),
    Vue({ reactivityTransform: true }),
    Unocss(),
    AutoImport({
      dts: './src/typings/auto-import.d.ts',
      imports: [
        VueRouterAutoImports,
        { 'vue-router/auto': ['useLink'] },
        'vue', '@vueuse/core'
      ]
    }),
    Component({
      dts: './src/typings/components.d.ts'
    })
  ]
})

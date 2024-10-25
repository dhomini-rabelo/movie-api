import path from 'path'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    globals: true,
    root: './',
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@tests': path.resolve(__dirname, './tests/'),
      '@typings': path.resolve(__dirname, './typings/'),
      '@infra': path.resolve(__dirname, './src/infra/'),
    }
  },
})
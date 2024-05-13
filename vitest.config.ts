import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      models: path.resolve(__dirname, 'src/models'),
      utils: path.resolve(__dirname, 'src/utils'),
      'test-utils': path.resolve(__dirname, 'src/test-utils'),
      types: path.resolve(__dirname, 'src/types'),
      services: path.resolve(__dirname, 'src/services'),
    },
  },
  test: {
    setupFiles: ['src/test-utils/setup.ts'],
    environment: 'node',
    env: {},
  },
})

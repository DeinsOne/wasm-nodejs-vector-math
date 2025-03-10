import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['src/*.test.ts', 'src/*.ts'],
    benchmark: {
      include: ['src/*.bench.ts'],
    }
  },
})

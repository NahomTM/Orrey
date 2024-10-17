import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.jpeg', '**/*.jpg', '**/*.png'],
  build: {
    rollupOptions: {
      external: [
        '/mercury/mercury.gltf',
        '/venus/venus.gltf',
        '/earth/earth.gltf',
        '/mars/mars.gltf',
        '/jupiter/jupiter.gltf',
        '/saturn/saturn.gltf',
        '/uranus/uranus.gltf',
        '/neptune/neptune.gltf'
      ]
    }
  }
})

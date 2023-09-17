// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { PROXY_URL } from './src/views/helper';
// // https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],

//   server: {
//     // port: 3000,
//     proxy: {
//       '/api': {
//         target: PROXY_URL,
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//       },
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

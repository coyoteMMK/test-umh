import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ...cualquier otra configuración que ya tengas
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://coyotemmk.github.io/',
  base: 'test-umh'
});
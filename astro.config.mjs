// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@keystatic/core', '@keystatic/astro'],
      force: true
    },
    ssr: {
      noExternal: ['@keystatic/astro', '@keystatic/core']
    }
  },

  integrations: [mdx(), keystatic(), react()]
});

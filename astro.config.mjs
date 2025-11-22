// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

const keystaticNoExternal = [
  /^@keystatic\//,
  /^@keystar\//,
  /^@react-aria\//,
  /^@react-stately\//,
  /^@react-types\//,
  'emery',
  '@urql/core'
];

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
      noDiscovery: true
    },
    ssr: {
      noExternal: keystaticNoExternal
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
    }
  },

  integrations: [mdx(), keystatic(), react()]
});

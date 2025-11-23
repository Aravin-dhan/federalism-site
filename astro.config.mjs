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

const directionShim = new URL('./src/shims/direction-default.js', import.meta.url).pathname;
const isHotkeyShim = new URL('./src/shims/is-hotkey.js', import.meta.url).pathname;

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
    },
    resolve: {
      alias: {
        'lodash/debounce': 'lodash-es/debounce',
        'lodash/debounce.js': 'lodash-es/debounce',
        direction: directionShim,
        'direction/index.js': directionShim,
        'is-hotkey': isHotkeyShim,
        'is-hotkey/lib/index.js': isHotkeyShim,
        'slate-react/node_modules/is-hotkey/lib/index.js': isHotkeyShim
      }
    }
  },

  integrations: [mdx(), keystatic(), react()]
});

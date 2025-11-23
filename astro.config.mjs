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
const useSyncExternalStoreShim = new URL('./src/shims/use-sync-external-store.js', import.meta.url).pathname;
const lodashSubpathAlias = { find: /^lodash\/(.*)$/, replacement: 'lodash-es/$1' };

const resolveAliases = [
  lodashSubpathAlias,
  { find: 'direction', replacement: directionShim },
  { find: 'direction/index.js', replacement: directionShim },
  { find: 'is-hotkey', replacement: isHotkeyShim },
  { find: 'is-hotkey/lib/index.js', replacement: isHotkeyShim },
  { find: 'slate-react/node_modules/is-hotkey/lib/index.js', replacement: isHotkeyShim },
  { find: 'use-sync-external-store/shim', replacement: useSyncExternalStoreShim },
  { find: 'use-sync-external-store/shim/index', replacement: useSyncExternalStoreShim },
  { find: 'use-sync-external-store/shim/index.js', replacement: useSyncExternalStoreShim }
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
    },
    resolve: {
      alias: resolveAliases
    }
  },

  integrations: [mdx(), keystatic(), react()]
});

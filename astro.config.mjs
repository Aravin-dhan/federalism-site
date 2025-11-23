// @ts-check
import { fileURLToPath } from 'node:url';
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

const directionShim = fileURLToPath(new URL('./src/shims/direction-default.js', import.meta.url));
const isHotkeyShim = fileURLToPath(new URL('./src/shims/is-hotkey.js', import.meta.url));
const useSyncExternalStoreShim = fileURLToPath(new URL('./src/shims/use-sync-external-store.js', import.meta.url));
const lodashSubpathAlias = { find: /^lodash\/(.*)$/, replacement: 'lodash-es/$1' };

const shimMap = new Map([
  ['is-hotkey', isHotkeyShim],
  ['is-hotkey/lib/index.js', isHotkeyShim],
  ['slate-react/node_modules/is-hotkey/lib/index.js', isHotkeyShim],
  ['use-sync-external-store/shim', useSyncExternalStoreShim],
  ['use-sync-external-store/shim/index', useSyncExternalStoreShim],
  ['use-sync-external-store/shim/index.js', useSyncExternalStoreShim]
]);

const resolveAliases = [
  lodashSubpathAlias,
  { find: 'direction', replacement: directionShim },
  { find: 'direction/index.js', replacement: directionShim },
  ...Array.from(shimMap.entries()).map(([find, replacement]) => ({ find, replacement }))
];

const keystaticShimPlugin = {
  name: 'keystatic-shim-resolver',
  enforce: 'pre',
  resolveId(source) {
    if (shimMap.has(source)) {
      return shimMap.get(source);
    }
    return null;
  }
};

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'server',
  vite: {
    plugins: [tailwindcss(), keystaticShimPlugin],
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

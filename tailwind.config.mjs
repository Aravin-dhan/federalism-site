import { defineConfig } from 'tailwindcss';

export default defineConfig({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				paper: '#F7F5F0',
				slate: '#2C2C2C',
				'accent-red': '#B93632',
				'highlight-gold': '#C5A059',
				'slate-black': '#111111'
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['Inter', 'system-ui', 'sans-serif'],
				tamil: ['"Noto Serif Tamil"', 'serif']
			},
			borderWidth: {
				3: '3px'
			},
			keyframes: {
				ticker: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				ticker: 'ticker 25s linear infinite'
			}
		}
	}
});

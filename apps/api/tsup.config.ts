import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/server.ts'],
	format: ['esm'],
	target: 'node24',
	sourcemap: true,
	clean: true,
	noExternal: [/^@app\//],
	banner: {
		js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);",
	},
})

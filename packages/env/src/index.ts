import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

function findRootEnvPath() {
	if (typeof import.meta.dirname === 'string') {
		return resolve(import.meta.dirname, '../../../.env')
	}
	if (typeof import.meta.url === 'string') {
		return resolve(dirname(fileURLToPath(import.meta.url)), '../../../.env')
	}

	let current = process.cwd()
	while (true) {
		const candidate = resolve(current, '.env')
		if (existsSync(candidate)) return candidate
		const parent = dirname(current)
		if (parent === current) return resolve(process.cwd(), '.env')
		current = parent
	}
}

const rootEnvPath = findRootEnvPath()

if (existsSync(rootEnvPath)) {
	process.loadEnvFile(rootEnvPath)
}

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
	PORT: z.coerce.number().int().positive().default(3333),
	DATABASE_URL: z.url(),
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url().default('http://localhost:3333'),
	WEB_URL: z.url().default('http://localhost:3000'),
})

export const env = envSchema.parse(process.env)

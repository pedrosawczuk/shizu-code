import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { z } from 'zod'

const rootEnvPath = resolve(import.meta.dirname, '../../../.env')

if (existsSync(rootEnvPath)) {
  process.loadEnvFile(rootEnvPath)
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().int().positive().default(3333),
})

export const env = envSchema.parse(process.env)

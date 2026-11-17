import { env } from '@app/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({
	connectionString: env.DATABASE_URL,
})

export const db = drizzle({
	client: pool,
	schema,
})

export * from 'drizzle-orm'
export * from './schema'

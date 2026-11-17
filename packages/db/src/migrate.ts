import { resolve } from 'node:path'
import { env } from '@app/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

async function runMigrations() {
	console.log('⏳ Iniciando migrations...')

	const pool = new Pool({
		connectionString: env.DATABASE_URL,
		max: 1,
	})
	const db = drizzle({ client: pool })

	try {
		await migrate(db, {
			migrationsFolder: resolve(import.meta.dirname, '../drizzle'),
		})
		console.log('✅ Migrations concluídas com sucesso!')
	} catch (error) {
		console.error('❌ Erro aplicando migrations:', error)
		process.exit(1)
	} finally {
		await pool.end()
	}
}

void runMigrations()

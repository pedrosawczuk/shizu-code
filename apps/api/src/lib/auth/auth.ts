import {
	accountsTable,
	db,
	sessionsTable,
	usersTable,
	verificationsTable,
} from '@app/db'
import { env } from '@app/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: usersTable,
			session: sessionsTable,
			account: accountsTable,
			verification: verificationsTable,
		},
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		revokeSessionsOnPasswordReset: true,
		sendResetPassword: async ({ user, url }) => {
			if (env.NODE_ENV !== 'prod') {
				console.info({ email: user.email, resetUrl: url })
			}
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 30,
		freshAge: 60 * 30,
	},
	trustedOrigins: [env.WEB_URL, env.BETTER_AUTH_URL],
})

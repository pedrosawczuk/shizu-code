import type { FastifyInstance } from 'fastify'
import { forgotPasswordModule } from './forgot-password'
import { forgotPasswordSchema } from './forgot-password-schema'
import { signInWithEmailModule } from './sign-in-with-email'
import { signInWithEmailSchema } from './sign-in-with-email-schema'
import { signOutModule } from './sign-out'
import { signUpWithEmailModule } from './sign-up-with-email'
import { signUpWithEmailSchema } from './sign-up-with-email-schema'

export function authRoutes(app: FastifyInstance) {
	app.post(
		'/sign-up',
		{
			schema: { body: signUpWithEmailSchema },
		},
		signUpWithEmailModule,
	)

	app.post(
		'/sign-in',
		{
			schema: { body: signInWithEmailSchema },
		},
		signInWithEmailModule,
	)

	app.post(
		'/forgot-password',
		{
			schema: { body: forgotPasswordSchema },
		},
		forgotPasswordModule,
	)

	app.post('/sign-out', signOutModule)
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import { auth } from '@/lib/auth/auth'
import { forwardWebResponse, toFetchHeaders } from '@/lib/auth/http-utils'
import type { SignInWithEmailSchema } from './sign-in-with-email-schema'

export async function signInWithEmailModule(
	request: FastifyRequest<{ Body: SignInWithEmailSchema }>,
	reply: FastifyReply,
) {
	const { email, password, remember } = request.body

	const response = await auth.api.signInEmail({
		body: {
			email,
			password,
			rememberMe: remember,
		},
		asResponse: true,
		headers: toFetchHeaders(request.headers),
	})

	forwardWebResponse(response, reply)

	const data = await response.json()
	return reply.status(response.status).send(data)
}

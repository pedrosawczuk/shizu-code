import { faker } from '@faker-js/faker'
import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { auth } from '@/lib/auth/auth'
import { createAuthTestApp } from '@/test/create-auth-test-app'
import { makeAuthResponse } from '@/test/factories/make-auth-response'

function makeSignUpPayload() {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email().toLowerCase(),
		password: faker.internet.password({ length: 10 }),
	}
}

describe('POST /auth/sign-up', () => {
	let app: FastifyInstance

	beforeAll(async () => {
		app = createAuthTestApp()
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('cria o usuário e repassa a resposta e cookie do better-auth', async () => {
		const payload = makeSignUpPayload()
		const responseBody = {
			token: faker.string.alphanumeric(32),
			user: { id: faker.string.uuid(), email: payload.email },
		}

		vi.mocked(auth.api.signUpEmail).mockResolvedValue(
			makeAuthResponse(responseBody, {
				headers: {
					'set-cookie': 'better-auth.session_token=abc123; Path=/; HttpOnly',
				},
			}) as never,
		)

		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-up',
			payload,
		})

		expect(response.statusCode).toBe(200)
		expect(response.json()).toEqual(responseBody)
		expect(response.cookies).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'better-auth.session_token' }),
			]),
		)
		expect(auth.api.signUpEmail).toHaveBeenCalledWith(
			expect.objectContaining({
				body: {
					name: payload.name,
					email: payload.email,
					password: payload.password,
				},
				asResponse: true,
			}),
		)
	})

	it('retorna 409 quando o e-mail já está cadastrado', async () => {
		vi.mocked(auth.api.signUpEmail).mockResolvedValue(
			makeAuthResponse(
				{ code: 'USER_ALREADY_EXISTS', message: 'E-mail já cadastrado' },
				{ status: 409 },
			) as never,
		)

		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-up',
			payload: makeSignUpPayload(),
		})

		expect(response.statusCode).toBe(409)
	})

	it('retorna 400 quando os dados enviados são inválidos', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-up',
			payload: { name: 'A', email: 'not-an-email', password: '123' },
		})

		expect(response.statusCode).toBe(400)
		expect(response.json()).toMatchObject({
			code: 'VALIDATION_ERROR',
			message: 'Falha na validação dos campos enviados.',
		})
		expect(auth.api.signUpEmail).not.toHaveBeenCalled()
	})
})

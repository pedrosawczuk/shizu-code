import { z } from 'zod'

export const signUpWithEmailSchema = z.object({
	name: z
		.string({ message: 'Informe seu nome.' })
		.trim()
		.min(2, 'O nome deve ter pelo menos 2 caracteres.')
		.max(100, 'O nome deve ter no máximo 100 caracteres.'),
	email: z.email({ message: 'Informe um e-mail válido.' }).trim().toLowerCase(),
	password: z
		.string({ message: 'Informe uma senha.' })
		.min(8, 'A senha deve ter pelo menos 8 caracteres.')
		.max(128, 'A senha deve ter no máximo 128 caracteres.'),
})

export type SignUpWithEmailSchema = z.infer<typeof signUpWithEmailSchema>

import { z } from 'zod'

export const signInWithEmailSchema = z.object({
	email: z.email({ message: 'Informe um e-mail válido.' }).trim().toLowerCase(),
	password: z
		.string({ message: 'Informe sua senha.' })
		.min(1, 'Informe sua senha.'),
	remember: z.boolean().optional().default(false),
})

export type SignInWithEmailSchema = z.infer<typeof signInWithEmailSchema>

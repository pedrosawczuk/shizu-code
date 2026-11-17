import { z } from 'zod'

export const forgotPasswordSchema = z.object({
	email: z.email({ message: 'Informe um e-mail válido.' }).trim().toLowerCase(),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

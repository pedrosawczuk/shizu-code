import { vi } from 'vitest'

vi.mock('@/lib/auth/auth', () => ({
	auth: {
		api: {
			requestPasswordReset: vi.fn(),
			signInEmail: vi.fn(),
			signOut: vi.fn(),
			signUpEmail: vi.fn(),
		},
	},
}))

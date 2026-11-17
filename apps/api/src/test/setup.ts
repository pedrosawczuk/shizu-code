import '@/test/mock-external-services'
import { beforeEach, vi } from 'vitest'

vi.mock('@app/db', () => ({
	accountsTable: {},
	sessionsTable: {},
	usersTable: {},
	verificationsTable: {},
	db: {
		delete: vi.fn(),
		insert: vi.fn(),
		select: vi.fn(),
		transaction: vi.fn(),
		update: vi.fn(),
	},
	and: vi.fn(),
	asc: vi.fn(),
	count: vi.fn(),
	desc: vi.fn(),
	eq: vi.fn(),
	gt: vi.fn(),
	gte: vi.fn(),
	inArray: vi.fn(),
	isNotNull: vi.fn(),
	isNull: vi.fn(),
	lte: vi.fn(),
	ne: vi.fn(),
	sql: vi.fn(),
}))

beforeEach(() => {
	vi.clearAllMocks()
})

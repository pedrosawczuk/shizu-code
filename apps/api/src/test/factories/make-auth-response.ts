type MakeAuthResponseOptions = {
	status?: number
	headers?: Record<string, string>
}

export function makeAuthResponse(
	body: Record<string, string | number | boolean | object | null>,
	{ status = 200, headers }: MakeAuthResponseOptions = {},
) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json', ...headers },
	})
}

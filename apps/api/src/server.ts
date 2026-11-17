import { env } from '@app/env'
import { app } from './app'

const SHUTDOWN_TIMEOUT_MS = 25_000

async function shutdown(signal: NodeJS.Signals) {
  app.log.info({ signal }, 'Shutting down')

  const forceExitTimer = setTimeout(() => {
    app.log.error('Shutdown timed out, forcing exit')
    process.exit(1)
  }, SHUTDOWN_TIMEOUT_MS)
  forceExitTimer.unref()

  await app.close()
  process.exit(0)
}

for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.once(signal, () => {
    shutdown(signal).catch((error: Error) => {
      app.log.error(error)
      process.exit(1)
    })
  })
}

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(
      `🦎 Shizu Code API running at http://localhost:${env.PORT} [${env.NODE_ENV}]`,
    )
  })
  .catch((error) => {
    app.log.error(error)
    process.exit(1)
  })

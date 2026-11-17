import { env } from '@app/env'
import { app } from './app'

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

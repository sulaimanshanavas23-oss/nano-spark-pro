import { handleApi } from './api.js'

/**
 * Mounts the certificate API inside the Vite dev/preview server so the
 * frontend can talk to the exact same handlers that Vercel runs in production.
 */
export function nanoSparkCertificateApi() {
  const middleware = (req, res, next) => {
    if (!req.url || !req.url.startsWith('/api/')) {
      next()
      return
    }
    Promise.resolve(handleApi(req, res)).catch((error) => {
      console.error('[nanospark-api:dev]', error)
      if (!res.headersSent) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }))
      }
    })
  }

  return {
    name: 'nanospark-certificate-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

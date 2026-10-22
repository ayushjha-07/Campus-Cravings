import { apiHandler } from './api.js';

/**
 * Vite plugin that mounts the Campus Cravings authentication & OTP API middleware
 * directly onto Vite's internal Connect server during development & preview.
 */
export function campusCravingsApiPlugin() {
  return {
    name: 'campus-cravings-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          await apiHandler(req, res, next);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          await apiHandler(req, res, next);
        } else {
          next();
        }
      });
    }
  };
}

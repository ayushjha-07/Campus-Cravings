import http from 'http';
import { CONFIG } from './config.js';
import { apiHandler } from './api.js';

const server = http.createServer(async (req, res) => {
  await apiHandler(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  });
});

const PORT = CONFIG.PORT || 3001;
server.listen(PORT, () => {
  console.log(`[Campus Cravings API] Server running on http://localhost:${PORT}`);
  console.log(`  - Health Check: http://localhost:${PORT}/api/health`);
});

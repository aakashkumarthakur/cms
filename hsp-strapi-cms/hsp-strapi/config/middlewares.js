// config/middlewares.js
// Strapi v5 — Middleware configuration including CORS for Hotel Sujata Palace

'use strict';

module.exports = [
  'strapi::logger',
  'strapi::errors',

  // ─── Security middleware ───────────────────────────────────────────────────
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // Add your production domain:
            'hotelsujatapalace.com.np',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'hotelsujatapalace.com.np',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  // ─── CORS — allow your hotel frontend ─────────────────────────────────────
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',       // Local dev (React/Next.js)
        'http://localhost:5500',       // VS Code Live Server
        'http://127.0.0.1:5500',
        'http://localhost:8080',
        'https://hotelsujatapalace.com.np',   // Production domain
        'https://www.hotelsujatapalace.com.np',
      ],
    },
  },

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

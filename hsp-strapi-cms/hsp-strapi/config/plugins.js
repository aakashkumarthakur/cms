// config/plugins.js
// Strapi v5 — Plugin configuration

'use strict';

module.exports = ({ env }) => ({
  // ─── Upload (Media Library) ───────────────────────────────────────────────
  // Default: local storage. For production, use AWS S3 or Cloudinary.
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },

  // ─── Users & Permissions ──────────────────────────────────────────────────
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },

  // ─── i18n (Internationalization) ─────────────────────────────────────────
  // Useful if you want content in Nepali + English
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'ne'], // 'ne' = Nepali
    },
  },
});

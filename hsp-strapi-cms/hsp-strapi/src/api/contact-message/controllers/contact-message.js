// src/api/contact-message/controllers/contact-message.js
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async create(ctx) {
    // Capture IP address from the request
    const ip = ctx.request.ip || ctx.request.headers['x-forwarded-for'] || 'unknown';

    // Inject IP into the request body
    if (ctx.request.body && ctx.request.body.data) {
      ctx.request.body.data.ipAddress = ip;
    }

    const response = await super.create(ctx);

    const { name, email, subject } = ctx.request.body.data || {};
    strapi.log.info(`[HSP] New Contact Message from ${name} (${email}) — Subject: ${subject}`);

    return response;
  },
}));

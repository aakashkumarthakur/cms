// src/api/booking/controllers/booking.js
// Custom controller: sends a confirmation log on new booking
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({
  // Override the create method to add post-booking logic
  async create(ctx) {
    // Call the default create
    const response = await super.create(ctx);

    // Log new booking to console (replace with email/notification later)
    const { guestName, email, checkIn, checkOut, roomType } = ctx.request.body.data || {};
    strapi.log.info(
      `[HSP] New Booking: ${guestName} (${email}) — ${roomType} | ${checkIn} → ${checkOut}`
    );

    // You can add email sending here using @strapi/provider-email-sendgrid
    // or nodemailer. See README for instructions.

    return response;
  },
}));

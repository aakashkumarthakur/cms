/**
 * Hotel Sujata Palace — Strapi v5 API Helper
 * Drop this file next to index.html and include it as:
 * <script src="strapi-api.js"></script>
 *
 * Then call the functions from your existing HTML/JS code.
 */

// ── Configuration ──────────────────────────────────────────────────────────
const HSP_API = {
  // Change this to your production Strapi URL when live
  BASE_URL: 'http://localhost:1337/api',

  // Helper: build full URL
  url(path) {
    return `${this.BASE_URL}${path}`;
  },

  // Helper: parse Strapi v5 response
  parse(json) {
    if (Array.isArray(json.data)) {
      return json.data.map(item => ({ id: item.id, ...item.attributes }));
    }
    if (json.data) {
      return { id: json.data.id, ...json.data.attributes };
    }
    return json;
  },

  // Helper: get image URL from Strapi media object
  imageUrl(media, size = 'medium') {
    if (!media || !media.data) return null;
    const fmt = media.data.attributes.formats;
    if (fmt && fmt[size]) return `http://localhost:1337${fmt[size].url}`;
    return `http://localhost:1337${media.data.attributes.url}`;
  },
};

// ── Rooms ───────────────────────────────────────────────────────────────────

/**
 * Get all published rooms
 * @returns {Promise<Array>} rooms
 */
async function fetchRooms() {
  try {
    const res = await fetch(
      HSP_API.url('/rooms?populate=*&sort=sortOrder:asc&filters[isAvailable][$eq]=true')
    );
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch rooms', err);
    return [];
  }
}

/**
 * Get featured rooms for homepage
 * @returns {Promise<Array>} featured rooms
 */
async function fetchFeaturedRooms() {
  try {
    const res = await fetch(
      HSP_API.url('/rooms?populate=*&filters[isFeatured][$eq]=true&sort=sortOrder:asc')
    );
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch featured rooms', err);
    return [];
  }
}

// ── Bookings ─────────────────────────────────────────────────────────────────

/**
 * Submit a room booking request
 * @param {Object} data - booking data from the form
 * @returns {Promise<Object>} created booking
 */
async function submitBooking(data) {
  try {
    const res = await fetch(HSP_API.url('/bookings'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const errJson = await res.json();
      throw new Error(errJson.error?.message || 'Booking failed');
    }

    return await res.json();
  } catch (err) {
    console.error('HSP: Booking submission failed', err);
    throw err;
  }
}

// ── Gallery ──────────────────────────────────────────────────────────────────

/**
 * Get gallery images, optionally filtered by category
 * @param {string} [category] - 'Rooms' | 'Restaurant' | 'Banquet Hall' | etc.
 * @returns {Promise<Array>} gallery items
 */
async function fetchGallery(category = null) {
  try {
    let url = HSP_API.url('/galleries?populate=*&sort=sortOrder:asc');
    if (category) {
      url += `&filters[category][$eq]=${encodeURIComponent(category)}`;
    }
    const res = await fetch(url);
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch gallery', err);
    return [];
  }
}

// ── Testimonials ─────────────────────────────────────────────────────────────

/**
 * Get published guest reviews (featured ones first)
 * @returns {Promise<Array>} testimonials
 */
async function fetchTestimonials() {
  try {
    const res = await fetch(
      HSP_API.url('/testimonials?populate=*&sort=isFeatured:desc,createdAt:desc')
    );
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch testimonials', err);
    return [];
  }
}

// ── Amenities ────────────────────────────────────────────────────────────────

/**
 * Get all amenities
 * @returns {Promise<Array>} amenities
 */
async function fetchAmenities() {
  try {
    const res = await fetch(
      HSP_API.url('/amenities?sort=sortOrder:asc')
    );
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch amenities', err);
    return [];
  }
}

// ── Careers ──────────────────────────────────────────────────────────────────

/**
 * Get active job postings
 * @returns {Promise<Array>} career listings
 */
async function fetchCareers() {
  try {
    const res = await fetch(
      HSP_API.url('/careers?filters[isActive][$eq]=true&sort=createdAt:desc')
    );
    const json = await res.json();
    return HSP_API.parse(json);
  } catch (err) {
    console.error('HSP: Failed to fetch careers', err);
    return [];
  }
}

// ── Contact Form ──────────────────────────────────────────────────────────────

/**
 * Submit the contact form
 * @param {Object} data - { name, email, phone, subject, message }
 * @returns {Promise<Object>} server response
 */
async function submitContactForm(data) {
  try {
    const res = await fetch(HSP_API.url('/contact-messages'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const errJson = await res.json();
      throw new Error(errJson.error?.message || 'Message failed to send');
    }

    return await res.json();
  } catch (err) {
    console.error('HSP: Contact form submission failed', err);
    throw err;
  }
}

// ── Integration Example ───────────────────────────────────────────────────────
// Replace your existing submitForm() function in index.html with this:
//
// async function submitForm() {
//   const name    = document.getElementById('fname').value.trim();
//   const email   = document.getElementById('femail').value.trim();
//   const phone   = document.getElementById('fphone').value.trim();
//   const subject = document.getElementById('fsubject').value;
//   const message = document.getElementById('fmsg').value.trim();
//
//   if (!name || !email) {
//     alert('Please fill in your name and email.');
//     return;
//   }
//
//   try {
//     await submitContactForm({ name, email, phone, subject, message });
//     const msg = document.getElementById('formMsg');
//     msg.style.display = 'block';
//     msg.textContent = '✓ Thank you, ' + name + '! Your message has been sent.';
//     ['fname','femail','fphone','fsubject','fmsg'].forEach(id => {
//       const el = document.getElementById(id);
//       if (el) el.value = '';
//     });
//   } catch (err) {
//     alert('Failed to send message. Please try again or call us directly.');
//   }
// }

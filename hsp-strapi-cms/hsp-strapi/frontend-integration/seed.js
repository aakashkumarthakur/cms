/**
 * Hotel Sujata Palace — Strapi v5 Seed Data
 *
 * Run AFTER starting Strapi and setting up admin:
 *   node frontend-integration/seed.js
 *
 * Set your API token in .env as: STRAPI_API_TOKEN=yourtoken
 * Generate a token: Admin → Settings → API Tokens → Create
 */

const BASE_URL = 'http://localhost:1337/api';
const TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_API_TOKEN_HERE';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

async function post(path, data) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (res.ok) {
    console.log(`✅ Created ${path}: ${JSON.stringify(data).slice(0, 60)}...`);
  } else {
    console.error(`❌ Failed ${path}:`, json.error?.message);
  }
  return json;
}

async function seed() {
  console.log('\n🏨 Seeding Hotel Sujata Palace data...\n');

  // ── Amenities ────────────────────────────────────────────────────────────
  const amenities = [
    { name: 'Free Wi-Fi',         category: 'Connectivity',     isHighlighted: true,  sortOrder: 1 },
    { name: 'Air Conditioning',   category: 'Room',             isHighlighted: true,  sortOrder: 2 },
    { name: 'Multi-Cuisine Restaurant', category: 'Food & Beverage', isHighlighted: true, sortOrder: 3 },
    { name: 'Banquet Hall',       category: 'Events',           isHighlighted: true,  sortOrder: 4 },
    { name: 'Free Parking',       category: 'Transportation',   isHighlighted: true,  sortOrder: 5 },
    { name: '24-Hour Room Service', category: 'Room',           isHighlighted: true,  sortOrder: 6 },
    { name: 'Hot Water',          category: 'Room',             isHighlighted: false, sortOrder: 7 },
    { name: 'LCD TV',             category: 'Room',             isHighlighted: false, sortOrder: 8 },
    { name: 'Power Backup',       category: 'General',          isHighlighted: false, sortOrder: 9 },
    { name: 'CCTV Security',      category: 'General',          isHighlighted: false, sortOrder: 10 },
  ];
  for (const a of amenities) await post('/amenities', a);

  // ── Rooms ─────────────────────────────────────────────────────────────────
  const rooms = [
    {
      name: 'Standard Room',
      roomType: 'Standard',
      shortDescription: 'Comfortable and clean rooms perfect for solo travelers and couples.',
      description: 'Our Standard Rooms offer a cozy retreat with all essential amenities. Each room is well-furnished with a comfortable bed, modern bathroom, and a pleasant ambiance.',
      pricePerNight: 1500,
      currency: 'NPR',
      maxGuests: 2,
      bedType: 'Double',
      bedCount: 1,
      roomSize: '20 sq.m',
      isAvailable: true,
      isFeatured: false,
      amenities: ['AC', 'Free WiFi', 'TV', 'Hot Water', 'Room Service'],
      sortOrder: 1,
    },
    {
      name: 'Deluxe Room',
      roomType: 'Deluxe',
      shortDescription: 'Spacious deluxe rooms with premium furnishings and city views.',
      description: 'Experience elevated comfort in our Deluxe Rooms, featuring premium bedding, a stylish bathroom, and modern décor. Ideal for business travelers and couples seeking a touch of luxury.',
      pricePerNight: 2500,
      currency: 'NPR',
      maxGuests: 2,
      bedType: 'King',
      bedCount: 1,
      roomSize: '28 sq.m',
      isAvailable: true,
      isFeatured: true,
      amenities: ['AC', 'Free WiFi', 'Smart TV', 'Hot Water', 'Room Service', 'Mini Fridge', 'Safety Locker'],
      sortOrder: 2,
    },
    {
      name: 'Super Deluxe Room',
      roomType: 'Super Deluxe',
      shortDescription: 'Premium rooms with enhanced space and exclusive amenities.',
      description: 'Our Super Deluxe Rooms offer superior space and premium amenities for a truly memorable stay. Featuring high-quality furnishings, a luxurious bathroom and stunning views.',
      pricePerNight: 3500,
      currency: 'NPR',
      maxGuests: 3,
      bedType: 'King',
      bedCount: 1,
      roomSize: '35 sq.m',
      isAvailable: true,
      isFeatured: true,
      amenities: ['AC', 'Free WiFi', 'Smart TV', 'Hot Water', 'Room Service', 'Mini Bar', 'Safety Locker', 'Balcony'],
      sortOrder: 3,
    },
    {
      name: 'Family Room',
      roomType: 'Family Room',
      shortDescription: 'Spacious family rooms accommodating up to 5 guests comfortably.',
      description: 'Our Family Rooms are designed for families traveling together, with ample space, multiple beds, and a warm, welcoming atmosphere. Perfect for family vacations and group stays.',
      pricePerNight: 4500,
      currency: 'NPR',
      maxGuests: 5,
      bedType: 'King',
      bedCount: 2,
      roomSize: '45 sq.m',
      isAvailable: true,
      isFeatured: true,
      amenities: ['AC', 'Free WiFi', 'Smart TV', 'Hot Water', 'Room Service', 'Extra Beds Available'],
      sortOrder: 4,
    },
  ];
  for (const r of rooms) await post('/rooms', r);

  // ── Testimonials ──────────────────────────────────────────────────────────
  const testimonials = [
    {
      guestName: 'Ramesh Sharma',
      location: 'Kathmandu, Nepal',
      review: 'Excellent stay at Hotel Sujata Palace! The rooms were very clean and comfortable. The staff was very helpful and friendly. Will definitely visit again on my next trip to Malangwa.',
      rating: 5,
      roomType: 'Deluxe Room',
      source: 'Google',
      isFeatured: true,
    },
    {
      guestName: 'Priya Singh',
      location: 'Delhi, India',
      review: 'We stayed here for a family function. The banquet hall was beautiful and the food was delicious. Great hospitality. Highly recommended for events and weddings in Sarlahi.',
      rating: 5,
      roomType: 'Family Room',
      source: 'Direct',
      isFeatured: true,
    },
    {
      guestName: 'Suresh Thakur',
      location: 'Birgunj, Nepal',
      review: 'Very good hotel in Malangwa. Clean rooms, good food, and excellent service. The price is reasonable compared to the quality. Perfect for business stays.',
      rating: 4,
      roomType: 'Super Deluxe Room',
      source: 'Google',
      isFeatured: true,
    },
  ];
  for (const t of testimonials) await post('/testimonials', t);

  // ── Careers ───────────────────────────────────────────────────────────────
  const careers = [
    {
      jobTitle: 'Front Desk Receptionist',
      department: 'Front Office',
      jobType: 'Full-time',
      description: 'We are looking for a friendly and professional Front Desk Receptionist to welcome guests and manage check-ins/check-outs at Hotel Sujata Palace.',
      requirements: 'Minimum SLC/SEE passed. Good communication skills in Nepali and Hindi. Experience preferred but freshers may apply.',
      salaryRange: 'NPR 12,000 - 18,000',
      vacancies: 2,
      isActive: true,
      contactEmail: 'hotelsujatapalace@gmail.com',
      experienceRequired: '0-2 years',
    },
    {
      jobTitle: 'Cook / Chef',
      department: 'Kitchen',
      jobType: 'Full-time',
      description: 'Experienced cook needed for our multi-cuisine restaurant. Must be able to prepare Nepali, Indian, and Chinese cuisine.',
      requirements: 'Minimum 2 years cooking experience in a hotel or restaurant. Knowledge of multi-cuisine preferred.',
      salaryRange: 'NPR 18,000 - 28,000',
      vacancies: 1,
      isActive: true,
      contactEmail: 'hotelsujatapalace@gmail.com',
      experienceRequired: '2+ years',
    },
    {
      jobTitle: 'Housekeeping Staff',
      department: 'Housekeeping',
      jobType: 'Full-time',
      description: 'We need dedicated housekeeping staff to maintain cleanliness and hygiene standards across our hotel rooms and public areas.',
      requirements: 'Physically fit and hardworking. No formal education required. Training will be provided.',
      salaryRange: 'NPR 10,000 - 15,000',
      vacancies: 3,
      isActive: true,
      contactEmail: 'hotelsujatapalace@gmail.com',
      experienceRequired: '0-1 year',
    },
  ];
  for (const c of careers) await post('/careers', c);

  console.log('\n✨ Seeding complete! Visit http://localhost:1337/admin to view your data.\n');
}

seed().catch(console.error);

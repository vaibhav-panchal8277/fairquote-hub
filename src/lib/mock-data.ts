// ============================================
// FAIRQUOTE HUB — MOCK SEED DATA
// Realistic data for MVP demonstration
// ============================================

import { User, Provider, Job, Quote, Review, PriceIndex, Flag } from './types';

// ============================================
// USERS
// ============================================
export const MOCK_USERS: User[] = [
  // Seekers
  { id: 'u1', role: 'seeker', email: 'sarah.johnson@email.com', name: 'Sarah Johnson', phone: '555-0101', zip: '10001', createdAt: '2025-01-15T10:00:00Z', status: 'active' },
  { id: 'u2', role: 'seeker', email: 'mike.chen@email.com', name: 'Mike Chen', phone: '555-0102', zip: '10001', createdAt: '2025-02-20T10:00:00Z', status: 'active' },
  { id: 'u3', role: 'seeker', email: 'emily.davis@email.com', name: 'Emily Davis', phone: '555-0103', zip: '90210', createdAt: '2025-03-10T10:00:00Z', status: 'active' },
  { id: 'u4', role: 'seeker', email: 'james.wilson@email.com', name: 'James Wilson', phone: '555-0104', zip: '60601', createdAt: '2025-04-05T10:00:00Z', status: 'active' },
  { id: 'u5', role: 'seeker', email: 'lisa.garcia@email.com', name: 'Lisa Garcia', phone: '555-0105', zip: '77001', createdAt: '2025-05-12T10:00:00Z', status: 'active' },
  { id: 'u6', role: 'seeker', email: 'david.martinez@email.com', name: 'David Martinez', phone: '555-0106', zip: '33101', createdAt: '2025-06-08T10:00:00Z', status: 'active' },
  { id: 'u7', role: 'seeker', email: 'anna.thompson@email.com', name: 'Anna Thompson', phone: '555-0107', zip: '10001', createdAt: '2025-07-01T10:00:00Z', status: 'active' },
  { id: 'u8', role: 'seeker', email: 'robert.brown@email.com', name: 'Robert Brown', phone: '555-0108', zip: '90210', createdAt: '2025-08-15T10:00:00Z', status: 'active' },

  // Provider users
  { id: 'u10', role: 'provider', email: 'joe@aceplumbing.com', name: 'Joe Patterson', phone: '555-0201', zip: '10001', createdAt: '2025-01-10T10:00:00Z', status: 'active' },
  { id: 'u11', role: 'provider', email: 'maria@sparkelectric.com', name: 'Maria Rossi', phone: '555-0202', zip: '10001', createdAt: '2025-01-20T10:00:00Z', status: 'active' },
  { id: 'u12', role: 'provider', email: 'tom@coolairhvac.com', name: 'Tom Henderson', phone: '555-0203', zip: '90210', createdAt: '2025-02-05T10:00:00Z', status: 'active' },
  { id: 'u13', role: 'provider', email: 'sam@rooftopking.com', name: 'Sam Nakamura', phone: '555-0204', zip: '60601', createdAt: '2025-02-15T10:00:00Z', status: 'active' },
  { id: 'u14', role: 'provider', email: 'linda@perfectpaint.com', name: 'Linda Crawford', phone: '555-0205', zip: '77001', createdAt: '2025-03-01T10:00:00Z', status: 'active' },
  { id: 'u15', role: 'provider', email: 'carlos@greenthumb.com', name: 'Carlos Mendez', phone: '555-0206', zip: '33101', createdAt: '2025-03-10T10:00:00Z', status: 'active' },
  { id: 'u16', role: 'provider', email: 'kevin@cleanpro.com', name: 'Kevin O\'Brien', phone: '555-0207', zip: '10001', createdAt: '2025-03-20T10:00:00Z', status: 'active' },
  { id: 'u17', role: 'provider', email: 'diane@pestfree.com', name: 'Diane Chang', phone: '555-0208', zip: '90210', createdAt: '2025-04-01T10:00:00Z', status: 'active' },
  { id: 'u18', role: 'provider', email: 'alex@floorcraft.com', name: 'Alex Petrov', phone: '555-0209', zip: '60601', createdAt: '2025-04-15T10:00:00Z', status: 'active' },
  { id: 'u19', role: 'provider', email: 'rachel@fixitfast.com', name: 'Rachel Kim', phone: '555-0210', zip: '77001', createdAt: '2025-05-01T10:00:00Z', status: 'active' },
  { id: 'u20', role: 'provider', email: 'brian@budgetplumb.com', name: 'Brian Foster', phone: '555-0211', zip: '10001', createdAt: '2025-05-10T10:00:00Z', status: 'active' },
  { id: 'u21', role: 'provider', email: 'nancy@eliteelectric.com', name: 'Nancy Wright', phone: '555-0212', zip: '90210', createdAt: '2025-05-20T10:00:00Z', status: 'active' },
  { id: 'u22', role: 'provider', email: 'unverified@cheapwork.com', name: 'Rick Unlicensed', phone: '555-0213', zip: '10001', createdAt: '2025-06-01T10:00:00Z', status: 'active' },

  // Admins
  { id: 'u99', role: 'admin', email: 'admin@fairquotehub.com', name: 'Admin User', phone: '555-0999', zip: '10001', createdAt: '2025-01-01T10:00:00Z', status: 'active' },
];

// ============================================
// PROVIDERS
// ============================================
export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1', userId: 'u10', businessName: 'Ace Plumbing Solutions',
    licenseNumber: 'PLB-2024-78901', insured: true, serviceRadiusKm: 30,
    serviceCategories: ['plumbing'],
    verificationStatus: 'verified', avgRating: 4.8, totalReviews: 47,
    responseTimeMin: 25,
    description: 'Family-owned plumbing business serving NYC for 15 years. Specialized in residential repairs, water heater installation, and emergency services.',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'p2', userId: 'u11', businessName: 'Spark Electric Co.',
    licenseNumber: 'ELC-2024-45612', insured: true, serviceRadiusKm: 25,
    serviceCategories: ['electrical'],
    verificationStatus: 'verified', avgRating: 4.9, totalReviews: 62,
    responseTimeMin: 18,
    description: 'Licensed master electrician. Panel upgrades, rewiring, EV charger installation, and smart home wiring.',
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: 'p3', userId: 'u12', businessName: 'CoolAir HVAC',
    licenseNumber: 'HVC-2024-33210', insured: true, serviceRadiusKm: 40,
    serviceCategories: ['hvac'],
    verificationStatus: 'verified', avgRating: 4.6, totalReviews: 35,
    responseTimeMin: 35,
    description: 'Full-service HVAC contractor. Installation, maintenance, and repair of all major brands.',
    createdAt: '2025-02-05T10:00:00Z',
  },
  {
    id: 'p4', userId: 'u13', businessName: 'Rooftop King',
    licenseNumber: 'ROF-2024-12345', insured: true, serviceRadiusKm: 50,
    serviceCategories: ['roofing'],
    verificationStatus: 'verified', avgRating: 4.7, totalReviews: 28,
    responseTimeMin: 45,
    description: 'Commercial and residential roofing experts. Free inspections, storm damage repair, full replacements.',
    createdAt: '2025-02-15T10:00:00Z',
  },
  {
    id: 'p5', userId: 'u14', businessName: 'Perfect Paint Studio',
    licenseNumber: 'PNT-2024-56789', insured: true, serviceRadiusKm: 20,
    serviceCategories: ['painting'],
    verificationStatus: 'verified', avgRating: 4.5, totalReviews: 41,
    responseTimeMin: 30,
    description: 'Interior and exterior painting specialists. Color consultation included. Eco-friendly paints available.',
    createdAt: '2025-03-01T10:00:00Z',
  },
  {
    id: 'p6', userId: 'u15', businessName: 'Green Thumb Landscaping',
    licenseNumber: 'LND-2024-98765', insured: true, serviceRadiusKm: 35,
    serviceCategories: ['landscaping'],
    verificationStatus: 'verified', avgRating: 4.8, totalReviews: 53,
    responseTimeMin: 20,
    description: 'Complete landscaping services. Garden design, lawn maintenance, tree trimming, irrigation systems.',
    createdAt: '2025-03-10T10:00:00Z',
  },
  {
    id: 'p7', userId: 'u16', businessName: 'CleanPro Services',
    licenseNumber: 'CLN-2024-11111', insured: true, serviceRadiusKm: 15,
    serviceCategories: ['cleaning'],
    verificationStatus: 'verified', avgRating: 4.4, totalReviews: 89,
    responseTimeMin: 15,
    description: 'Professional cleaning for homes and offices. Deep cleaning, move-in/out, post-construction cleanup.',
    createdAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'p8', userId: 'u17', businessName: 'PestFree Solutions',
    licenseNumber: 'PST-2024-22222', insured: true, serviceRadiusKm: 45,
    serviceCategories: ['pest-control'],
    verificationStatus: 'verified', avgRating: 4.7, totalReviews: 31,
    responseTimeMin: 40,
    description: 'Licensed pest control experts. Termite treatment, rodent removal, bed bug elimination. Eco-safe methods.',
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    id: 'p9', userId: 'u18', businessName: 'FloorCraft Masters',
    licenseNumber: 'FLR-2024-33333', insured: true, serviceRadiusKm: 30,
    serviceCategories: ['flooring'],
    verificationStatus: 'verified', avgRating: 4.9, totalReviews: 44,
    responseTimeMin: 22,
    description: 'Hardwood, tile, laminate, and luxury vinyl installation. Refinishing and repair. 5-year workmanship warranty.',
    createdAt: '2025-04-15T10:00:00Z',
  },
  {
    id: 'p10', userId: 'u19', businessName: 'FixIt Fast Appliances',
    licenseNumber: 'APL-2024-44444', insured: true, serviceRadiusKm: 25,
    serviceCategories: ['appliance-repair'],
    verificationStatus: 'verified', avgRating: 4.6, totalReviews: 56,
    responseTimeMin: 28,
    description: 'All major appliance brands. Same-day service available. Factory-trained technicians.',
    createdAt: '2025-05-01T10:00:00Z',
  },
  {
    id: 'p11', userId: 'u20', businessName: 'Budget Plumbing Plus',
    licenseNumber: 'PLB-2024-55555', insured: true, serviceRadiusKm: 20,
    serviceCategories: ['plumbing'],
    verificationStatus: 'verified', avgRating: 4.2, totalReviews: 23,
    responseTimeMin: 55,
    description: 'Affordable plumbing solutions. Drain cleaning, faucet repair, toilet installation. No trip charge!',
    createdAt: '2025-05-10T10:00:00Z',
  },
  {
    id: 'p12', userId: 'u21', businessName: 'Elite Electrical Services',
    licenseNumber: 'ELC-2024-66666', insured: true, serviceRadiusKm: 35,
    serviceCategories: ['electrical'],
    verificationStatus: 'pending', avgRating: 0, totalReviews: 0,
    responseTimeMin: 0,
    description: 'New to FairQuote! Licensed electrician with 10 years experience. Residential and commercial.',
    createdAt: '2025-05-20T10:00:00Z',
  },
  {
    id: 'p13', userId: 'u22', businessName: 'Cheap Work LLC',
    licenseNumber: '', insured: false, serviceRadiusKm: 50,
    serviceCategories: ['plumbing', 'electrical', 'painting'],
    verificationStatus: 'denied', avgRating: 2.1, totalReviews: 5,
    responseTimeMin: 120,
    description: 'Jack of all trades. Cash preferred.',
    createdAt: '2025-06-01T10:00:00Z',
  },
];

// ============================================
// JOBS
// ============================================
export const MOCK_JOBS: Job[] = [
  {
    id: 'j1', seekerId: 'u1', categoryId: 'plumbing', title: 'Kitchen faucet replacement',
    description: 'Need to replace old kitchen faucet with a new Moen single-handle pulldown. Existing plumbing is copper. Under-sink access is clear.',
    urgency: 'medium', status: 'completed', zip: '10001',
    createdAt: '2025-08-01T10:00:00Z', updatedAt: '2025-08-15T10:00:00Z',
  },
  {
    id: 'j2', seekerId: 'u2', categoryId: 'electrical', title: 'Panel upgrade 100A to 200A',
    description: 'Need electrical panel upgraded from 100 amp to 200 amp service. House is a 1960s colonial. Will need permit.',
    urgency: 'low', status: 'quoted', zip: '10001',
    createdAt: '2025-09-10T10:00:00Z', updatedAt: '2025-09-12T10:00:00Z',
  },
  {
    id: 'j3', seekerId: 'u3', categoryId: 'hvac', title: 'AC not cooling properly',
    description: 'Central AC unit is blowing warm air. Unit is 8 years old, Carrier brand. Refrigerant was last topped off 2 years ago.',
    urgency: 'high', status: 'accepted', zip: '90210',
    createdAt: '2025-10-05T10:00:00Z', updatedAt: '2025-10-06T10:00:00Z',
  },
  {
    id: 'j4', seekerId: 'u4', categoryId: 'roofing', title: 'Storm damage inspection & repair',
    description: 'Recent hailstorm caused damage to asphalt shingle roof. Need inspection and repair estimate. Some shingles are visibly damaged from ground.',
    urgency: 'high', status: 'posted', zip: '60601',
    createdAt: '2025-10-20T10:00:00Z', updatedAt: '2025-10-20T10:00:00Z',
  },
  {
    id: 'j5', seekerId: 'u5', categoryId: 'painting', title: 'Interior painting - 3 bedrooms',
    description: 'Need 3 bedrooms painted. Walls are currently beige, want to go with light gray. Ceilings are 9ft. Rooms are roughly 12x14 each. Trim painting included.',
    urgency: 'low', status: 'quoted', zip: '77001',
    createdAt: '2025-11-01T10:00:00Z', updatedAt: '2025-11-05T10:00:00Z',
  },
  {
    id: 'j6', seekerId: 'u6', categoryId: 'landscaping', title: 'Front yard redesign',
    description: 'Want to redesign front yard. Currently all grass, want to add native plants, mulch beds, and a stone walkway. Yard is approximately 1500 sq ft.',
    urgency: 'low', status: 'posted', zip: '33101',
    createdAt: '2025-11-10T10:00:00Z', updatedAt: '2025-11-10T10:00:00Z',
  },
  {
    id: 'j7', seekerId: 'u7', categoryId: 'cleaning', title: 'Move-out deep clean',
    description: 'Need deep cleaning for 2BR apartment before move-out. Kitchen appliances, bathroom tiles, all floors, windows. ~900 sq ft.',
    urgency: 'medium', status: 'completed', zip: '10001',
    createdAt: '2025-09-15T10:00:00Z', updatedAt: '2025-09-25T10:00:00Z',
  },
  {
    id: 'j8', seekerId: 'u8', categoryId: 'pest-control', title: 'Termite inspection',
    description: 'Annual termite inspection needed for real estate transaction. 2-story home, approx 2200 sq ft. Crawl space accessible.',
    urgency: 'medium', status: 'accepted', zip: '90210',
    createdAt: '2025-10-01T10:00:00Z', updatedAt: '2025-10-03T10:00:00Z',
  },
  {
    id: 'j9', seekerId: 'u1', categoryId: 'flooring', title: 'Hardwood floor refinishing',
    description: 'Need to refinish red oak hardwood floors in living room and dining room. Approximately 450 sq ft total. Some scratches and wear, no water damage.',
    urgency: 'low', status: 'posted', zip: '10001',
    createdAt: '2025-11-15T10:00:00Z', updatedAt: '2025-11-15T10:00:00Z',
  },
  {
    id: 'j10', seekerId: 'u2', categoryId: 'appliance-repair', title: 'Dishwasher not draining',
    description: 'Bosch dishwasher model SHPM88Z75N is not draining. Water sits at the bottom after cycle completes. About 3 years old, still under extended warranty.',
    urgency: 'medium', status: 'quoted', zip: '10001',
    createdAt: '2025-11-18T10:00:00Z', updatedAt: '2025-11-20T10:00:00Z',
  },
  {
    id: 'j11', seekerId: 'u3', categoryId: 'plumbing', title: 'Bathroom pipe leak emergency',
    description: 'Active leak under bathroom sink. Water is dripping into the cabinet below. Need immediate repair to prevent water damage.',
    urgency: 'emergency', status: 'in_progress', zip: '90210',
    createdAt: '2025-11-20T08:00:00Z', updatedAt: '2025-11-20T09:00:00Z',
  },
  {
    id: 'j12', seekerId: 'u4', categoryId: 'electrical', title: 'Outdoor lighting installation',
    description: 'Want to install landscape lighting along front walkway and accent lighting on house facade. About 12 light fixtures total. Have power source near garage.',
    urgency: 'low', status: 'posted', zip: '60601',
    createdAt: '2025-11-19T10:00:00Z', updatedAt: '2025-11-19T10:00:00Z',
  },
];

// ============================================
// QUOTES
// ============================================
export const MOCK_QUOTES: Quote[] = [
  // Job j1 - Kitchen faucet (completed, 2 quotes)
  { id: 'q1', jobId: 'j1', providerId: 'p1', laborCost: 150, partsCost: 45, total: 195, timelineDays: 1, warrantyMonths: 12, fairnessScore: 92, status: 'accepted', createdAt: '2025-08-02T10:00:00Z', notes: 'Includes disposal of old faucet and testing.' },
  { id: 'q2', jobId: 'j1', providerId: 'p11', laborCost: 120, partsCost: 45, total: 165, timelineDays: 2, warrantyMonths: 6, fairnessScore: 88, status: 'declined', createdAt: '2025-08-03T10:00:00Z', notes: 'Budget-friendly option. Parts not included if different model needed.' },

  // Job j2 - Panel upgrade (quoted, 3 quotes)
  { id: 'q3', jobId: 'j2', providerId: 'p2', laborCost: 1800, partsCost: 600, total: 2400, timelineDays: 2, warrantyMonths: 24, fairnessScore: 85, status: 'submitted', createdAt: '2025-09-11T10:00:00Z', notes: 'Includes permit filing, inspection coordination, and all materials. Licensed master electrician on-site.' },
  { id: 'q4', jobId: 'j2', providerId: 'p12', laborCost: 1500, partsCost: 550, total: 2050, timelineDays: 3, warrantyMonths: 12, fairnessScore: 78, status: 'submitted', createdAt: '2025-09-12T10:00:00Z', notes: 'Competitive pricing for panel upgrade. Will schedule around your availability.' },
  { id: 'q5', jobId: 'j2', providerId: 'p13', laborCost: 800, partsCost: 400, total: 1200, timelineDays: 1, warrantyMonths: 0, fairnessScore: 32, status: 'submitted', createdAt: '2025-09-12T14:00:00Z', notes: 'Cash only. Quick turnaround.' },

  // Job j3 - AC repair (accepted)
  { id: 'q6', jobId: 'j3', providerId: 'p3', laborCost: 350, partsCost: 200, total: 550, timelineDays: 1, warrantyMonths: 6, fairnessScore: 90, status: 'accepted', createdAt: '2025-10-05T14:00:00Z', notes: 'Includes diagnostic, refrigerant recharge if needed, and full system check.' },

  // Job j5 - Painting (quoted, 2 quotes)
  { id: 'q7', jobId: 'j5', providerId: 'p5', laborCost: 1200, partsCost: 350, total: 1550, timelineDays: 4, warrantyMonths: 12, fairnessScore: 87, status: 'submitted', createdAt: '2025-11-02T10:00:00Z', notes: 'Premium Sherwin-Williams paint. Includes prep, priming, 2 coats, and trim. Furniture moving included.' },
  { id: 'q8', jobId: 'j5', providerId: 'p13', laborCost: 600, partsCost: 150, total: 750, timelineDays: 2, warrantyMonths: 0, fairnessScore: 41, status: 'submitted', createdAt: '2025-11-03T10:00:00Z', notes: 'Basic paint job. Cash discount available.' },

  // Job j7 - Cleaning (completed)
  { id: 'q9', jobId: 'j7', providerId: 'p7', laborCost: 280, partsCost: 40, total: 320, timelineDays: 1, warrantyMonths: 0, fairnessScore: 94, status: 'accepted', createdAt: '2025-09-16T10:00:00Z', notes: 'Full deep clean package. All supplies included. Satisfaction guaranteed.' },

  // Job j8 - Termite inspection (accepted)
  { id: 'q10', jobId: 'j8', providerId: 'p8', laborCost: 175, partsCost: 0, total: 175, timelineDays: 1, warrantyMonths: 0, fairnessScore: 91, status: 'accepted', createdAt: '2025-10-02T10:00:00Z', notes: 'Comprehensive Wood Destroying Insect Report (WDIR) for real estate. Same-week scheduling available.' },

  // Job j10 - Dishwasher (quoted, 2 quotes)
  { id: 'q11', jobId: 'j10', providerId: 'p10', laborCost: 150, partsCost: 0, total: 150, timelineDays: 1, warrantyMonths: 3, fairnessScore: 89, status: 'submitted', createdAt: '2025-11-19T10:00:00Z', notes: 'Diagnostic + repair. Parts extra if needed (drain pump ~$80). Warranty check included.' },
  { id: 'q12', jobId: 'j10', providerId: 'p13', laborCost: 75, partsCost: 0, total: 75, timelineDays: 1, warrantyMonths: 0, fairnessScore: 38, status: 'submitted', createdAt: '2025-11-19T14:00:00Z', notes: 'Quick fix. Cash preferred.' },

  // Job j11 - Emergency plumbing (in progress)
  { id: 'q13', jobId: 'j11', providerId: 'p1', laborCost: 250, partsCost: 80, total: 330, timelineDays: 1, warrantyMonths: 12, fairnessScore: 86, status: 'accepted', createdAt: '2025-11-20T08:30:00Z', notes: 'Emergency response. En route within 30 minutes.' },
];

// ============================================
// REVIEWS
// ============================================
export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', jobId: 'j1', providerId: 'p1', seekerId: 'u1', rating: 5, tags: ['on_time', 'transparent_pricing', 'clean_work', 'professional'], comment: 'Joe was fantastic! Arrived on time, replaced the faucet quickly, and left everything cleaner than he found it. Price was exactly as quoted.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-08-16T10:00:00Z' },
  { id: 'r2', jobId: 'j7', providerId: 'p7', seekerId: 'u7', rating: 4, tags: ['clean_work', 'responsive', 'good_value'], comment: 'Great cleaning job overall. Kitchen and bathrooms look brand new. Only minor issue was they arrived 15 minutes late, but called to let me know.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-09-26T10:00:00Z' },
  // Additional reviews for provider rating diversity
  { id: 'r3', jobId: 'j1', providerId: 'p1', seekerId: 'u2', rating: 5, tags: ['professional', 'knowledgeable', 'on_time'], comment: 'Second time using Ace Plumbing. Consistently excellent work and fair pricing.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-09-01T10:00:00Z' },
  { id: 'r4', jobId: 'j2', providerId: 'p2', seekerId: 'u4', rating: 5, tags: ['transparent_pricing', 'knowledgeable', 'professional'], comment: 'Maria and her team did an incredible job on the panel upgrade. Everything passed inspection first try.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-10-01T10:00:00Z' },
  { id: 'r5', jobId: 'j3', providerId: 'p3', seekerId: 'u3', rating: 4, tags: ['responsive', 'knowledgeable'], comment: 'Fixed the AC issue quickly. Was a refrigerant leak. Good communication throughout the process.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-10-20T10:00:00Z' },
  { id: 'r6', jobId: 'j5', providerId: 'p5', seekerId: 'u5', rating: 5, tags: ['clean_work', 'on_time', 'professional'], comment: 'The paint job is beautiful! Linda helped us choose the perfect shade of gray. Very meticulous work.', isVerified: false, moderationStatus: 'approved', createdAt: '2025-11-15T10:00:00Z' },
  { id: 'r7', jobId: 'j8', providerId: 'p8', seekerId: 'u8', rating: 5, tags: ['professional', 'knowledgeable', 'on_time'], comment: 'Thorough inspection with detailed report. Perfect for our home sale. Highly recommend.', isVerified: true, moderationStatus: 'approved', createdAt: '2025-10-15T10:00:00Z' },
  { id: 'r8', jobId: 'j1', providerId: 'p13', seekerId: 'u6', rating: 1, tags: [], comment: 'Terrible experience. Work was sloppy, showed up late, and tried to charge more than quoted. Would not recommend.', isVerified: false, moderationStatus: 'flagged', createdAt: '2025-08-20T10:00:00Z' },
];

// ============================================
// PRICE INDICES
// ============================================
export const MOCK_PRICE_INDICES: PriceIndex[] = [
  // NYC (10001)
  { zipCode: '10001', categoryId: 'plumbing', minPrice: 150, maxPrice: 450, median: 275, sampleSize: 47, lastUpdated: '2025-11-15T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '10001', categoryId: 'electrical', minPrice: 200, maxPrice: 800, median: 425, sampleSize: 35, lastUpdated: '2025-11-14T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '10001', categoryId: 'hvac', minPrice: 300, maxPrice: 1200, median: 650, sampleSize: 22, lastUpdated: '2025-11-10T00:00:00Z', seasonalMultiplier: 1.3, confidence: 'medium' },
  { zipCode: '10001', categoryId: 'roofing', minPrice: 500, maxPrice: 3500, median: 1800, sampleSize: 15, lastUpdated: '2025-11-08T00:00:00Z', seasonalMultiplier: 1.1, confidence: 'medium' },
  { zipCode: '10001', categoryId: 'painting', minPrice: 400, maxPrice: 2000, median: 1100, sampleSize: 38, lastUpdated: '2025-11-12T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '10001', categoryId: 'landscaping', minPrice: 200, maxPrice: 1500, median: 650, sampleSize: 19, lastUpdated: '2025-11-05T00:00:00Z', seasonalMultiplier: 1.2, confidence: 'medium' },
  { zipCode: '10001', categoryId: 'cleaning', minPrice: 150, maxPrice: 500, median: 280, sampleSize: 56, lastUpdated: '2025-11-15T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '10001', categoryId: 'pest-control', minPrice: 100, maxPrice: 400, median: 225, sampleSize: 24, lastUpdated: '2025-11-10T00:00:00Z', seasonalMultiplier: 1.15, confidence: 'medium' },
  { zipCode: '10001', categoryId: 'flooring', minPrice: 800, maxPrice: 3000, median: 1650, sampleSize: 20, lastUpdated: '2025-11-08T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'medium' },
  { zipCode: '10001', categoryId: 'appliance-repair', minPrice: 100, maxPrice: 400, median: 200, sampleSize: 42, lastUpdated: '2025-11-14T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },

  // Beverly Hills (90210)
  { zipCode: '90210', categoryId: 'plumbing', minPrice: 200, maxPrice: 600, median: 375, sampleSize: 31, lastUpdated: '2025-11-13T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '90210', categoryId: 'electrical', minPrice: 250, maxPrice: 1000, median: 550, sampleSize: 28, lastUpdated: '2025-11-12T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'medium' },
  { zipCode: '90210', categoryId: 'hvac', minPrice: 400, maxPrice: 1500, median: 850, sampleSize: 25, lastUpdated: '2025-11-10T00:00:00Z', seasonalMultiplier: 1.3, confidence: 'medium' },
  { zipCode: '90210', categoryId: 'pest-control', minPrice: 150, maxPrice: 500, median: 300, sampleSize: 18, lastUpdated: '2025-11-08T00:00:00Z', seasonalMultiplier: 1.15, confidence: 'medium' },
  { zipCode: '90210', categoryId: 'landscaping', minPrice: 350, maxPrice: 2500, median: 1200, sampleSize: 33, lastUpdated: '2025-11-11T00:00:00Z', seasonalMultiplier: 1.2, confidence: 'high' },

  // Chicago (60601)
  { zipCode: '60601', categoryId: 'plumbing', minPrice: 130, maxPrice: 400, median: 245, sampleSize: 39, lastUpdated: '2025-11-14T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '60601', categoryId: 'electrical', minPrice: 180, maxPrice: 700, median: 380, sampleSize: 26, lastUpdated: '2025-11-11T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'medium' },
  { zipCode: '60601', categoryId: 'roofing', minPrice: 400, maxPrice: 3000, median: 1500, sampleSize: 21, lastUpdated: '2025-11-09T00:00:00Z', seasonalMultiplier: 1.1, confidence: 'medium' },

  // Houston (77001)
  { zipCode: '77001', categoryId: 'plumbing', minPrice: 120, maxPrice: 380, median: 220, sampleSize: 44, lastUpdated: '2025-11-14T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '77001', categoryId: 'painting', minPrice: 350, maxPrice: 1800, median: 950, sampleSize: 30, lastUpdated: '2025-11-11T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '77001', categoryId: 'hvac', minPrice: 250, maxPrice: 1100, median: 580, sampleSize: 48, lastUpdated: '2025-11-15T00:00:00Z', seasonalMultiplier: 1.3, confidence: 'high' },

  // Miami (33101)
  { zipCode: '33101', categoryId: 'plumbing', minPrice: 140, maxPrice: 420, median: 255, sampleSize: 36, lastUpdated: '2025-11-13T00:00:00Z', seasonalMultiplier: 1.0, confidence: 'high' },
  { zipCode: '33101', categoryId: 'landscaping', minPrice: 250, maxPrice: 2000, median: 900, sampleSize: 41, lastUpdated: '2025-11-12T00:00:00Z', seasonalMultiplier: 1.2, confidence: 'high' },
  { zipCode: '33101', categoryId: 'pest-control', minPrice: 120, maxPrice: 450, median: 260, sampleSize: 29, lastUpdated: '2025-11-10T00:00:00Z', seasonalMultiplier: 1.15, confidence: 'medium' },
];

// ============================================
// FLAGS
// ============================================
export const MOCK_FLAGS: Flag[] = [
  { id: 'f1', targetType: 'quote', targetId: 'q5', reporterId: 'u2', reason: 'Suspiciously low price for panel upgrade. No warranty offered. Cash-only request.', status: 'open', createdAt: '2025-09-13T10:00:00Z' },
  { id: 'f2', targetType: 'review', targetId: 'r8', reporterId: 'u22', reason: 'Disputed review - claims work was not performed by this provider.', status: 'investigating', createdAt: '2025-08-21T10:00:00Z' },
  { id: 'f3', targetType: 'provider', targetId: 'p13', reporterId: 'u1', reason: 'Provider operating without valid license. Insists on cash-only payments. Multiple complaints.', status: 'open', createdAt: '2025-09-15T10:00:00Z' },
  { id: 'f4', targetType: 'quote', targetId: 'q8', reporterId: 'u5', reason: 'Quote seems too low for the scope of work. No warranty, cash discount suspicious.', status: 'open', createdAt: '2025-11-04T10:00:00Z' },
  { id: 'f5', targetType: 'quote', targetId: 'q12', reporterId: 'u2', reason: 'Unrealistically low quote for appliance repair from unverified provider.', status: 'dismissed', createdAt: '2025-11-19T16:00:00Z', resolvedAt: '2025-11-20T09:00:00Z', resolution: 'Quote price is within possible range for simple drain cleaning. No action needed.' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find(u => u.id === id);
}

export function getProviderById(id: string): Provider | undefined {
  return MOCK_PROVIDERS.find(p => p.id === id);
}

export function getProviderByUserId(userId: string): Provider | undefined {
  return MOCK_PROVIDERS.find(p => p.userId === userId);
}

export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find(j => j.id === id);
}

export function getQuoteById(id: string): Quote | undefined {
  return MOCK_QUOTES.find(q => q.id === id);
}

export function getJobsBySeeker(seekerId: string): Job[] {
  return MOCK_JOBS.filter(j => j.seekerId === seekerId);
}

export function getQuotesByJob(jobId: string): Quote[] {
  return MOCK_QUOTES.filter(q => q.jobId === jobId);
}

export function getQuotesByProvider(providerId: string): Quote[] {
  return MOCK_QUOTES.filter(q => q.providerId === providerId);
}

export function getReviewsByProvider(providerId: string): Review[] {
  return MOCK_REVIEWS.filter(r => r.providerId === providerId);
}

export function getJobsForProvider(providerId: string): Job[] {
  const provider = MOCK_PROVIDERS.find(p => p.id === providerId);
  if (!provider) return [];
  return MOCK_JOBS.filter(j =>
    provider.serviceCategories.includes(j.categoryId) &&
    (j.status === 'posted' || MOCK_QUOTES.some(q => q.jobId === j.id && q.providerId === providerId))
  );
}

export function getPriceIndex(zipCode: string, categoryId: string): PriceIndex | undefined {
  return MOCK_PRICE_INDICES.find(p => p.zipCode === zipCode && p.categoryId === categoryId);
}

export function getProvidersByCategory(categoryId: string): Provider[] {
  return MOCK_PROVIDERS.filter(p => p.serviceCategories.includes(categoryId));
}

export function getFlagsByStatus(status: string): Flag[] {
  return MOCK_FLAGS.filter(f => f.status === status);
}

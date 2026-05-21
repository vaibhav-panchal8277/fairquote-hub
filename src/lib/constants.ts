import { ServiceCategory } from './types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Wrench',
    description: 'Pipes, drains, water heaters, fixture installation & repair',
    baseLaborRate: 95,
    seasonalFactor: 1.0,
    color: '#3B82F6',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    description: 'Wiring, panels, outlets, lighting, generator installation',
    baseLaborRate: 105,
    seasonalFactor: 1.0,
    color: '#F59E0B',
  },
  {
    id: 'hvac',
    name: 'HVAC',
    icon: 'Thermometer',
    description: 'Heating, ventilation, AC installation, maintenance & repair',
    baseLaborRate: 110,
    seasonalFactor: 1.3,
    color: '#EF4444',
  },
  {
    id: 'roofing',
    name: 'Roofing',
    icon: 'Home',
    description: 'Roof repair, replacement, inspection, gutter work',
    baseLaborRate: 85,
    seasonalFactor: 1.1,
    color: '#8B5CF6',
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: 'Paintbrush',
    description: 'Interior & exterior painting, staining, wallpaper',
    baseLaborRate: 55,
    seasonalFactor: 1.0,
    color: '#EC4899',
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    icon: 'TreePine',
    description: 'Lawn care, garden design, tree service, hardscaping',
    baseLaborRate: 50,
    seasonalFactor: 1.2,
    color: '#10B981',
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: 'Sparkles',
    description: 'Deep cleaning, move-in/out, carpet, window cleaning',
    baseLaborRate: 40,
    seasonalFactor: 1.0,
    color: '#06B6D4',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: 'Bug',
    description: 'Termite, rodent, insect treatment & prevention',
    baseLaborRate: 75,
    seasonalFactor: 1.15,
    color: '#84CC16',
  },
  {
    id: 'flooring',
    name: 'Flooring',
    icon: 'LayoutGrid',
    description: 'Hardwood, tile, laminate, carpet installation & repair',
    baseLaborRate: 70,
    seasonalFactor: 1.0,
    color: '#D97706',
  },
  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    icon: 'Settings',
    description: 'Washer, dryer, dishwasher, refrigerator, oven repair',
    baseLaborRate: 90,
    seasonalFactor: 1.0,
    color: '#6366F1',
  },
];

export const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', description: 'Flexible timing, no rush', icon: 'Clock' },
  { value: 'medium', label: 'Medium', description: 'Within a week', icon: 'Timer' },
  { value: 'high', label: 'High', description: 'Within 24-48 hours', icon: 'AlertTriangle' },
  { value: 'emergency', label: 'Emergency', description: 'ASAP, critical issue', icon: 'Siren' },
] as const;

export const REVIEW_TAGS = [
  { id: 'on_time', label: 'On Time', icon: 'Clock' },
  { id: 'transparent_pricing', label: 'Transparent Pricing', icon: 'DollarSign' },
  { id: 'clean_work', label: 'Clean Work', icon: 'Sparkles' },
  { id: 'professional', label: 'Professional', icon: 'Award' },
  { id: 'responsive', label: 'Responsive', icon: 'MessageCircle' },
  { id: 'good_value', label: 'Good Value', icon: 'ThumbsUp' },
  { id: 'knowledgeable', label: 'Knowledgeable', icon: 'GraduationCap' },
  { id: 'friendly', label: 'Friendly', icon: 'Smile' },
] as const;

export const SAMPLE_ZIP_CODES = ['10001', '90210', '60601', '77001', '33101'];

export const NAV_LINKS = {
  public: [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search Prices' },
  ],
  seeker: [
    { href: '/seeker/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/seeker/jobs/new', label: 'New Request', icon: 'PlusCircle' },
    { href: '/search', label: 'Search Prices', icon: 'Search' },
  ],
  provider: [
    { href: '/provider/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/provider/inbox', label: 'Inbox', icon: 'Inbox' },
    { href: '/provider/profile', label: 'Profile', icon: 'User' },
    { href: '/provider/metrics', label: 'Metrics', icon: 'BarChart3' },
  ],
  admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/admin/verification', label: 'Verification', icon: 'ShieldCheck' },
    { href: '/admin/moderation', label: 'Moderation', icon: 'Flag' },
    { href: '/admin/analytics', label: 'Analytics', icon: 'TrendingUp' },
  ],
} as const;

// ============================================
// FAIRQUOTE HUB — TYPE DEFINITIONS
// Mirrors the database schema
// ============================================

export type UserRole = 'seeker' | 'provider' | 'admin';
export type VerificationStatus = 'pending' | 'verified' | 'denied' | 'suspended';
export type JobStatus = 'draft' | 'posted' | 'quoted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type QuoteStatus = 'pending' | 'submitted' | 'accepted' | 'declined' | 'expired';
export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';
export type FlagTargetType = 'quote' | 'review' | 'provider' | 'message';
export type FlagStatus = 'open' | 'investigating' | 'resolved' | 'dismissed';

export interface User {
  id: string;
  role: UserRole;
  email: string;
  name: string;
  phone?: string;
  zip: string;
  avatarUrl?: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'deactivated';
}

export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  licenseNumber: string;
  insured: boolean;
  serviceRadiusKm: number;
  serviceCategories: string[];
  verificationStatus: VerificationStatus;
  avgRating: number;
  totalReviews: number;
  responseTimeMin: number;
  businessHours?: string;
  description?: string;
  portfolioPhotos?: string[];
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseLaborRate: number;
  seasonalFactor: number;
  color: string;
}

export interface Job {
  id: string;
  seekerId: string;
  categoryId: string;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  status: JobStatus;
  photos?: string[];
  preferredTimeline?: string;
  zip: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  jobId: string;
  providerId: string;
  laborCost: number;
  partsCost: number;
  total: number;
  timelineDays: number;
  warrantyMonths: number;
  fairnessScore: number;
  notes?: string;
  status: QuoteStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  jobId: string;
  providerId: string;
  seekerId: string;
  rating: number;
  tags: string[];
  comment: string;
  invoiceUrl?: string;
  isVerified: boolean;
  moderationStatus: ModerationStatus;
  createdAt: string;
}

export interface PriceIndex {
  zipCode: string;
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  median: number;
  sampleSize: number;
  lastUpdated: string;
  seasonalMultiplier: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface Flag {
  id: string;
  targetType: FlagTargetType;
  targetId: string;
  reporterId: string;
  reason: string;
  details?: string;
  status: FlagStatus;
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

// Composite / view types
export interface QuoteWithProvider extends Quote {
  provider: Provider & { user: User };
}

export interface JobWithDetails extends Job {
  seeker: User;
  category: ServiceCategory;
  quotes: QuoteWithProvider[];
  reviews: Review[];
}

export interface ProviderWithUser extends Provider {
  user: User;
}

export interface PriceRangeResult {
  min: number;
  max: number;
  median: number;
  sampleSize: number;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
  seasonalMultiplier: number;
  categoryName: string;
  zipCode: string;
}

export interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalJobs: number;
  totalQuotes: number;
  totalReviews: number;
  pendingVerifications: number;
  openFlags: number;
  avgResponseTime: number;
}

export interface ProviderMetrics {
  avgResponseTime: number;
  quoteAcceptanceRate: number;
  priceCompetitiveness: number; // percentage vs local avg
  ratingDistribution: { rating: number; count: number }[];
  monthlyJobs: { month: string; count: number }[];
  revenueEstimate: { month: string; amount: number }[];
}

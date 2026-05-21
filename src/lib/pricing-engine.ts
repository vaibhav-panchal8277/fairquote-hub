// ============================================
// FAIRQUOTE HUB — FAIR PRICE ENGINE
// Calculates fair price ranges using weighted
// median & IQR with outlier filtering
// ============================================

import { PriceIndex, Quote } from './types';
import { MOCK_PRICE_INDICES, MOCK_QUOTES } from './mock-data';
import { SERVICE_CATEGORIES } from './constants';
import { PriceRangeResult } from './types';

/**
 * Calculate the fair price range for a given ZIP code and service category.
 * Uses weighted median and IQR to filter outliers and provide a reliable range.
 */
export function calculateFairPrice(zipCode: string, categoryId: string): PriceRangeResult | null {
  // First check if we have a pre-computed index
  const existingIndex = MOCK_PRICE_INDICES.find(
    p => p.zipCode === zipCode && p.categoryId === categoryId
  );

  const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return null;

  if (existingIndex) {
    return {
      min: existingIndex.minPrice,
      max: existingIndex.maxPrice,
      median: existingIndex.median,
      sampleSize: existingIndex.sampleSize,
      lastUpdated: existingIndex.lastUpdated,
      confidence: existingIndex.confidence,
      seasonalMultiplier: existingIndex.seasonalMultiplier,
      categoryName: category.name,
      zipCode,
    };
  }

  // If no pre-computed index, calculate from quotes
  const relevantQuotes = MOCK_QUOTES.filter(q => {
    // In production, we'd join with jobs to get ZIP + category
    return q.status !== 'expired' && q.fairnessScore > 0;
  });

  if (relevantQuotes.length < 3) {
    // Not enough data — return estimate based on base rate
    return {
      min: Math.round(category.baseLaborRate * 0.8),
      max: Math.round(category.baseLaborRate * 3.5),
      median: Math.round(category.baseLaborRate * 2),
      sampleSize: relevantQuotes.length,
      lastUpdated: new Date().toISOString(),
      confidence: 'low',
      seasonalMultiplier: category.seasonalFactor,
      categoryName: category.name,
      zipCode,
    };
  }

  const prices = relevantQuotes.map(q => q.total).sort((a, b) => a - b);
  const result = computeIQRRange(prices);

  return {
    min: Math.round(result.q1 * category.seasonalFactor),
    max: Math.round(result.q3 * category.seasonalFactor),
    median: Math.round(result.median * category.seasonalFactor),
    sampleSize: result.filteredCount,
    lastUpdated: new Date().toISOString(),
    confidence: result.filteredCount >= 20 ? 'high' : result.filteredCount >= 10 ? 'medium' : 'low',
    seasonalMultiplier: category.seasonalFactor,
    categoryName: category.name,
    zipCode,
  };
}

/**
 * Compute IQR range with outlier filtering.
 * Excludes values outside Q1 - 1.5*IQR and Q3 + 1.5*IQR.
 */
function computeIQRRange(sortedPrices: number[]): {
  q1: number;
  q3: number;
  median: number;
  filteredCount: number;
} {
  const n = sortedPrices.length;

  const q1 = percentile(sortedPrices, 25);
  const q3 = percentile(sortedPrices, 75);
  const iqr = q3 - q1;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  // Filter outliers
  const filtered = sortedPrices.filter(p => p >= lowerBound && p <= upperBound);

  if (filtered.length === 0) {
    return { q1, q3, median: percentile(sortedPrices, 50), filteredCount: n };
  }

  return {
    q1: percentile(filtered, 25),
    q3: percentile(filtered, 75),
    median: percentile(filtered, 50),
    filteredCount: filtered.length,
  };
}

/**
 * Calculate a percentile value from a sorted array.
 */
function percentile(sortedArr: number[], p: number): number {
  const index = (p / 100) * (sortedArr.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sortedArr[lower];

  const weight = index - lower;
  return sortedArr[lower] * (1 - weight) + sortedArr[upper] * weight;
}

/**
 * Calculate a fairness score for a quote based on the local price range.
 * Score: 0-100, higher = fairer (closer to or below median)
 */
export function calculateFairnessScore(
  quoteTotal: number,
  zipCode: string,
  categoryId: string
): number {
  const priceRange = calculateFairPrice(zipCode, categoryId);
  if (!priceRange) return 50; // No data, neutral score

  const { min, max, median } = priceRange;
  const range = max - min;

  if (range === 0) return 80;

  if (quoteTotal <= median) {
    // Below or at median — great deal
    const ratio = (median - quoteTotal) / median;
    return Math.min(98, Math.round(85 + ratio * 15));
  }

  if (quoteTotal <= max) {
    // Between median and max — acceptable
    const ratio = (quoteTotal - median) / (max - median);
    return Math.round(85 - ratio * 35);
  }

  // Above max — overpriced
  const overRatio = (quoteTotal - max) / max;
  return Math.max(5, Math.round(50 - overRatio * 100));
}

/**
 * Get all available price data for a ZIP code across all categories.
 */
export function getAllPricesForZip(zipCode: string): PriceRangeResult[] {
  return SERVICE_CATEGORIES
    .map(cat => calculateFairPrice(zipCode, cat.id))
    .filter((p): p is PriceRangeResult => p !== null);
}

/**
 * Search for price data matching zip and category
 */
export function searchPrices(zipCode: string, categoryId?: string): PriceRangeResult[] {
  if (categoryId) {
    const result = calculateFairPrice(zipCode, categoryId);
    return result ? [result] : [];
  }
  return getAllPricesForZip(zipCode);
}

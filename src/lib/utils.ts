import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'low': return 'text-blue bg-blue-light';
    case 'medium': return 'text-amber bg-amber-light';
    case 'high': return 'text-rose bg-rose-light';
    case 'emergency': return 'text-white bg-rose';
    default: return 'text-navy-500 bg-navy-100';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'text-navy-500 bg-navy-100';
    case 'posted': return 'text-blue bg-blue-light';
    case 'quoted': return 'text-violet bg-violet-light';
    case 'pending': return 'text-amber bg-amber-light';
    case 'submitted': return 'text-blue bg-blue-light';
    case 'accepted': return 'text-primary bg-primary-light';
    case 'in_progress': return 'text-violet bg-violet-light';
    case 'completed': return 'text-primary-dark bg-primary-light';
    case 'cancelled': return 'text-rose bg-rose-light';
    case 'declined': return 'text-rose bg-rose-light';
    case 'expired': return 'text-navy-400 bg-navy-100';
    case 'verified': return 'text-primary bg-primary-light';
    case 'denied': return 'text-rose bg-rose-light';
    case 'suspended': return 'text-amber bg-amber-light';
    default: return 'text-navy-500 bg-navy-100';
  }
}

export function getFairnessColor(score: number): string {
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-amber';
  return 'text-rose';
}

export function getFairnessBgColor(score: number): string {
  if (score >= 80) return 'bg-primary-light text-primary-dark';
  if (score >= 60) return 'bg-amber-light text-amber';
  return 'bg-rose-light text-rose';
}

export function getFairnessLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Fair';
  if (score >= 60) return 'Above Average';
  if (score >= 40) return 'High';
  return 'Overpriced';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
}

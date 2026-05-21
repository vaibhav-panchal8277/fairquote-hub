'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { NAV_LINKS } from '@/lib/constants';
import * as Icons from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const links = NAV_LINKS[user.role] || [];

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-4.5 h-4.5" /> : null;
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card min-h-[calc(100vh-4rem)] p-4">
      {/* Role badge */}
      <div className="mb-6 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground">Logged in as</p>
        <p className="text-sm font-semibold capitalize text-primary">{user.role}</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {'icon' in link && getIcon(link.icon as string)}
              {link.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-blue/5">
          <p className="text-xs font-medium text-foreground">Need Help?</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Visit our help center or contact support.
          </p>
          <button className="mt-2 text-xs font-medium text-primary hover:text-primary-hover transition-colors">
            Get Support →
          </button>
        </div>
      </div>
    </aside>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, ClipboardList, Settings } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Helper to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'History', path: '/history', icon: ClipboardList },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Don't show on job details or other sub-pages if desired, 
  // but usually bottom nav persists. 
  // If we want to hide it on job details: 
  if (pathname.startsWith('/job/')) {
     return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around p-3 pb-5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                active 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

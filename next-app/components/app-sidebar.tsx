'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import { Sun, Target, Activity, Terminal, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Target,
    },
    {
      title: 'Telemetry',
      url: '/dashboard/telemetry',
      icon: Activity,
    },
    {
      title: 'System Logs',
      url: '/dashboard/logs',
      icon: Terminal,
    },
    {
      title: 'Maintenance',
      url: '/dashboard/maintenance',
      icon: Wrench,
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-neutral-900 bg-[#0d0d0d] dark:bg-[#070707] text-white"
      {...props}
    >
      {/* Sidebar Header: Branding */}
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-neutral-900/60 justify-start">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-helion-green/10 border border-helion-green/20 text-helion-green shrink-0">
            <Sun className="size-5 fill-helion-green/10 stroke-[2] animate-[spin_60s_linear_infinite]" />
          </div>
          <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-xs tracking-wider text-white uppercase font-sans">
              Helion Energy
            </span>
            <span className="text-[9px] font-grotesk tracking-widest text-helion-green uppercase font-semibold mt-0.5">
              Solar Tracker
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Navigation */}
      <SidebarContent className="px-3 py-6 bg-transparent">
        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.url || (item.url === '/dashboard' && pathname === '/dashboard');
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'w-full h-11 px-4 rounded-full transition-all duration-300 group-data-[collapsible=icon]:justify-center font-sans text-sm font-semibold tracking-wide border border-transparent',
                    isActive
                      ? 'bg-white text-black hover:bg-white/95 hover:text-black shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                  )}
                  tooltip={item.title}
                >
                  <Link href={item.url} className="flex items-center gap-3 w-full">
                    <Icon
                      className={cn(
                        'size-4.5 stroke-[2] shrink-0 transition-colors',
                        isActive ? 'text-black' : 'text-neutral-400 group-hover:text-white'
                      )}
                    />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-neutral-900/60 p-3 bg-transparent">
        <NavUser user={user || { name: 'Operator', email: 'op@helion.energy', avatar: '' }} />
      </SidebarFooter>
    </Sidebar>
  );
}

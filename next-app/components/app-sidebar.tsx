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
import { Target, Activity, Terminal, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import iconSvg from '@/app/icon.svg';

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
      // className="border-r border-sidebar-border"
      {...props}
    >
      {/* Sidebar Header: Branding */}
      <SidebarHeader className="flex mt-2 px-4 group-data-[collapsible=icon]:items-center justify-start">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex size-9 items-center justify-center rounded-xl bg-helion-green/10 border border-helion-green/20 shrink-0">
            <Image
              src={iconSvg}
              alt="Helion Logo"
              width={20}
              height={20}
              className="size-5"
            />
          </div>
          <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-xs tracking-wider uppercase truncate">
              Helion Energy
            </span>
            <span className="text-[9px] font-grotesk tracking-widest text-helion-green uppercase font-semibold mt-0.5 truncate">
              Solar Tracker
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Navigation */}
      <SidebarContent className="px-2 py-6 bg-transparent">
        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url === '/dashboard' && pathname === '/dashboard');
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'w-full h-11 px-4 rounded-full text-sm tracking-wide',
                    isActive
                      ? 'font-semibold bg-helion-green text-black shadow-md hover:bg-helion-green/60 hover:text-black'
                      : 'text-sidebar-foreground/70 hover:font-semibold transition-all hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50',
                  )}
                  tooltip={item.title}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 w-full"
                  >
                    <Icon
                      className={cn(
                        'size-4.5 stroke-2 shrink-0 transition-colors',
                        isActive
                          ? 'text-black'
                          : 'text-sidebar-foreground/60 group-hover/menu-button:text-sidebar-accent-foreground',
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
      <SidebarFooter className="border-t border-sidebar-border/60 p-2 bg-transparent">
        <NavUser
          user={
            user || { name: 'Operator', email: 'op@helion.energy', avatar: '' }
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}

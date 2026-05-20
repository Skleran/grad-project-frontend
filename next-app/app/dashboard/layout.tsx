import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userProfile = user
    ? {
        name: user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: '',
      }
    : {
        name: 'User',
        email: '',
        avatar: '',
      };

  return (
    <SidebarProvider>
      <AppSidebar user={userProfile} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

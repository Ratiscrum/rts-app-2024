import { Home, Mic } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Accueil',
    url: '/',
    icon: Home,
  },
  {
    title: 'Podcasts',
    url: '/podcasts',
    icon: Mic,
  },
];

// const collapsibleItems = [
//   {
//     title: 'Account',
//     icon: UserCircle2,
//     defaultOpen: false,
//     collapsibleContent: [
//       {
//         title: 'Profile',
//         url: '/profile',
//       },
//       {
//         title: 'Logout',
//         url: '/logout',
//       },
//     ],
//   },
// ];

export function MobileSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ratiscrum App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

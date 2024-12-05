import {
  ChevronRight,
  Home,
  LogIn,
  MessageCircle,
  UserCircle2,
  UserPlus2,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Chat',
    url: '/chat',
    icon: MessageCircle,
  },
  {
    title: 'Sign In',
    url: '/login',
    icon: LogIn,
  },
  {
    title: 'Sign Up',
    url: '/register',
    icon: UserPlus2,
  },
];

const collapsibleItems = [
  {
    title: 'Account',
    icon: UserCircle2,
    defaultOpen: false,
    collapsibleContent: [
      {
        title: 'Profile',
        url: '/profile',
      },
      {
        title: 'Logout',
        url: '/logout',
      },
    ],
  },
];

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
            <SidebarMenu>
              {collapsibleItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.defaultOpen}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.collapsibleContent.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

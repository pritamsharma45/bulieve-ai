

import * as React from "react"
import pfp from "@/public/bulieve-logo.jpeg";
import {
  BadgeCheck,
  ChevronsUpDown,
  Frame,
  LogOut,
  MoreHorizontal,
  Group,Newspaper
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,LogoutLink
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
import { ThemeToggle } from "./ThemeToggle";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Hot Takes",
      url: "/hot-takes",
      icon: Frame,
    },
    {
      name: "News",
      url: "/news",
      icon: Newspaper,
    },
    {
      name: "Groups",
      url: "/groups",
      icon: Group,
    },
    {
      name: "Stock Arena",
      url: "/stock-arena",
      icon: Group,
    },
  ],
};

interface Project {
  name: string;
  url: string;
  icon: React.ComponentType;
}

interface Data {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  projects: Project[];
}

export async function SidebarLeft({ data }: { data: Data }) {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const getUserInitial = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  }




  console.log("user",user);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src={pfp} alt="pfp" className="w-fit" />
                    
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                  
                  <span className="truncate font-semibold">
                    BULIEVE.AI
                    </span>
                  </div>
                </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {data.projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  
                  <div className="grid flex-1 text-left text-sm leading-tight">
                  {user ? (
        <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={user?.picture ||''}
          alt={user?.given_name|| ''}
        />
        <AvatarFallback className="rounded-lg">
        {
                      getUserInitial(user?.given_name+" "+user?.family_name)
                    }
        </AvatarFallback>
    
      </Avatar>
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
                  </div>
                {user &&(  <ChevronsUpDown className="ml-auto size-4" />)}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
          {
            user &&(
              <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={data.user.avatar}
                      alt={data.user.name}
                    />
                    <AvatarFallback className="rounded-lg">
                    {
                      getUserInitial(user?.given_name+" "+user?.family_name)
                    }
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.given_name}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Profile
                </DropdownMenuItem>

              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <LogoutLink className="w-full">Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
            )
          }
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

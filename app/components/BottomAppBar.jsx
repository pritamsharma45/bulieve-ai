"use client";

import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  ChevronsUpDown,
  Frame,
  LogOut,
  MoreHorizontal,
  Group,
  Newspaper,
} from "lucide-react";
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

export default function BottomAppBar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 p-2 left-0 right-0 h-16 text-sidebar-foreground flex justify-between items-center border-t border-gray-200 md:hidden z-50"
      style={{ backgroundColor: "hsl(var(--sidebar-background))" }}
    >
      {data?.projects?.slice(0, 4).map((item) => {
        const isActive = pathname === item.url;

        return (
          <a
            href={item.url}
            key={item.name}
            className="p-2 rounded flex flex-col items-center text-xs hover:text-sidebar-accent-foreground"
            style={{
              backgroundColor: isActive ? "hsl(50, 100%, 50%)" : undefined, // Highlight active background with yellow
              fontWeight: isActive ? "600" : "400", // Bold font for active
            }}
          >
            <item.icon
              style={{
                color: isActive ? "hsl(var(--sidebar-accent))" : undefined, // Dynamic icon color
                marginBottom: "0.25rem", // Match "mb-1" in Tailwind
              }}
            />
            <span>{item.name}</span>
          </a>
        );
      })}
    </div>
  );
}

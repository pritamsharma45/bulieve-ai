import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import pfp from "@/public/bulieve-logo.jpeg";
import {
  BadgeCheck,
  ChevronsUpDown,
  Frame,
  LogOut,
  MoreHorizontal,
  Group,Newspaper
} from "lucide-react"

import { SidebarProvider, SidebarTrigger,SidebarInset } from "@/components/ui/sidebar"

import { SidebarLeft } from "@/app/components/SidebarLeft"
import BottomAppBar from "@/app/components/BottomAppBar"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bulieve AI",
  description: "An AI first Finance Networking Platform.",
};

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
      name: "News Arena",
      url: "/news",
      icon: Newspaper,
    },
    {
      name: "Teams",
      url: "/teams",
      icon: Group,
    },
    {
      name: "Stock Arena",
      url: "/stock-arena",
      icon: Group,
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <SidebarLeft data={data}  />
            </div>
            
            {/* Mobile Bottom App Bar */}
            <div className="md:hidden">
              <BottomAppBar />
            </div>
            {/* Main Content */}
            <div className="hidden md:block flex flex-1 flex-col gap-4 p-4">{children}</div>
            <div className="md:hidden">
            <div className="flex flex-row items-center p-2">
            <Image src={pfp} alt="pfp" className="w-8" />
            <span  className="ml-4">
              BULIEVE AI
            </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </div>
           
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}




'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu
} from "@/components/ui/sidebar"
import { Home, Paintbrush, CircleDollarSign } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const items = [
  { title: "Workspace", url: "/dashboard", icon: Home },
  { title: "Design", url: "/designs", icon: Paintbrush },
  { title: "Credits", url: "/credits", icon: CircleDollarSign },
]

export default function AppSidebar() {
  const path = usePathname()
  const { resolvedTheme } = useTheme()

  return (
    <Sidebar className="bg-sidebar dark:bg-[#1e1e2f] text-foreground">
      <SidebarHeader>
        <div className="p-4 flex flex-col items-center">
          <Image
            src={resolvedTheme === 'dark' ? '/logo2.svg' : '/logo.svg'}
            alt="logo"
            width={100}
            height={100}
            className="w-full h-auto"
          />
          <h2 className="text-sm font-bold text-primary mt-1">Build Awesome</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item, index) => (
               <a
  href={item.url}
  key={index}
  className={`p-2 text-lg flex gap-2 items-center rounded-lg transition-all
    ${
      path === item.url
        ? 'dark:bg-blue-200 dark:text-primary bg-gray-200 text-black'
        : 'dark:hover:bg-muted dark:hover:text-primary hover:bg-gray-100 hover:text-black'
    }
  `}
>
  <item.icon className="h-5 w-5" />
  <span>{item.title}</span>
</a>

              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <h2 className="p-2 text-xs text-muted-foreground">Copyright @IshikaGoyal</h2>
      </SidebarFooter>
    </Sidebar>
  )
}

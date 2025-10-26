import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Procure", url: "/procure", icon: ShoppingCart },
  { title: "Ledger", url: "/ledger", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-white/[0.08] bg-black/90 backdrop-blur-xl">
      <SidebarContent>
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <img src="/greenchain.png" alt="" className="w-5 h-5" />
            </div>
            {open && (
              <div className="animate-fade-in">
                <h2 className="font-semibold text-lg">GreenChain</h2>
                <p className="text-sm text-gray-400">ESG Automation</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium tracking-wider text-gray-400">
            NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      className={`group transition-all hover:text-emerald-400 ${
                        isActive(item.url)
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-gray-400"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive(item.url)
                            ? "text-emerald-400"
                            : "text-emerald-400/70"
                        }`}
                      />
                      {open && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
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

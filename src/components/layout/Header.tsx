import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Sepolia Testnet</span>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2 group">
          <Wallet className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="mono text-xs">0x742d...3a4f</span>
        </Button>
      </div>
    </header>
  );
}

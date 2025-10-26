import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Header() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    const ethereum = window.ethereum;

    if (!ethereum) {
      toast.error("Please install MetaMask to connect");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        toast.success("Wallet connected successfully");
      }
    } catch (error: unknown) {
      toast.error("Failed to connect wallet");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    toast.success("Wallet disconnected");
  };

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success("Address copied to clipboard");
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="h-16 border-b border-border/5 flex items-center justify-between px-6 backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">GreenChain</span>
          <span className="hidden lg:inline text-sm text-gray-400">
            ESG Automation
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-sm font-medium text-violet-400">
            Sepolia Testnet
          </span>
        </div>

        {account ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 group border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/10 rounded-full px-4"
              >
                <Wallet className="w-4 h-4 text-emerald-500" />
                <span className="font-mono text-sm font-medium text-emerald-500">
                  {formatAddress(account)}
                </span>
                <ChevronDown className="w-4 h-4 text-emerald-500/70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleCopyAddress} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Address
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2" asChild>
                <a
                  href={`https://sepolia.etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDisconnect}
                className="gap-2 text-red-500 focus:text-red-500"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="gap-2 group bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 transition-transform group-hover:scale-110" />
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect Wallet</span>
            )}
          </Button>
        )}
      </div>
    </header>
  );
}

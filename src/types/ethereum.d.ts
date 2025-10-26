interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (params?: any) => void) => void;
    removeListener: (event: string, callback: (params?: any) => void) => void;
    selectedAddress: string | null;
    chainId: string;
    networkVersion: string;
    isConnected: () => boolean;
  };
}

declare module "@metamask/providers" {
  interface MetaMaskEthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (params?: any) => void) => void;
    removeListener: (event: string, callback: (params?: any) => void) => void;
    selectedAddress: string | null;
    chainId: string;
    networkVersion: string;
    isConnected: () => boolean;
  }
}

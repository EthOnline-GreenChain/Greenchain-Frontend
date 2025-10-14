import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Leaf, DollarSign, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const providers = [
  { id: 1, name: "Rainforest Alliance", type: "Nature-based", vintage: 2024, price: 0.45, allocation: 60 },
  { id: 2, name: "Direct Air Capture", type: "Tech-based", vintage: 2024, price: 0.65, allocation: 40 },
];

export default function Procure() {
  const [offsetAmount, setOffsetAmount] = useState([25]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalCost = (offsetAmount[0] * 1.0).toFixed(2);

  const handleProcure = async () => {
    setIsProcessing(true);
    
    // Simulate agent procurement
    toast.loading("Agent analyzing providers...", { id: "procure" });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.loading("Securing PYUSD payment...", { id: "procure" });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.loading("Minting credit tokens...", { id: "procure" });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(`Successfully procured ${offsetAmount[0]} tCO₂e credits!`, { id: "procure" });
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Procure Offsets</h1>
        <p className="text-muted-foreground">Automatically purchase carbon credits with AI-powered optimization</p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Offset Amount
          </CardTitle>
          <CardDescription>Select the amount of carbon credits to offset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount to offset</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold mono">{offsetAmount[0]}</span>
                <span className="text-sm text-muted-foreground">tCO₂e</span>
              </div>
            </div>
            <Slider
              value={offsetAmount}
              onValueChange={setOffsetAmount}
              min={1}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 tCO₂e</span>
              <span>100 tCO₂e</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Estimated Cost</span>
              <div className="flex items-baseline gap-1">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold mono">{totalCost}</span>
                <span className="text-sm text-muted-foreground">PYUSD</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Payment will be processed on Sepolia testnet</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimized Basket</CardTitle>
          <CardDescription>AI-selected providers based on price, quality, and vintage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{provider.type}</Badge>
                    <span className="text-xs text-muted-foreground">Vintage {provider.vintage}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium mono">{provider.allocation}%</p>
                <p className="text-xs text-muted-foreground">${provider.price}/tCO₂e</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button
        onClick={handleProcure}
        disabled={isProcessing}
        className="w-full h-12 text-base gap-2 gradient-emerald hover:opacity-90 transition-opacity"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5" />
            Auto-Procure {offsetAmount[0]} tCO₂e
          </>
        )}
      </Button>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Leaf, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const providers = [
  {
    id: 1,
    name: "Rainforest Alliance",
    type: "Nature-based",
    vintage: 2024,
    price: 0.45,
    allocation: 60,
  },
  {
    id: 2,
    name: "Direct Air Capture",
    type: "Tech-based",
    vintage: 2024,
    price: 0.65,
    allocation: 40,
  },
];

export default function Procure() {
  const [offsetAmount, setOffsetAmount] = useState([25]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalCost = (offsetAmount[0] * 1.0).toFixed(2);

  const handleProcure = async () => {
    setIsProcessing(true);

    // Simulate agent procurement
    toast.loading("Agent analyzing providers...", { id: "procure" });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.loading("Securing PYUSD payment...", { id: "procure" });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.loading("Minting credit tokens...", { id: "procure" });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Successfully procured ${offsetAmount[0]} tCO₂e credits!`, {
      id: "procure",
    });

    setIsProcessing(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-6">
      <header>
        <h1 className="text-3xl font-extrabold text-white">Procure Offsets</h1>
        <p className="text-sm text-neutral-400">
          Automatically purchase carbon credits with AI-powered optimization
        </p>
      </header>

      {/* CSV Upload Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-white">
                Upload Facility Bills
              </h2>
              <p className="text-sm text-neutral-400">
                Upload CSV of bills or enter a single facility.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm text-neutral-400 mb-4">
                CSV columns:{" "}
                <code className="px-2 py-1 rounded bg-[#0b1117]/80 border border-white/6 text-emerald-400 font-mono">
                  facility_name, date, kWh, fuel_type, fuel_amount
                </code>
              </p>

              <div className="flex flex-col gap-3">
                <div className="group relative">
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    className="block w-full text-sm text-neutral-200 
                             file:mr-4 file:py-3 file:px-4 
                             file:rounded-lg file:border-2 file:border-dashed 
                             file:border-white/10 hover:file:border-emerald-500/50
                             file:bg-[#0b1117]/40 hover:file:bg-[#0b1117]/60
                             file:text-neutral-200 cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                             transition-all duration-200"
                  />
                  <div
                    className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none
                               group-hover:border-emerald-500/30 transition-colors duration-200"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-400">Example:</span>
                  <span className="font-mono">
                    Hotel Lisboa,2025-10-12,420,none,0
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Offset Amount
              </h2>
              <div className="text-sm text-neutral-400">
                Select the amount of carbon credits to offset
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm text-neutral-300">
                Amount to offset
              </label>
              <div className="flex items-center gap-6">
                <Slider
                  value={offsetAmount}
                  onValueChange={setOffsetAmount}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full accent-emerald-400"
                  aria-label="Amount to offset"
                />
                <div className="text-2xl font-extrabold text-white">
                  {offsetAmount[0]}{" "}
                  <span className="text-sm text-neutral-400">tCO₂e</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-neutral-400">
                <span>1 tCO₂e</span>
                <span>100 tCO₂e</span>
              </div>

              <div className="mt-4 rounded-lg border border-white/6 p-4 bg-[#0b1117]/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-400">
                      Estimated Cost
                    </div>
                    <div className="text-xs text-neutral-400">
                      Payment will be processed on Sepolia testnet
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    ${totalCost}{" "}
                    <span className="text-sm text-neutral-400">PYUSD</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Optimized Basket</CardTitle>
              <CardDescription>
                AI-selected providers based on price, quality, and vintage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/6 bg-[#0b1117]/40 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{provider.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="text-xs border-white/6 text-neutral-300"
                        >
                          {provider.type}
                        </Badge>
                        <span className="text-xs text-neutral-400">
                          Vintage {provider.vintage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">
                      {provider.allocation}%
                    </p>
                    <p className="text-xs text-neutral-400">
                      ${provider.price}/tCO₂e
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            onClick={handleProcure}
            disabled={isProcessing}
            className="w-full h-12 text-base gap-2 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
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
      </div>
    </div>
  );
}

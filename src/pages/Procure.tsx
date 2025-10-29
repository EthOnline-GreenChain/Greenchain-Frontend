import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BarChart3, Leaf, TrendingUp, Upload } from "lucide-react";
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
  const [offsetAmount, setOffsetAmount] = useState([0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [lastTrade, setLastTrade] = useState<any | null>(null);
  const totalCost = (offsetAmount[0] * 1.0).toFixed(2);

  // Upload + Calculate CO2
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    toast.loading("📤 Uploading PDF...", { id: "upload" });

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/ingest/pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      const newFileId = data.file_id;
      setFileId(newFileId);
      toast.success("✅ PDF successfully ingested!", { id: "upload" });

      toast.loading("⚙️ Calculating CO₂ emissions...", { id: "calc" });
      const calcRes = await fetch(`/api/co2/calculate?file_id=${newFileId}`, {
        method: "POST",
      });
      const calcData = await calcRes.json();
      if (!calcRes.ok)
        throw new Error(calcData.message || "CO₂ calculation failed");
      toast.success("✅ CO₂ calculated!", { id: "calc" });

      const {
        scope2_location_tonnes,
        scope2_market_tonnes,
        scope3_3_tandd_tonnes,
      } = calcData.outputs || {};
      const totalCO2 =
        (scope2_location_tonnes || 0) +
        (scope2_market_tonnes || 0) +
        (scope3_3_tandd_tonnes || 0);
      setOffsetAmount([parseFloat(totalCO2.toFixed(3))]);
      toast.success(`🌿 Offset updated: ${totalCO2.toFixed(3)} tCO₂e`);
    } catch (error) {
      console.error(error);
      toast.error("Upload or CO₂ calculation failed", { id: "upload" });
    }
  };

  // Trigger Procurement
  const handleTriggerProcure = async () => {
    if (!fileId) return toast.error("Please upload a PDF first!");
    setIsProcessing(true);
    toast.loading("🤖 Triggering procurement...", { id: "procure" });

    try {
      console.log("Triggering procurement for file:", fileId);
      const triggerRes = await fetch(
        `/api/procurement/trigger?file_id=${fileId}`,
        {
          method: "POST",
        }
      );
      const triggerData = await triggerRes.json();
      console.log("📦 Procurement Trigger JSON:", triggerData);

      if (!triggerRes.ok)
        throw new Error(triggerData.message || "Procurement trigger failed");

      toast.success("✅ Procurement Triggered!", { id: "procure" });
    } catch (error) {
      console.error("❌ Trigger Procurement Error:", error);
      toast.error("Procurement trigger failed", { id: "procure" });
    } finally {
      setIsProcessing(false);
    }
  };

  // Fetch Last Trade
  const handleShowLastTrade = async () => {
    toast.loading("📊 Fetching last trade...", { id: "trade" });

    try {
      const tradeRes = await fetch(`/bureau/last-trade`);
      const tradeData = await tradeRes.json();
      console.log("📦 Last Trade JSON:", tradeData);

      if (!tradeRes.ok)
        throw new Error(tradeData.message || "Failed to fetch last trade");

      setLastTrade(tradeData);
      toast.success("✅ Last trade data loaded!", { id: "trade" });
    } catch (error) {
      console.error("❌ Show Last Trade Error:", error);
      toast.error("Failed to fetch last trade", { id: "trade" });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-6">
      <header>
        <h1 className="text-3xl font-extrabold text-white">Procure Offsets</h1>
        <p className="text-sm text-neutral-400">
          Automatically purchase carbon credits with AI-powered optimization
        </p>
      </header>

      {/* Upload Section */}
      <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
        <h2 className="text-lg font-semibold text-white">
          Upload Electricity Bill (PDF)
        </h2>
        <p className="text-sm text-neutral-400">
          Upload your facility’s electricity bill in PDF format.
        </p>
        <div className="mt-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-neutral-200 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-2 file:border-dashed file:border-white/10 hover:file:border-emerald-500/50 file:bg-[#0b1117]/40 hover:file:bg-[#0b1117]/60 file:text-neutral-200 cursor-pointer"
          />
          {file && (
            <div className="flex items-center gap-2 text-sm text-emerald-400 mt-2">
              <Upload className="w-4 h-4" /> {file.name}
            </div>
          )}
          {fileId && (
            <div className="text-xs text-emerald-400 mt-2">
              📦 File ID: <code>{fileId}</code>
            </div>
          )}
        </div>
      </Card>

      {/* Offset Controls */}
      <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Offset Amount</h2>
          <div className="text-sm text-neutral-400">
            Select the amount of carbon credits
          </div>
        </div>
        <div className="mt-6">
          <Slider
            value={offsetAmount}
            onValueChange={setOffsetAmount}
            min={0}
            max={5}
            step={0.001}
          />
          <div className="text-2xl font-extrabold text-white mt-3">
            {offsetAmount[0]}{" "}
            <span className="text-sm text-neutral-400">tCO₂e</span>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-white/6 p-4 bg-[#0b1117]/40">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-400">Estimated Cost</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              ${totalCost} PYUSD
            </span>
          </div>
        </div>
      </Card>

      {/* Providers */}
      <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Optimized Basket</CardTitle>
          <CardDescription>
            AI-selected providers based on price and quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-0">
          {providers.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border border-white/10 p-3 rounded-lg"
            >
              <div className="flex gap-3 items-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white">{p.name}</p>
                  <p className="text-xs text-neutral-400">
                    {p.type} — {p.vintage}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-300">
                {p.allocation}% at ${p.price}/tCO₂e
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          onClick={handleTriggerProcure}
          disabled={isProcessing}
          className="w-full h-12 text-base gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" /> Auto Procure
            </>
          )}
        </Button>

        <Button
          onClick={handleShowLastTrade}
          className="w-full h-12 text-base gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <BarChart3 className="w-5 h-5" /> Show Last Trade
        </Button>
      </div>

      {/* Last Trade Section */}
      {lastTrade && lastTrade.trade && (
        <Card className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
          <CardHeader className="px-0 pt-0">
            <CardTitle>🪙 Last Trade Summary</CardTitle>
            <CardDescription>
              Recent procurement details executed by the Bureau
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-neutral-300">
            <p>
              <strong>Order ID:</strong> {lastTrade.trade.order_id}
            </p>
            <p>
              <strong>Policy:</strong> {lastTrade.trade.policy_name}
            </p>
            <p>
              <strong>Target:</strong> {lastTrade.trade.target_tco2e} tCO₂e
            </p>

            <div className="mt-4">
              <h3 className="font-semibold text-white mb-2">
                Basket Breakdown:
              </h3>
              {lastTrade.trade.basket.lines.map((line: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-white/10 rounded-lg p-3 mb-2"
                >
                  <p>
                    <strong>{line.credit_id}</strong> ({line.registry}) —{" "}
                    {line.tonnes} tCO₂e
                  </p>
                  <p className="text-neutral-400 text-xs">
                    {line.cls} • {line.country} • {line.vintage} • $
                    {line.unit_price_pyusd}/tCO₂e
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-white mb-2">Settlement TXs:</h3>
              <ul className="text-xs text-neutral-400 space-y-1">
                {lastTrade.trade.settlement.tx_hashes.map(
                  (tx: string, idx: number) => (
                    <li key={idx}>{tx}</li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-white mb-2">
                Proof Bundle Hash:
              </h3>
              <code className="text-emerald-400 break-all">
                {lastTrade.trade.proof_bundle_hash}
              </code>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

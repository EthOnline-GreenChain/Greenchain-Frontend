import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotification, useTransactionPopup } from "@blockscout/app-sdk";
import { CheckCircle2, ExternalLink, History, Lock } from "lucide-react";

const BLOCKSCOUT_URL = "https://grenchain-ethglobal.cloud.blockscout.com";

const retirements = [
  {
    id: "0x74484764cfb0537afa82a0e5584741cf92f50d5c602731843f054d12cecc404c",
    amount: 0.1304,
    creditId: "IN-NATURE-2020",
    proofHash:
      "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
    status: "verified",
  },
  {
    id: "0x2ef2f026e3cbd6b87e0c94982bdb5d72456c4b5176c02df643a4b652977d5ef7",
    amount: 0.1304,
    creditId: "IN-TECH-2021",
    proofHash:
      "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
    status: "verified",
  },
  {
    id: "0x91ffecf4536d1fbb8e4ed4662edd04931cc51672a8f5f426cd5b0a553a5eeddb",
    amount: 0.08,
    creditId: "NP-NATURE-2022",
    proofHash:
      "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
    status: "verified",
  },
];

// Demo trade object (provided by user)
const demoTrade = {
  status: "ok",
  trade: {
    order_id: "ORD-78a6fe2d",
    run_id: "78a6fe2d-6743-4408-a194-0f3143c67e8d",
    policy_name: "Balanced quality v1",
    target_tco2e: 0.326,
    basket: {
      target_tco2e: 0.326,
      lines: [
        {
          provider_id:
            "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
          credit_id: "IN-NATURE-2020",
          project_id: "P-IN-001",
          registry: "Verra",
          cls: "nature_based",
          country: "IN",
          vintage: 2020,
          tonnes: 0.1304,
          unit_price_pyusd: 9.8,
          score: 0.731,
        },
        {
          provider_id:
            "agent1qds4dd09w6kq27mpldew0eukzrz0qxxt2y3q5v8synw5kk4873q9sx2lfcm",
          credit_id: "NP-NATURE-2022",
          project_id: "P-NP-001",
          registry: "Verra",
          cls: "nature_based",
          country: "NP",
          vintage: 2022,
          tonnes: 0.08,
          unit_price_pyusd: 9.9,
          score: 0.68375,
        },
        {
          provider_id:
            "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
          credit_id: "IN-TECH-2021",
          project_id: "P-IN-002",
          registry: "Gold Standard",
          cls: "tech_based",
          country: "IN",
          vintage: 2021,
          tonnes: 0.1304,
          unit_price_pyusd: 10.2,
          score: 0.738,
        },
      ],
      expected_total_pyusd: 3.4,
      policy_name: "Balanced quality v1",
    },
    reservation_holds: [
      {
        hold_id: "HOLD-5149ff20",
        provider_id:
          "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
        credit_id: "IN-NATURE-2020",
        tonnes: 0.1304,
        unit_price: 9.8,
        expires_at: "2025-10-25T15:47:39Z",
      },
      {
        hold_id: "HOLD-fb38975c",
        provider_id:
          "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
        credit_id: "IN-TECH-2021",
        tonnes: 0.1304,
        unit_price: 10.2,
        expires_at: "2025-10-25T15:47:39Z",
      },
      {
        hold_id: "HOLD-84186227",
        provider_id:
          "agent1qds4dd09w6kq27mpldew0eukzrz0qxxt2y3q5v8synw5kk4873q9sx2lfcm",
        credit_id: "NP-NATURE-2022",
        tonnes: 0.08,
        unit_price: 9.9,
        expires_at: "2025-10-25T15:47:39Z",
      },
    ],
    settlement: {
      tx_hashes: ["0xTXc4e1e92dab29", "0xTXcd058a7e51c6", "0xTX1b7acd5c0e06"],
      fills: [
        {
          credit_id: "IN-NATURE-2020",
          tonnes: 0.1304,
          unit_price: 9.8,
          hold_id: "HOLD-5149ff20",
        },
        {
          credit_id: "IN-TECH-2021",
          tonnes: 0.1304,
          unit_price: 10.2,
          hold_id: "HOLD-fb38975c",
        },
        {
          credit_id: "NP-NATURE-2022",
          tonnes: 0.08,
          unit_price: 9.9,
          hold_id: "HOLD-84186227",
        },
      ],
    },
    retirements: {
      retirements: [
        {
          credit_id: "IN-NATURE-2020",
          tonnes: 0.1304,
          tx_hash: "0xRET728e8abb2ea1",
          proof_hash:
            "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
        },
        {
          credit_id: "IN-TECH-2021",
          tonnes: 0.1304,
          tx_hash: "0xRETf694c95a33a1",
          proof_hash:
            "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
        },
        {
          credit_id: "NP-NATURE-2022",
          tonnes: 0.08,
          tx_hash: "0xRET4e251ba8b584",
          proof_hash:
            "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
        },
      ],
    },
    proof_bundle_hash:
      "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
  },
};
export default function Ledger() {
  const { openTxToast } = useNotification();
  const { openPopup } = useTransactionPopup();

  // Replace with your actual chain ID if needed
  const CHAIN_ID = "11155111";

  const handleShowToast = async () => {
    if (retirements.length > 0) {
      await openTxToast(CHAIN_ID, retirements[0].id);
    }
  };

  const handleShowHistory = () => {
    openPopup({ chainId: CHAIN_ID });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ledger</h1>
        <p className="text-muted-foreground">
          Complete history of retired carbon credits
        </p>
      </div>

      {/* Existing Retirements */}
      <Card>
        <CardHeader>
          <CardTitle>Retired Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {retirements.map((retirement) => (
              <div
                key={retirement.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all group gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium mono text-sm">
                        {retirement.id.slice(0, 8)}...{retirement.id.slice(-6)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {retirement.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Credit ID: {retirement.creditId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 mono">
                      Proof: {retirement.proofHash.slice(0, 10)}...
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:ml-auto">
                  <div className="text-right">
                    <p className="font-bold mono">
                      {retirement.amount.toFixed(4)} tCO₂e
                    </p>
                    <p className="text-xs text-muted-foreground">Retired</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={`${BLOCKSCOUT_URL}/tx/${retirement.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Explorer</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleShowToast}
                    >
                      <History className="w-4 h-4" />
                      <span className="hidden sm:inline">Show Toast</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      disabled
                    >
                      <Lock className="w-4 h-4" />
                      <span className="hidden sm:inline">Proof</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {retirements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No retirement records yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 mb-6">
        <h2 className="text-xl font-bold">
          uAgents (Fetch.ai) Generated Trade
          <span className="ml-3 inline-block text-sm font-medium px-2 py-1 rounded bg-emerald-700/20 text-emerald-300">
            Demo agentic transaction
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Below is a demo trade produced by an agentic run showing the optimized
          basket, reservation holds, settlement transactions and retirements.
        </p>
      </div>

      {/* Trade Summary (demoTrade) */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-400">Order</p>
              <p className="font-mono">{demoTrade.trade.order_id}</p>
              <p className="text-sm text-neutral-400 mt-2">Run ID</p>
              <p className="font-mono">{demoTrade.trade.run_id}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Policy</p>
              <p className="font-medium">{demoTrade.trade.policy_name}</p>
              <p className="text-sm text-neutral-400 mt-2">Target</p>
              <p className="font-mono">{demoTrade.trade.target_tco2e} tCO₂e</p>
              <p className="text-sm text-neutral-400 mt-2">Expected Cost</p>
              <p className="font-mono">
                {demoTrade.trade.basket.expected_total_pyusd} PYUSD
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimized Basket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {demoTrade.trade.basket.lines.map((line) => (
              <div
                key={line.credit_id}
                className="flex items-center justify-between p-3 rounded-md border border-white/6 bg-[#0b1117]/40"
              >
                <div>
                  <div className="font-medium text-white">{line.credit_id}</div>
                  <div className="text-xs text-neutral-400">
                    {line.registry} · {line.project_id} · {line.country} ·{" "}
                    {line.vintage}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono">{line.tonnes} tCO₂e</div>
                  <div className="text-xs text-neutral-400">
                    ${line.unit_price_pyusd}/t · score {line.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reservation Holds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {demoTrade.trade.reservation_holds.map((hold) => (
              <div
                key={hold.hold_id}
                className="flex items-center justify-between p-3 rounded-md border border-white/6"
              >
                <div>
                  <div className="font-medium">{hold.hold_id}</div>
                  <div className="text-xs text-neutral-400">
                    Credit: {hold.credit_id} · Provider:{" "}
                    {hold.provider_id.slice(0, 12)}...
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono">{hold.tonnes} tCO₂e</div>
                  <div className="text-xs text-neutral-400">
                    ${hold.unit_price} · Expires:{" "}
                    {new Date(hold.expires_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settlement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-neutral-400 mb-2">Transactions</div>
              <div className="flex flex-col gap-2">
                {demoTrade.trade.settlement.tx_hashes.map((tx) => (
                  <a
                    key={tx}
                    href={`${BLOCKSCOUT_URL}/tx/${tx}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-emerald-300 underline"
                  >
                    {tx}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-neutral-400 mb-2">Fills</div>
              <div className="space-y-2">
                {demoTrade.trade.settlement.fills.map((fill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-md border border-white/6 bg-[#0b1117]/30"
                  >
                    <div>
                      <div className="font-medium">{fill.credit_id}</div>
                      <div className="text-xs text-neutral-400">
                        Hold: {fill.hold_id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">{fill.tonnes} tCO₂e</div>
                      <div className="text-xs text-neutral-400">
                        ${fill.unit_price} / t
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade Retirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {demoTrade.trade.retirements.retirements.map((r) => (
              <div
                key={r.tx_hash}
                className="flex items-center justify-between p-3 rounded-md border border-white/6"
              >
                <div>
                  <div className="font-medium">{r.credit_id}</div>
                  <div className="text-xs text-neutral-400">
                    Tonnes: {r.tonnes}
                  </div>
                </div>
                <div className="text-right">
                  <a
                    href={`${BLOCKSCOUT_URL}/tx/${r.tx_hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-emerald-300 underline"
                  >
                    {r.tx_hash}
                  </a>
                  <div className="text-xs text-neutral-400 mt-1">
                    Proof:{" "}
                    <span className="font-mono">
                      {r.proof_hash.slice(0, 12)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-neutral-400 mt-3">
            Proof bundle:{" "}
            <span className="font-mono">
              {demoTrade.trade.proof_bundle_hash}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Auditor Mode</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect an auditor wallet to decrypt Lit-encrypted proof bundles
                and verify attestations.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                Connect Auditor Wallet
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 ml-2"
                onClick={handleShowHistory}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">
                  View Transaction History
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

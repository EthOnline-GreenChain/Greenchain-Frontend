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
        <h1 className="text-3xl font-bold mb-2">Retirement Ledger</h1>
        <p className="text-muted-foreground">
          Complete history of retired carbon credits
        </p>
      </div>

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

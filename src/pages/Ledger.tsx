import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Lock } from "lucide-react";

const retirements = [
  {
    id: "0x742d...3a4f",
    amount: 25,
    date: "2025-01-15",
    provider: "Mixed Basket",
    proofHash: "0x891c...7b2d",
    status: "verified"
  },
  {
    id: "0x34fa...9c1e",
    amount: 20,
    date: "2024-12-20",
    provider: "Rainforest Alliance",
    proofHash: "0x12ab...5f3c",
    status: "verified"
  },
  {
    id: "0x56de...1a8b",
    amount: 30,
    date: "2024-11-18",
    provider: "Direct Air Capture",
    proofHash: "0x78cd...4e9a",
    status: "verified"
  },
];

export default function Ledger() {
  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Retirement Ledger</h1>
        <p className="text-muted-foreground">Complete history of retired carbon credits</p>
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
                      <p className="font-medium mono text-sm">{retirement.id}</p>
                      <Badge variant="outline" className="text-xs">
                        {retirement.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{retirement.provider}</p>
                    <p className="text-xs text-muted-foreground mt-1">{retirement.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:ml-auto">
                  <div className="text-right">
                    <p className="font-bold mono">{retirement.amount} tCO₂e</p>
                    <p className="text-xs text-muted-foreground">Retired</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Explorer</span>
                      </a>
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
                Connect an auditor wallet to decrypt Lit-encrypted proof bundles and verify attestations.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                Connect Auditor Wallet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

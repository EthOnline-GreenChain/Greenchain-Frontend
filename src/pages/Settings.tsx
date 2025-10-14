import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, Database, Key, ExternalLink } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your facilities and emission factors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Facilities
          </CardTitle>
          <CardDescription>Manage your monitored facilities and locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium">Hotel Lisboa</p>
                <p className="text-sm text-muted-foreground">Lisbon, Portugal</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Grid Region</p>
                <p className="font-medium mono">EU-PT</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Reading</p>
                <p className="font-medium">2 hours ago</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Add New Facility
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Emission Factors
          </CardTitle>
          <CardDescription>Data sources for carbon calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Primary Source</Label>
            <div className="flex gap-2">
              <Input value="EPA 2025 (US)" readOnly className="mono" />
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Environmental Protection Agency Emission Factors Hub
            </p>
          </div>

          <div className="space-y-2">
            <Label>Fallback Source</Label>
            <div className="flex gap-2">
              <Input value="UK Gov 2024" readOnly className="mono" />
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              UK Government Conversion Factors for Company Reporting
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Auditor Access
          </CardTitle>
          <CardDescription>Manage wallet addresses with audit permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm mono">0x742d35f8a9b2c1e4d6f7a3b8c9e1f2d4a5b6c7e8</p>
          </div>
          
          <div className="flex gap-2">
            <Input placeholder="Enter auditor wallet address" className="mono" />
            <Button variant="outline">Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="font-semibold">PYUSD Testnet Faucet</h3>
            <p className="text-sm text-muted-foreground">
              Get test PYUSD tokens on Sepolia network for demo purposes
            </p>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Get Test PYUSD
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

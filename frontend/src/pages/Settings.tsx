import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

export default function Settings() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Settings</h1>
          <p className="text-sm text-text-secondary">Configure platform preferences and defaults.</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[800px] mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-primary block mb-2">Theme</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                    <input type="radio" name="theme" defaultChecked className="text-primary bg-background border-border-strong focus:ring-primary" />
                    Dark
                  </label>
                  <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                    <input type="radio" name="theme" className="text-primary bg-background border-border-strong focus:ring-primary" />
                    Light
                  </label>
                  <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                    <input type="radio" name="theme" className="text-primary bg-background border-border-strong focus:ring-primary" />
                    System
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-primary bg-background border-border-strong focus:ring-primary h-4 w-4" />
                <div>
                  <div className="text-sm font-medium text-text-primary">Safe Validation Mode</div>
                  <div className="text-xs text-text-muted">Enforce isolated sandbox for all execution</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-primary bg-background border-border-strong focus:ring-primary h-4 w-4" />
                <div>
                  <div className="text-sm font-medium text-text-primary">Authorization Requirement</div>
                  <div className="text-xs text-text-muted">Require explicit authorization before testing</div>
                </div>
              </label>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
          <div className="pt-8 text-center text-xs text-text-muted">
            <p>WorldShield Security Assessment & Validation Platform</p>
            <p className="mt-1">Prototype for SIH PS 26163</p>
            <p className="mt-1">Version: 0.1 Prototype</p>
          </div>
        </div>
      </div>
    </div>
  );
}

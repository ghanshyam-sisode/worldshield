import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { ShieldCheck, ShieldAlert, FileText, Play } from 'lucide-react';

const categories = [
  { name: 'Authentication', tests: 42, passed: 40, potential: 1, confirmed: 1 },
  { name: 'Authorization', tests: 65, passed: 64, potential: 0, confirmed: 1 },
  { name: 'Input Validation', tests: 128, passed: 127, potential: 1, confirmed: 0 },
  { name: 'API Security', tests: 94, passed: 92, potential: 2, confirmed: 0 },
  { name: 'Client Security', tests: 34, passed: 34, potential: 0, confirmed: 0 },
  { name: 'Desktop / Tauri', tests: 24, passed: 23, potential: 0, confirmed: 1 },
];

const sampleTests = [
  { id: 'WM-AUTH-001', name: 'Cross-Tenant Authorization Boundary', category: 'Authorization', method: 'Static + Validation', status: 'Confirmed', evidence: true, lastRun: '09:14 PM' },
  { id: 'WM-AUTH-002', name: 'Vertical Privilege Escalation', category: 'Authorization', method: 'Static Analysis', status: 'Passed', evidence: false, lastRun: '09:14 PM' },
  { id: 'WM-AUTH-003', name: 'Insecure Direct Object Reference (IDOR)', category: 'Authorization', method: 'Static Analysis', status: 'Passed', evidence: false, lastRun: '09:14 PM' },
];

export default function SecurityTests() {
  const [selectedTest, setSelectedTest] = useState<any>(null);

  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Security Tests</h1>
            <p className="text-sm text-text-secondary">Execution history and results of assessment rules.</p>
          </div>
          <Button variant="primary">Run All Tests</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-medium text-text-muted mb-3 uppercase tracking-wider">Categories</h3>
            {categories.map((cat) => (
              <button 
                key={cat.name}
                className="w-full text-left p-3 rounded-xl border border-border bg-surface hover:border-border-strong transition-colors flex flex-col gap-2"
              >
                <div className="font-medium text-text-primary text-sm">{cat.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-text-muted">{cat.tests} tests</span>
                  {cat.confirmed > 0 && <span className="text-danger flex items-center gap-1"><ShieldAlert className="h-3 w-3"/> {cat.confirmed}</span>}
                  {cat.potential > 0 && <span className="text-warning flex items-center gap-1"><ShieldAlert className="h-3 w-3"/> {cat.potential}</span>}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-medium text-text-primary mb-2">Authorization Tests</h3>
            
            {sampleTests.map(test => (
              <Card key={test.id} className="hover:border-border-strong transition-colors">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-text-muted">{test.id}</span>
                      <h4 className="font-medium text-text-primary">{test.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                      <span>{test.method}</span>
                      <span>Last run: {test.lastRun}</span>
                      {test.evidence && <span className="flex items-center gap-1 text-info"><FileText className="h-3 w-3" /> Evidence Available</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={test.status === 'Confirmed' ? 'danger' : 'success'}>
                      {test.status}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTest(test)}>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </div>
      </div>

      {/* Test Detail Drawer */}
      {selectedTest && (
        <div className="absolute inset-y-0 right-0 w-full max-w-md bg-surface border-l border-border-strong shadow-2xl flex flex-col z-50 animate-in slide-in-from-right">
          <div className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0">
            <h3 className="font-semibold text-text-primary">{selectedTest.id}</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTest(null)}>Close</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h4 className="text-lg font-medium text-text-primary mb-1">{selectedTest.name}</h4>
              <Badge variant={selectedTest.status === 'Confirmed' ? 'danger' : 'success'}>{selectedTest.status}</Badge>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-text-muted mb-2">Purpose</h5>
              <p className="text-sm text-text-secondary leading-relaxed">
                Evaluates data-access endpoints to ensure that ownership boundaries are enforced and that tenants cannot read cross-tenant resources.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-text-muted mb-2">Detection Logic</h5>
              <div className="bg-surface-elevated border border-border p-3 rounded-lg text-xs font-mono text-text-secondary">
                MATCH endpoint WHERE public=true<br/>
                AND returns(sensitive_data)<br/>
                AND NOT contains(tenant_filter)
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button variant="outline" className="w-full gap-2">
                <Play className="h-4 w-4" /> Run Test Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

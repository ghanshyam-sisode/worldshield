import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockEvidence } from '@/data/index';
import { mockFindings } from '@/data/findings';
import { Search, Filter, ShieldCheck } from 'lucide-react';

export default function Evidence() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Evidence Library</h1>
            <p className="text-sm text-text-secondary">Searchable collection of source code, logs, and test evidence.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text"
                placeholder="Search evidence..."
                className="h-9 bg-surface-elevated border border-border rounded-md pl-9 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary w-64 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface border-b border-border-strong text-xs uppercase font-medium text-text-muted">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-xl">Evidence ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Finding</th>
                    <th className="px-6 py-4">Integrity</th>
                    <th className="px-6 py-4">Captured At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockEvidence.map((evidence) => {
                    const finding = mockFindings.find(f => f.id === evidence.findingId);
                    return (
                      <tr key={evidence.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-text-primary">
                          {evidence.id}
                        </td>
                        <td className="px-6 py-4">
                          {evidence.type}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-text-primary">{finding?.title || evidence.findingId}</div>
                          <div className="text-xs text-text-muted font-mono">{evidence.findingId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="success" className="gap-1.5">
                            <ShieldCheck className="h-3 w-3" /> {evidence.integrity}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {new Date(evidence.capturedAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

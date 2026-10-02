import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldAlert, ChevronRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { fetchApi } from '@/lib/api';
import type { ApiFinding } from '@/types';

export default function Findings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [findings, setFindings] = useState<ApiFinding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFindings = async () => {
      try {
        const data = await fetchApi('/findings/');
        // Handle case where data might be paginated or raw array
        setFindings(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to load findings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFindings();
  }, []);
  
  const filteredFindings = findings.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (f.component && f.component.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Security Findings</h1>
            <p className="text-sm text-text-secondary">7 Total • 2 Confirmed • 3 Needs Review • 2 Potential</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text"
                placeholder="Search findings..."
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
                    <th className="px-6 py-4 rounded-tl-xl">Finding</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Component</th>
                    <th className="px-6 py-4 rounded-tr-xl"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                        Loading findings...
                      </td>
                    </tr>
                  ) : filteredFindings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <ShieldAlert className="h-8 w-8 text-border-strong mx-auto mb-3" />
                        <div className="text-text-primary font-medium mb-1">No findings found</div>
                        <div className="text-text-muted text-sm">Try adjusting your search terms or filters.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredFindings.map((finding) => (
                      <tr key={finding.id} className="hover:bg-surface/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <Link to={`/findings/${finding.id}`} className="font-medium text-text-primary group-hover:text-primary transition-colors">
                              {finding.title}
                            </Link>
                            <span className="text-xs text-text-muted mt-1">{finding.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={finding.severity === 'High' ? 'danger' : 'warning'}>
                            {finding.severity}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={finding.status === 'Confirmed' || finding.status === 'confirmed' ? 'danger' : 'outline'}>
                            {finding.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-text-secondary font-mono text-xs">
                          {finding.component}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/findings/${finding.id}`}>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

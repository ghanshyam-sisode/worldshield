import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from '@/components/ui';
import { fetchApi } from '@/lib/api';
import { Plus, Search, Filter, ChevronRight, ShieldAlert } from 'lucide-react';
import type { ApiAssessment } from '@/types';

export default function Assessments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assessments, setAssessments] = useState<ApiAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const data = await fetchApi('/assessments/');
        setAssessments(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to load assessments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAssessments();
  }, []);

  const filteredAssessments = assessments.filter((a: ApiAssessment) => 
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (a.name && a.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Assessments</h1>
            <p className="text-sm text-text-secondary">Manage and review security assessments.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text"
                placeholder="Search assessments..."
                className="h-9 bg-surface-elevated border border-border rounded-md pl-9 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary w-64 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button variant="primary" className="gap-2" asChild>
              <Link to="/assessments/new">
                <Plus className="h-4 w-4" /> New Assessment
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex items-center gap-6 border-b border-border mb-6">
            <button className="text-sm font-medium text-primary border-b-2 border-primary py-2 px-1">All</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary py-2 px-1">Running</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary py-2 px-1">Completed</button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface border-b border-border-strong text-xs uppercase font-medium text-text-muted">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-xl">Assessment ID</th>
                    <th className="px-6 py-4">Target</th>
                    <th className="px-6 py-4">Snapshot</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Risk</th>
                    <th className="px-6 py-4">Started</th>
                    <th className="px-6 py-4 rounded-tr-xl"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-text-muted">
                        Loading assessments...
                      </td>
                    </tr>
                  ) : filteredAssessments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <ShieldAlert className="h-8 w-8 text-border-strong mx-auto mb-3" />
                        <div className="text-text-primary font-medium mb-1">No assessments found</div>
                        <div className="text-text-muted text-sm">Try adjusting your search terms or filters.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-surface/50 transition-colors group">
                        <td className="px-6 py-4">
                          <Link to={`/assessments/${assessment.id}`} className="font-mono font-medium text-text-primary group-hover:text-primary transition-colors">
                            {assessment.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-text-primary font-medium">
                          {assessment.name || assessment.target_id}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-text-secondary">
                          {assessment.snapshot_id ?? 'Latest'}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={assessment.status.toLowerCase() === 'completed' ? 'success' : 'outline'}>
                            {assessment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-medium text-text-primary">
                          {assessment.risk_score}
                        </td>
                        <td className="px-6 py-4 text-text-secondary text-xs">
                          {assessment.started_at ? new Date(assessment.started_at).toLocaleString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/assessments/${assessment.id}`}>
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

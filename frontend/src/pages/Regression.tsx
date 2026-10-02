import { Link } from 'react-router-dom';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { mockRegression, mockFindings } from '@/data/index';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function Regression() {
  const tests = mockRegression;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Security Regression</h1>
            <p className="text-sm text-text-secondary">Automated security controls enforcing previous remediations.</p>
          </div>
          <Button variant="primary">Run All Tests</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="text-sm text-text-muted mb-1">Total Tests</div>
                <div className="text-2xl font-bold text-text-primary">32</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-sm text-text-muted mb-1">Passing</div>
                <div className="text-2xl font-bold text-success">29</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-sm text-text-muted mb-1">Failing</div>
                <div className="text-2xl font-bold text-danger">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-sm text-text-muted mb-1">Coverage</div>
                <div className="text-2xl font-bold text-text-primary">91%</div>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface border-b border-border-strong text-xs uppercase font-medium text-text-muted">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-xl">Test Name</th>
                    <th className="px-6 py-4">Finding ID</th>
                    <th className="px-6 py-4">Version</th>
                    <th className="px-6 py-4">Result</th>
                    <th className="px-6 py-4">Last Run</th>
                    <th className="px-6 py-4 rounded-tr-xl"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tests.map((test) => (
                    <tr key={test.id} className="hover:bg-surface/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-text-primary">
                        {test.name}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/findings/${test.findingId}`} className="text-text-secondary hover:text-primary transition-colors font-mono text-xs">
                          {test.findingId}
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-text-muted">
                        {test.version}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={test.status === 'Passed' ? 'success' : 'danger'} className="gap-1.5">
                          {test.status === 'Passed' && <CheckCircle2 className="h-3 w-3" />}
                          {test.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-text-secondary text-xs">
                        {new Date(test.lastRun).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

export default function Compliance() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Compliance & Standards</h1>
          <p className="text-sm text-text-secondary">Mapping of findings to industry frameworks.</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Framework Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface border-b border-border-strong text-xs uppercase font-medium text-text-muted">
                    <tr>
                      <th className="px-6 py-4">Control</th>
                      <th className="px-6 py-4">Framework</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Finding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-surface/50">
                      <td className="px-6 py-4 font-medium text-text-primary">Broken Access Control</td>
                      <td className="px-6 py-4">OWASP Top 10</td>
                      <td className="px-6 py-4"><Badge variant="danger">Failed</Badge></td>
                      <td className="px-6 py-4 font-mono text-xs text-text-secondary">WS-2026-0001</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="px-6 py-4 font-medium text-text-primary">Injection</td>
                      <td className="px-6 py-4">OWASP Top 10</td>
                      <td className="px-6 py-4"><Badge variant="danger">Failed</Badge></td>
                      <td className="px-6 py-4 font-mono text-xs text-text-secondary">WS-2026-0002</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="px-6 py-4 font-medium text-text-primary">Security Misconfiguration</td>
                      <td className="px-6 py-4">OWASP Top 10</td>
                      <td className="px-6 py-4"><Badge variant="warning">Partial</Badge></td>
                      <td className="px-6 py-4 font-mono text-xs text-text-secondary">WS-2026-0003</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="px-6 py-4 font-medium text-text-primary">Cryptographic Failures</td>
                      <td className="px-6 py-4">OWASP Top 10</td>
                      <td className="px-6 py-4"><Badge variant="success">Passed</Badge></td>
                      <td className="px-6 py-4 font-mono text-xs text-text-secondary">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockRemediation, mockFindings } from '@/data/index';

export default function Remediation() {
  const remediation = mockRemediation[0];
  const finding = mockFindings[0];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Remediation</h1>
            <p className="text-sm text-text-secondary">Track and apply security fixes to confirmed findings.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Priority Action: {finding.title}</CardTitle>
                <div className="text-sm text-text-muted mt-1">{finding.component}</div>
              </div>
              <Badge variant="warning">{remediation.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Root Cause</h3>
                  <p className="text-sm text-text-secondary">{remediation.rootCause}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Recommendation</h3>
                  <p className="text-sm text-text-secondary">{remediation.recommendation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Proposed Patch</h3>
                <div className="rounded-xl border border-border overflow-hidden bg-background-secondary font-mono text-sm">
                  <div className="p-4 bg-danger/5 border-b border-border">
                    <div className="text-danger/80 mb-2 font-medium text-xs">// BEFORE</div>
                    <div className="text-danger/80 line-through">const rules = await ctx.db.query("alertRules").collect();</div>
                  </div>
                  <div className="p-4 bg-success/5">
                    <div className="text-success mb-2 font-medium text-xs">// AFTER</div>
                    <div className="text-success">+ const identity = await ctx.auth.getUserIdentity();</div>
                    <div className="text-success">+ if (!identity) throw new Error("Unauthenticated");</div>
                    <div className="text-success mt-2">+ const rules = await ctx.db.query("alertRules")</div>
                    <div className="text-success">+   .filter(q =&gt; q.eq(q.field("tenantId"), identity.tenantId))</div>
                    <div className="text-success">+   .collect();</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm">
                  <span className="text-text-muted">Owner: </span>
                  <span className="text-text-primary font-medium">{remediation.owner}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Request Review</Button>
                  <Button variant="primary" asChild>
                    <Link to={`/findings/${finding.id}/validation`}>Verify Fix in Sandbox</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Play, FileText, ArrowDownRight, ArrowUpRight, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { mockFindings, mockAssessments } from '@/data';

const riskData = [
  { name: 'WM-001', risk: 72 },
  { name: 'WM-002', risk: 64 },
  { name: 'WM-003', risk: 58 },
  { name: 'WM-004', risk: 49 },
  { name: 'WM-005', risk: 42 },
  { name: 'WM-006', risk: 38 },
];

const severityData = [
  { name: 'Critical', value: 0, color: '#FF3B5C' },
  { name: 'High', value: 2, color: '#FF6B6B' },
  { name: 'Medium', value: 5, color: '#F5B94C' },
  { name: 'Low', value: 0, color: '#6EA8FF' },
  { name: 'Info', value: 0, color: '#32D583' },
];

const coverageMatrix = [
  { domain: 'Authentication', tests: 24, passed: 22, findings: 2, coverage: 95 },
  { domain: 'Authorization', tests: 45, passed: 43, findings: 2, coverage: 100 },
  { domain: 'API Security', tests: 82, passed: 79, findings: 3, coverage: 92 },
  { domain: 'Data & Privacy', tests: 18, passed: 18, findings: 0, coverage: 85 },
];

export default function Overview() {
  const latestAssessment = mockAssessments[0];
  const recentFindings = mockFindings.slice(0, 5);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">Security Overview</h1>
          <p className="text-text-secondary mt-1">World Monitor security posture across the latest assessment</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
            <div className="flex items-center gap-1.5"><Badge variant="outline">Target: World Monitor</Badge></div>
            <div className="flex items-center gap-1.5"><Badge variant="outline">Snapshot: 16d0a12e</Badge></div>
            <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Last assessed: just now</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> View Report
          </Button>
          <Button variant="primary" className="gap-2" onClick={() => window.location.href='/assessments/new'}>
            <Play className="h-4 w-4" /> Run Assessment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-surface-elevated">
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">Overall Risk</div>
            <div className="text-3xl font-bold text-text-primary mb-2">38 <span className="text-sm font-normal text-text-muted">/ 100</span></div>
            <div className="flex items-center text-xs text-success font-medium">
              <ArrowDownRight className="h-3 w-3 mr-1" /> 14% from previous
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">Findings</div>
            <div className="text-3xl font-bold text-text-primary mb-2">7</div>
            <div className="text-xs text-text-muted">Total identified issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-danger mb-2">2</div>
            <div className="text-xs text-text-muted">Requires immediate action</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">High Severity</div>
            <div className="text-3xl font-bold text-warning mb-2">2</div>
            <div className="text-xs text-text-muted">Potential critical impact</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">Coverage</div>
            <div className="text-3xl font-bold text-text-primary mb-2">87%</div>
            <div className="flex items-center text-xs text-success font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 5% from previous
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-5">
            <div className="text-sm font-medium text-text-muted mb-1">Regression</div>
            <div className="text-3xl font-bold text-text-primary mb-2">91%</div>
            <div className="text-xs text-text-muted">Pass rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232B36" vertical={false} />
                  <XAxis dataKey="name" stroke="#707B89" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#707B89" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161C24', borderColor: '#303B49', borderRadius: '8px' }}
                    itemStyle={{ color: '#F4F7FA' }}
                  />
                  <Line type="monotone" dataKey="risk" stroke="#4F8CFF" strokeWidth={3} dot={{ r: 4, fill: '#4F8CFF', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Findings by Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232B36" vertical={false} />
                  <XAxis dataKey="name" stroke="#707B89" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#707B89" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ fill: '#161C24' }}
                    contentStyle={{ backgroundColor: '#161C24', borderColor: '#303B49', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coverage Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coverageMatrix.map((item) => (
                <div key={item.domain}>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{item.domain}</span>
                    <span className="text-text-muted">{item.coverage}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${item.coverage}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-text-muted">
                    <span>{item.tests} Checks</span>
                    <span>{item.findings > 0 ? `${item.findings} Findings` : 'Passed'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Findings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Findings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/findings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {recentFindings.map((finding) => (
                <Link to={`/findings/${finding.id}`} key={finding.id} className="block group">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-elevated group-hover:border-border-strong transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {finding.severity === 'High' || finding.severity === 'Critical' ? (
                          <ShieldAlert className="h-4 w-4 text-danger" />
                        ) : (
                          <ShieldAlert className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">{finding.title}</div>
                        <div className="text-xs text-text-muted mt-1">{finding.component}</div>
                      </div>
                    </div>
                    <Badge variant={finding.status === 'Confirmed' ? 'danger' : 'outline'}>
                      {finding.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

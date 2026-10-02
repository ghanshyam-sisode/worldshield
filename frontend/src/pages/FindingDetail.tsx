import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ChevronRight, Activity, Code2, AlertTriangle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockFindings } from '@/data/findings';
import { CodeViewer } from '@/components/code/CodeViewer';
import { mockEvidence } from '@/data/index';
import { useState } from 'react';

export default function FindingDetail() {
  const { findingId } = useParams();
  const navigate = useNavigate();
  const finding = mockFindings.find(f => f.id === findingId) || mockFindings[0];
  const evidence = mockEvidence.find(e => e.findingId === finding.id);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <Link to="/findings" className="hover:text-text-primary transition-colors">Findings</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-text-primary">{finding.id}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={finding.severity === 'High' ? 'danger' : 'warning'} className="text-sm px-3 py-1 uppercase">
                  {finding.severity}
                </Badge>
                <h1 className="text-2xl font-semibold tracking-tight text-text-primary">{finding.title}</h1>
              </div>
              <div className="flex items-center gap-3 mt-4 text-sm">
                <Badge variant="outline" className="text-text-primary font-medium">{finding.status}</Badge>
                {finding.context === 'benchmark' && (
                  <Badge variant="info" className="bg-info/10 text-info">Historical Benchmark</Badge>
                )}
                <span className="text-text-muted flex items-center gap-1.5">
                  <Activity className="h-4 w-4" /> Confidence: {finding.confidence}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <Button variant="outline" onClick={() => setActiveTab('evidence')}>View Evidence</Button>
              <Button variant="primary" onClick={() => navigate(`/findings/${finding.id}/validation`)}>Run Validation</Button>
            </div>
          </div>
          
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 py-4 border-t border-border">
            <div>
              <div className="text-xs text-text-muted mb-1 font-medium">Component</div>
              <div className="text-sm text-text-primary font-mono">{finding.component}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1 font-medium">Assessment</div>
              <div className="text-sm text-text-primary">{finding.assessmentId}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1 font-medium">Snapshot</div>
              <div className="text-sm text-text-primary font-mono">{finding.snapshot || 'main'}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1 font-medium">Category</div>
              <div className="text-sm text-text-primary">{finding.category}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border-strong bg-background shrink-0 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex gap-6 overflow-x-auto hide-scrollbar">
          {['overview', 'evidence', 'reproduction', 'validation', 'risk', 'remediation', 'regression'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {finding.description}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      Unauthorized exposure of tenant-scoped alert information could weaken privacy boundaries and reveal user-specific monitoring configurations. 
                      Potential consequences include confidential information disclosure, cross-tenant privacy violation, and loss of trust.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerability Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs text-text-muted mb-1 font-medium">CVSS Score</div>
                      {finding.cvss ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="danger" className="text-sm px-2 py-0.5">{finding.cvss.score}</Badge>
                          <span className="text-xs text-text-muted font-mono">{finding.cvss.vector}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-text-secondary">Not assessed</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1 font-medium">CWE</div>
                      <div className="flex flex-wrap gap-1.5">
                        {finding.cwe?.map(cwe => (
                          <Badge key={cwe} variant="outline" className="text-xs">{cwe}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1 font-medium">OWASP</div>
                      <div className="flex flex-wrap gap-1.5">
                        {finding.owasp?.map(o => (
                          <Badge key={o} variant="outline" className="text-xs">{o}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* EVIDENCE TAB */}
          {activeTab === 'evidence' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {evidence ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-text-primary">Source Code Evidence</h3>
                    <CodeViewer 
                      code={evidence.content} 
                      language="typescript" 
                      filename={evidence.file}
                      lineStart={evidence.lineStart}
                      lineEnd={evidence.lineEnd}
                    />
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                      <Code2 className="h-12 w-12 text-border-strong mb-4" />
                      <p className="text-text-primary font-medium mb-1">No source evidence available</p>
                      <p className="text-sm text-text-muted">This finding was detected without attachable source snippets.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Integrity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-muted">ID</span>
                      <span className="text-text-primary font-mono">{evidence?.id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-muted">Source Snapshot</span>
                      <span className="text-text-primary font-mono">{finding.snapshot}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-muted">Captured</span>
                      <span className="text-text-primary">{evidence ? new Date(evidence.capturedAt).toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-muted">Status</span>
                      <Badge variant="success" className="text-xs">Verified</Badge>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-xs text-text-muted mb-1">SHA-256</div>
                      <div className="text-xs text-text-secondary font-mono break-all">{evidence?.hash || 'N/A'}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* VALIDATION TAB PREVIEW */}
          {activeTab === 'validation' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-surface border border-info/20 rounded-xl p-5 flex items-start gap-4">
                <ShieldAlert className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-1">SAFE VALIDATION MODE</h3>
                  <p className="text-sm text-text-secondary">This prototype performs no destructive or production exploitation. Validation is executed in an isolated local sandbox.</p>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 text-sm flex-1">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mb-2">
                          <span className="text-text-primary font-bold">A</span>
                        </div>
                        <span className="text-text-muted">Tenant A</span>
                      </div>
                      <div className="flex-1 h-px bg-border-strong relative">
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-border-strong bg-background" />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center mb-2">
                          <ShieldAlert className="h-5 w-5 text-danger" />
                        </div>
                        <span className="text-text-muted">Authorization</span>
                      </div>
                      <div className="flex-1 h-px bg-border-strong relative">
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-border-strong bg-background" />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mb-2">
                          <span className="text-text-primary font-bold">B</span>
                        </div>
                        <span className="text-text-muted">Tenant B</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-elevated border-t border-border p-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-text-primary mb-1">Run Controlled Validation</div>
                      <div className="text-xs text-text-muted">Test the authorization boundary in the current sandbox.</div>
                    </div>
                    <Button variant="primary" onClick={() => navigate(`/findings/${finding.id}/validation`)}>Start Validation</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDER */}
          {['reproduction', 'risk', 'remediation', 'regression'].includes(activeTab) && (
            <Card>
              <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                <Clock className="h-10 w-10 text-border-strong mb-4" />
                <p className="text-text-primary font-medium mb-1">Coming in next integration</p>
                <p className="text-sm text-text-muted">This section requires the full analysis engine.</p>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

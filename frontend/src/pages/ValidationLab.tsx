import { useState } from 'react';
import { ShieldAlert, CheckCircle2, ShieldX, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockValidation, mockFindings, mockRemediation } from '@/data/index';

export default function ValidationLab() {
  const validation = mockValidation[0];
  const finding = mockFindings[0];
  const remediation = mockRemediation[0];
  
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<'pending' | 'fail' | 'pass'>('pending');
  const [useRemediation, setUseRemediation] = useState(false);

  const runValidation = () => {
    setIsRunning(true);
    setResult('pending');
    
    // Simulate validation
    setTimeout(() => {
      setIsRunning(false);
      setResult(useRemediation ? 'pass' : 'fail');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Validation Lab</h1>
            <p className="text-sm text-text-secondary">Controlled validation of detected findings in isolated environments.</p>
          </div>
          <Badge variant="info" className="uppercase tracking-wider">Safe Sandbox Active</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1000px] mx-auto space-y-6">
          
          <div className="bg-surface-elevated border border-info/20 rounded-xl p-5 flex items-start gap-4 shadow-sm">
            <ShieldAlert className="h-6 w-6 text-info shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-text-primary mb-1">SAFE VALIDATION MODE</h3>
              <p className="text-sm text-text-secondary">This prototype performs no destructive or production exploitation. All validations execute in an isolated local harness with mock tenant data.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Target: {finding.title}</CardTitle>
                    <div className="text-sm text-text-muted mt-1">{finding.component}</div>
                  </div>
                  <Badge variant="outline" className="font-mono">{validation.id}</Badge>
                </CardHeader>
                <CardContent>
                  
                  <div className="bg-surface border border-border rounded-xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                      
                      {/* Identity */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Actor</div>
                        <div className="w-14 h-14 rounded-full bg-surface-elevated border border-border flex items-center justify-center shadow-sm">
                          <span className="text-text-primary font-bold">User A</span>
                        </div>
                        <span className="text-sm font-medium mt-2">Tenant A</span>
                      </div>
                      
                      <div className="hidden md:block flex-1 h-px bg-border-strong relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-2 text-xs text-text-muted">Requests</div>
                      </div>

                      {/* Boundary */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Boundary</div>
                        <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isRunning ? 'bg-info/10 border-info animate-pulse' :
                          result === 'fail' ? 'bg-danger/10 border-danger' : 
                          result === 'pass' ? 'bg-success/10 border-success' : 'bg-surface-elevated border-border'
                        }`}>
                           {isRunning ? <RefreshCw className="h-6 w-6 text-info animate-spin" /> : 
                           result === 'fail' ? <ShieldX className="h-6 w-6 text-danger" /> :
                           result === 'pass' ? <CheckCircle2 className="h-6 w-6 text-success" /> :
                           <ShieldAlert className="h-6 w-6 text-text-muted" />}
                        </div>
                        <span className="text-sm font-medium mt-2">Authorization</span>
                      </div>

                      <div className="hidden md:block flex-1 h-px bg-border-strong relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-2 text-xs text-text-muted">Target</div>
                      </div>

                      {/* Target Data */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Resource</div>
                        <div className="w-14 h-14 rounded-xl bg-surface-elevated border border-border flex items-center justify-center shadow-sm">
                          <Database className="h-6 w-6 text-text-primary" />
                        </div>
                        <span className="text-sm font-medium mt-2">Tenant B Data</span>
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={useRemediation}
                        onChange={(e) => {
                          setUseRemediation(e.target.checked);
                          setResult('pending');
                        }}
                        className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary bg-background"
                      />
                      <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">Apply simulated remediation patch</span>
                    </label>
                    <Button variant="primary" onClick={runValidation} disabled={isRunning} className="w-full sm:w-auto">
                      {isRunning ? 'Running...' : 'Execute Validation Test'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Result Panel */}
              {result !== 'pending' && (
                <Card className={`border-2 animate-in slide-in-from-bottom-4 fade-in ${result === 'fail' ? 'border-danger/50' : 'border-success/50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {result === 'fail' ? (
                        <ShieldX className="h-8 w-8 text-danger shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-8 w-8 text-success shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 ${result === 'fail' ? 'text-danger' : 'text-success'}`}>
                          VALIDATION {result === 'fail' ? 'FAILED' : 'PASSED'}
                        </h3>
                        <p className="text-sm font-medium text-text-primary mb-4">
                          {result === 'fail' ? 'Authorization boundary violated. Cross-tenant data was exposed.' : 'Unauthorized cross-tenant access prevented.'}
                        </p>
                        
                        <div className="bg-surface border border-border rounded-lg p-4 font-mono text-xs">
                          <div className="text-text-muted mb-2">// Test Execution Log</div>
                          <div className="text-text-primary">[{new Date().toLocaleTimeString()}] Authenticating as User A (Tenant A)</div>
                          <div className="text-text-primary">[{new Date().toLocaleTimeString()}] Attempting read operation on Tenant B alert rules</div>
                          {result === 'fail' ? (
                            <>
                              <div className="text-danger mt-2">[{new Date().toLocaleTimeString()}] 200 OK</div>
                              <div className="text-danger">[{new Date().toLocaleTimeString()}] Response contains 4 alert rules belonging to Tenant B</div>
                              <div className="text-danger font-bold mt-2">RESULT: VULNERABILITY CONFIRMED</div>
                            </>
                          ) : (
                            <>
                              <div className="text-success mt-2">[{new Date().toLocaleTimeString()}] 403 Forbidden</div>
                              <div className="text-success">[{new Date().toLocaleTimeString()}] Server enforced ownership scope. No data returned.</div>
                              <div className="text-success font-bold mt-2">RESULT: BOUNDARY ENFORCED</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Validation Context</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-text-muted mb-1 font-medium">Environment</div>
                    <div className="text-text-primary">{validation.environment}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1 font-medium">Expected Behavior</div>
                    <div className="text-text-primary">{validation.expectedResult}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1 font-medium">Safety Controls</div>
                    <ul className="space-y-1">
                      {validation.safetyChecks.map((check, i) => (
                        <li key={i} className="flex items-center gap-2 text-text-secondary">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy Database Icon since it's not imported at the top
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}

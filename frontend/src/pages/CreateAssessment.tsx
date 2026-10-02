import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';

const STEPS = ['Target', 'Authorization', 'Profile', 'Snapshot', 'Review'];

export default function CreateAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [targetType, setTargetType] = useState('benchmark');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [profile, setProfile] = useState('full');
  const [snapshot, setSnapshot] = useState('16d0a12e');

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      navigate('/assessments/WM-ASM-2026-001');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-8 shrink-0">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-2">Create New Assessment</h1>
          <p className="text-text-secondary text-sm">Configure target, scope, and validation parameters</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[800px] mx-auto">
          
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border-strong -z-10" />
            {STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              return (
                <div key={step} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                    isActive ? 'border-primary bg-primary text-background' :
                    isPast ? 'border-primary bg-surface text-primary' :
                    'border-border-strong bg-surface text-text-muted'
                  }`}>
                    {isPast ? <CheckCircle2 className="h-4 w-4" /> : (index + 1)}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>{step}</span>
                </div>
              );
            })}
          </div>

          <Card className="shadow-lg border-border-strong">
            <CardContent className="p-8 min-h-[400px] flex flex-col">
              
              {/* Step 1: Target */}
              {currentStep === 0 && (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="text-xl font-medium text-text-primary mb-1">Select Target</h2>
                    <p className="text-sm text-text-secondary">Choose the source or benchmark to assess.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      className={`p-4 rounded-xl border text-left transition-colors ${targetType === 'benchmark' ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-border-strong'}`}
                      onClick={() => setTargetType('benchmark')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-text-primary">Historical Benchmark</div>
                        {targetType === 'benchmark' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="text-sm text-text-muted">Use documented historical snapshot for validation.</div>
                    </button>
                    
                    <button 
                      className={`p-4 rounded-xl border text-left transition-colors ${targetType === 'git' ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-border-strong'}`}
                      onClick={() => setTargetType('git')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-text-primary">Git Repository</div>
                        {targetType === 'git' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="text-sm text-text-muted">Connect a repository for static analysis.</div>
                    </button>
                  </div>

                  {targetType === 'benchmark' && (
                    <div className="mt-6 p-4 bg-surface-elevated border border-border rounded-lg">
                      <div className="text-sm text-text-muted mb-1">Target Name</div>
                      <div className="font-medium text-text-primary">World Monitor</div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Authorization */}
              {currentStep === 1 && (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="text-xl font-medium text-text-primary mb-1">Scope & Authorization</h2>
                    <p className="text-sm text-text-secondary">Confirm authorization before proceeding.</p>
                  </div>
                  
                  <div className="bg-danger/10 border border-danger/20 rounded-xl p-5 flex items-start gap-4">
                    <ShieldAlert className="h-6 w-6 text-danger shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-danger mb-1">Authorization Required</h3>
                      <p className="text-sm text-danger/80">Security testing must only be performed against systems for which the assessor has explicit authorization. Unauthorized testing is strictly prohibited.</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start gap-3 p-4 border border-border rounded-lg bg-surface cursor-pointer hover:bg-surface-elevated transition-colors">
                      <input 
                        type="checkbox" 
                        className="mt-1 h-4 w-4 rounded border-border-strong text-primary focus:ring-primary bg-background"
                        checked={isAuthorized}
                        onChange={(e) => setIsAuthorized(e.target.checked)}
                      />
                      <div>
                        <div className="font-medium text-text-primary text-sm">I confirm that I am authorized to assess this target.</div>
                        <div className="text-xs text-text-muted mt-1">Target scope verified for local validation.</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Profile */}
              {currentStep === 2 && (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="text-xl font-medium text-text-primary mb-1">Assessment Profile</h2>
                    <p className="text-sm text-text-secondary">Select the security domains to evaluate.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {['Full World Monitor Assessment', 'Web Application Only', 'API Security'].map(p => (
                      <label key={p} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${profile === p.toLowerCase().split(' ')[0] ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-border-strong'}`}>
                        <input 
                          type="radio" 
                          name="profile"
                          className="h-4 w-4 text-primary focus:ring-primary bg-background"
                          checked={profile === p.toLowerCase().split(' ')[0]}
                          onChange={() => setProfile(p.toLowerCase().split(' ')[0])}
                        />
                        <span className="font-medium text-sm text-text-primary">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Snapshot */}
              {currentStep === 3 && (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="text-xl font-medium text-text-primary mb-1">Snapshot Version</h2>
                    <p className="text-sm text-text-secondary">Select the codebase version for the assessment.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Assessment Mode</label>
                      <select className="w-full bg-surface-elevated border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Historical Benchmark</option>
                        <option>Current (main)</option>
                        <option>Version Comparison</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Branch / Tag / Commit</label>
                      <input 
                        type="text" 
                        value={snapshot}
                        onChange={(e) => setSnapshot(e.target.value)}
                        className="w-full bg-surface-elevated border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 4 && (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="text-xl font-medium text-text-primary mb-1">Review & Create</h2>
                    <p className="text-sm text-text-secondary">Verify assessment parameters before running.</p>
                  </div>
                  
                  <div className="bg-surface-elevated border border-border rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-text-muted">Target</span>
                      <span className="text-sm font-medium text-text-primary">World Monitor ({targetType})</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-text-muted">Scope</span>
                      <Badge variant="success">Authorized</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-text-muted">Profile</span>
                      <span className="text-sm font-medium text-text-primary">Full Assessment</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-text-muted">Snapshot</span>
                      <Badge variant="info" className="font-mono">{snapshot}</Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(curr => Math.max(0, curr - 1))}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                  disabled={currentStep === 1 && !isAuthorized}
                  className="gap-2"
                >
                  {currentStep === STEPS.length - 1 ? 'Create Assessment' : 'Continue'}
                  {currentStep < STEPS.length - 1 && <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

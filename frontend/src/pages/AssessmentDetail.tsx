import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ChevronRight, CheckCircle2, ShieldAlert, CircleDashed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockAssessments } from '@/data/assessments';

export default function AssessmentDetail() {
  const { assessmentId } = useParams();
  const assessment = mockAssessments.find(a => a.id === assessmentId) || mockAssessments[0];
  
  const [progress, setProgress] = useState(assessment.progress);
  const [status, setStatus] = useState(assessment.status);
  
  // Simulate progress
  useEffect(() => {
    if (status === 'Running' && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => Math.min(100, p + Math.floor(Math.random() * 15) + 5));
      }, 800);
      return () => clearTimeout(timer);
    } else if (progress === 100 && status === 'Running') {
      setStatus('Completed');
    }
  }, [progress, status]);

  const handleStart = () => {
    if (status === 'Completed') {
      setProgress(0);
      setStatus('Running');
    } else if (status === 'Draft' || status === 'Paused') {
      setStatus('Running');
    }
  };

  const stages = [
    { name: 'Discovery', threshold: 10 },
    { name: 'Authentication', threshold: 25 },
    { name: 'Authorization', threshold: 40 },
    { name: 'API Security', threshold: 55 },
    { name: 'Input Validation', threshold: 70 },
    { name: 'Client Security', threshold: 85 },
    { name: 'Dependencies', threshold: 95 },
    { name: 'Risk Engine', threshold: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-sm px-2 py-0.5 font-mono">{assessment.id}</Badge>
                <h1 className="text-2xl font-semibold tracking-tight text-text-primary">{assessment.name}</h1>
              </div>
              <div className="flex items-center gap-3 mt-4 text-sm">
                <Badge variant={status === 'Completed' ? 'success' : status === 'Running' ? 'info' : 'outline'}>{status}</Badge>
                <Badge variant="info" className="bg-info/10 text-info font-mono">Snapshot: {assessment.snapshot}</Badge>
                <span className="text-text-muted">{assessment.environment}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to={`/assessments/${assessment.id}/surface`}>Attack Surface</Link>
              </Button>
              <Button variant="primary" className="gap-2" onClick={handleStart} disabled={status === 'Running'}>
                <Play className="h-4 w-4" /> 
                {status === 'Completed' ? 'Run Again' : status === 'Running' ? 'Running...' : 'Start'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Assessment Progress</CardTitle>
                <span className="text-2xl font-bold text-text-primary">{progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-surface-elevated rounded-full h-3 mb-8 border border-border">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500 ease-out relative" 
                  style={{ width: `${progress}%` }}
                >
                  {status === 'Running' && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-full">
                      <div className="w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stages.map((stage, i) => {
                  const isDone = progress >= stage.threshold;
                  const isCurrent = progress < stage.threshold && (i === 0 || progress >= stages[i-1].threshold);
                  
                  return (
                    <div key={stage.name} className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : isCurrent ? (
                        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-border-strong" />
                      )}
                      <span className={`text-sm font-medium ${isDone ? 'text-text-primary' : isCurrent ? 'text-primary' : 'text-text-muted'}`}>
                        {stage.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Findings Summary</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/assessments/${assessment.id}/findings`}>View All <ChevronRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </CardHeader>
              <CardContent>
                {progress === 100 ? (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="bg-surface-elevated border border-border rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-text-primary mb-1">{assessment.findingCount}</div>
                      <div className="text-xs text-text-muted uppercase tracking-wider font-medium">Total</div>
                    </div>
                    <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-danger mb-1">{assessment.confirmedCount}</div>
                      <div className="text-xs text-danger/80 uppercase tracking-wider font-medium">Confirmed</div>
                    </div>
                    <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-warning mb-1">3</div>
                      <div className="text-xs text-warning/80 uppercase tracking-wider font-medium">Needs Review</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center border border-dashed border-border-strong rounded-xl text-text-muted text-sm">
                    Analysis in progress...
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs text-text-muted mb-1 font-medium">Profile</div>
                  <div className="text-sm text-text-primary">{assessment.profile}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1 font-medium">Target</div>
                  <div className="text-sm text-text-primary">{assessment.target}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1 font-medium">Tests Executed</div>
                  <div className="text-sm text-text-primary">{progress === 100 ? assessment.tests : '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1 font-medium">Risk Score</div>
                  <div className="text-sm text-text-primary font-bold">{progress === 100 ? assessment.riskScore : '-'} / 100</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

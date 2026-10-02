import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockAssessments, mockFindings } from '@/data/index';
import { FileText, Download, Printer, Share2 } from 'lucide-react';

export default function Reports() {
  const assessment = mockAssessments[0];
  const findings = mockFindings;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadJson = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ assessment, findings }, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `WorldShield_Report_${assessment.id}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setIsGenerating(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-background print:bg-white print:text-black">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0 print:hidden">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Reports</h1>
            <p className="text-sm text-text-secondary">Executive and technical security reports.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" /> Print PDF
            </Button>
            <Button variant="primary" className="gap-2" onClick={handleDownloadJson} disabled={isGenerating}>
              <Download className="h-4 w-4" /> {isGenerating ? 'Generating...' : 'Export JSON'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 print:p-0 print:overflow-visible">
        <div className="max-w-[1000px] mx-auto">
          
          <Card className="print:border-none print:shadow-none bg-surface">
            <CardContent className="p-8 md:p-12 space-y-10">
              
              <div className="text-center border-b border-border pb-8">
                <div className="inline-flex items-center gap-2 text-primary mb-4 print:text-black">
                  <span className="font-bold text-2xl tracking-tight">WorldShield Lab</span>
                </div>
                <h1 className="text-3xl font-bold text-text-primary print:text-black mb-2">Executive Security Report</h1>
                <p className="text-text-secondary print:text-gray-600">World Monitor Assessment • {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-text-primary print:text-black border-b border-border pb-2">1. Executive Summary</h2>
                <p className="text-sm text-text-secondary print:text-gray-800 leading-relaxed">
                  The assessment evaluated World Monitor across authentication, authorization, API, client, desktop, dependency, and data-protection surfaces. 
                  The benchmark assessment produced 7 findings, including 2 high-severity items and 2 validated security issues. 
                  The highest-priority finding involved a historical authorization boundary failure that allowed cross-tenant alert-rule exposure in the affected snapshot. 
                  Remediation and regression validation demonstrate the intended secure state.
                </p>
                <div className="mt-2 text-xs font-bold text-warning uppercase">DEMO / BENCHMARK DATA</div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-text-primary print:text-black border-b border-border pb-2">2. Assessment Scope</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted print:text-gray-500 block mb-1">Target</span>
                    <span className="font-medium text-text-primary print:text-black">{assessment.target}</span>
                  </div>
                  <div>
                    <span className="text-text-muted print:text-gray-500 block mb-1">Snapshot</span>
                    <span className="font-medium text-text-primary font-mono print:text-black">{assessment.snapshot}</span>
                  </div>
                  <div>
                    <span className="text-text-muted print:text-gray-500 block mb-1">Methodology</span>
                    <span className="font-medium text-text-primary print:text-black">Static Analysis, Safe Local Validation</span>
                  </div>
                  <div>
                    <span className="text-text-muted print:text-gray-500 block mb-1">Overall Risk Score</span>
                    <span className="font-medium text-text-primary print:text-black">{assessment.riskScore} / 100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-text-primary print:text-black border-b border-border pb-2">3. Key Findings</h2>
                <div className="space-y-4">
                  {findings.slice(0, 3).map((f) => (
                    <div key={f.id} className="p-4 border border-border rounded-lg bg-background print:bg-white print:border-gray-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={f.severity === 'High' ? 'danger' : 'warning'} className="print:bg-black print:text-white print:border-none">
                          {f.severity}
                        </Badge>
                        <span className="font-bold text-text-primary print:text-black">{f.title}</span>
                      </div>
                      <p className="text-sm text-text-secondary print:text-gray-800">{f.description}</p>
                      <div className="mt-3 text-xs text-text-muted print:text-gray-500 font-mono">
                        Component: {f.component}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ShieldAlert, CheckCircle2, ShieldX, Database, Globe, Monitor, Smartphone, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { mockFindings } from '@/data/findings';

const initialNodes = [
  { id: 'client', position: { x: 250, y: 50 }, data: { label: 'Browser / Client', type: 'external', exposure: 'High' } },
  { id: 'edge', position: { x: 250, y: 150 }, data: { label: 'Vercel Edge', type: 'boundary', exposure: 'High' } },
  { id: 'api', position: { x: 250, y: 250 }, data: { label: 'REST / RPC', type: 'internal', exposure: 'Medium' } },
  { id: 'convex', position: { x: 250, y: 350 }, data: { label: 'Convex Data Layer', type: 'internal', exposure: 'Low', findings: 2 } },
  { id: 'desktop', position: { x: 500, y: 150 }, data: { label: 'Tauri Desktop', type: 'external', exposure: 'High', findings: 1 } },
  { id: 'sidecar', position: { x: 500, y: 250 }, data: { label: 'Railway Sidecar', type: 'boundary', exposure: 'Medium' } },
  { id: 'oauth', position: { x: 50, y: 250 }, data: { label: 'OAuth Provider', type: 'external', exposure: 'High', findings: 2 } },
];

const initialEdges = [
  { id: 'e1', source: 'client', target: 'edge', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
  { id: 'e2', source: 'edge', target: 'api', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
  { id: 'e3', source: 'api', target: 'convex', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
  { id: 'e4', source: 'desktop', target: 'sidecar', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
  { id: 'e5', source: 'sidecar', target: 'api', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
  { id: 'e6', source: 'edge', target: 'oauth', markerEnd: { type: MarkerType.ArrowClosed, color: '#303B49' }, style: { stroke: '#303B49', strokeWidth: 2 } },
];

export default function AttackSurface() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(nodes[3]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Attack Surface</h1>
            <p className="text-sm text-text-secondary">Discovered components, trust boundaries and security-sensitive interfaces.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Topology</Button>
            <Button variant="ghost">Data Flows</Button>
            <Button variant="ghost">Trust Boundaries</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Graph Area */}
        <div className="flex-1 relative border-r border-border-strong bg-[#090c10]">
          <ReactFlow 
            nodes={nodes} 
            edges={edges}
            fitView
            onNodeClick={(_, node) => setSelectedNode(node)}
            className="worldshield-flow"
          >
            <Background color="#232B36" gap={16} size={1} />
            <Controls className="bg-surface border border-border fill-text-primary" />
          </ReactFlow>
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="outline" className="bg-surface/80 backdrop-blur-sm">UNTRUSTED</Badge>
            <Badge variant="outline" className="bg-surface/80 backdrop-blur-sm">TRUST BOUNDARY</Badge>
          </div>
        </div>

        {/* Node Detail Sidebar */}
        <div className="w-full md:w-80 bg-surface overflow-y-auto shrink-0 flex flex-col">
          {selectedNode ? (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center">
                  {selectedNode.data.type === 'external' ? <Globe className="h-5 w-5 text-text-muted" /> :
                   selectedNode.data.label.includes('Data') ? <Database className="h-5 w-5 text-text-muted" /> :
                   selectedNode.data.label.includes('Desktop') ? <Monitor className="h-5 w-5 text-text-muted" /> :
                   <Server className="h-5 w-5 text-text-muted" />}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedNode.data.label}</h3>
                  <div className="text-xs text-text-muted capitalize">{selectedNode.data.type} Component</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-text-muted mb-1 font-medium">Exposure Level</div>
                  <Badge variant={selectedNode.data.exposure === 'High' ? 'danger' : selectedNode.data.exposure === 'Medium' ? 'warning' : 'outline'}>
                    {selectedNode.data.exposure}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-elevated border border-border rounded-lg p-3">
                    <div className="text-xl font-bold text-text-primary mb-1">18</div>
                    <div className="text-xs text-text-muted">Security Tests</div>
                  </div>
                  <div className={`border rounded-lg p-3 ${selectedNode.data.findings > 0 ? 'bg-danger/5 border-danger/20' : 'bg-surface-elevated border-border'}`}>
                    <div className={`text-xl font-bold mb-1 ${selectedNode.data.findings > 0 ? 'text-danger' : 'text-text-primary'}`}>
                      {selectedNode.data.findings || 0}
                    </div>
                    <div className="text-xs text-text-muted">Findings</div>
                  </div>
                </div>

                {selectedNode.data.findings > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Related Findings</h4>
                    <div className="space-y-2">
                      {mockFindings.filter(f => f.component.toLowerCase().includes(selectedNode.data.label.split(' ')[0].toLowerCase())).map(f => (
                        <div key={f.id} className="p-3 border border-border rounded-lg bg-surface-elevated">
                          <div className="text-xs font-medium text-text-primary mb-1 line-clamp-1">{f.title}</div>
                          <Badge variant={f.severity === 'High' ? 'danger' : 'warning'} className="text-[10px] px-1.5 py-0">
                            {f.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-text-muted">
              <Globe className="h-8 w-8 mb-3 opacity-50" />
              <p className="text-sm">Select a component to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

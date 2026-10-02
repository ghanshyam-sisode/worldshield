import { Card, CardContent } from '@/components/ui';
import { Activity as ActivityIcon } from 'lucide-react';

export default function Activity() {
  const events = [
    { id: 1, action: 'Report generated', detail: 'Executive Assessment', time: '2026-09-29 22:15 IST' },
    { id: 2, action: 'Regression passed', detail: 'Cross-Tenant Authorization', time: '2026-09-29 21:28 IST' },
    { id: 3, action: 'Validation completed', detail: 'VAL-0001', time: '2026-09-29 21:14 IST' },
    { id: 4, action: 'Evidence captured', detail: 'EV-0024', time: '2026-09-29 21:04 IST' },
    { id: 5, action: 'Finding confirmed', detail: 'WS-2026-0001', time: '2026-09-29 21:03 IST' },
    { id: 6, action: 'Assessment started', detail: 'WM-ASM-2026-001', time: '2026-09-29 21:00 IST' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-surface border-b border-border-strong px-6 py-6 md:px-8 shrink-0">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-1">Activity Log</h1>
          <p className="text-sm text-text-secondary">Audit trail of all system actions and events.</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[800px] mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="relative border-l border-border-strong ml-4 space-y-8">
                {events.map((event, index) => (
                  <div key={event.id} className="relative pl-6">
                    <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full border-2 border-surface bg-primary flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-background rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-text-primary">{event.action}</span>
                        <span className="text-xs text-text-muted">{event.time}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

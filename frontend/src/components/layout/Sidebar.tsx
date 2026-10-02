import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, Bug, TestTube2, AlertTriangle, ShieldCheck, FileText, Database, ShieldAlert, CheckCircle, ListChecks, Settings, Activity } from 'lucide-react';
import { cn } from '../ui';

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Overview', to: '/overview', icon: LayoutDashboard },
    ],
  },
  {
    label: 'ASSESSMENT',
    items: [
      { name: 'Assessments', to: '/assessments', icon: Search },
      { name: 'Attack Surface', to: '/assessments/WM-ASM-2026-001/surface', icon: Database },
      { name: 'Security Tests', to: '/assessments/WM-ASM-2026-001/tests', icon: TestTube2 },
    ],
  },
  {
    label: 'SECURITY',
    items: [
      { name: 'Findings', to: '/findings', icon: Bug },
      { name: 'Validation Lab', to: '/validation', icon: ShieldAlert },
      { name: 'Remediation', to: '/remediation', icon: ShieldCheck },
      { name: 'Regression', to: '/regression', icon: CheckCircle },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { name: 'Evidence', to: '/evidence', icon: FileText },
      { name: 'Reports', to: '/reports', icon: ListChecks },
      { name: 'Compliance', to: '/compliance', icon: AlertTriangle },
      { name: 'Activity', to: '/activity', icon: Activity },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Settings', to: '/settings', icon: Settings },
    ],
  }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-background border-r border-border-strong flex flex-col h-full">
      <div className="h-14 flex items-center px-4 border-b border-border-strong">
        <div className="flex items-center gap-2 text-text-primary">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg tracking-tight">WorldShield</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h4 className="px-4 text-xs font-semibold text-text-muted mb-2 tracking-wider">
              {group.label}
            </h4>
            <div className="space-y-0.5 px-2">
              {group.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-surface-elevated text-primary" 
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border-strong">
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-success"></div>
          <span className="text-text-secondary">System Operational</span>
        </div>
        <div className="mt-1 text-xs text-text-muted">v0.1 Prototype</div>
      </div>
    </div>
  );
}

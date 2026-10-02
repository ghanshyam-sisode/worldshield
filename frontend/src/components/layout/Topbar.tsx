import { Search, Bell, Target, ChevronDown } from 'lucide-react';
import { Button } from '../ui';
import { useLocation } from 'react-router-dom';

export default function Topbar() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <div className="h-14 bg-background border-b border-border-strong flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-text-muted capitalize">WorldShield</span>
        {pathParts.map((part, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-text-muted">/</span>
            <span className={i === pathParts.length - 1 ? "text-text-primary font-medium" : "text-text-secondary"}>
              {part.replace(/-/g, ' ')}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden md:flex gap-2 text-text-muted w-64 justify-start">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto text-xs bg-surface-elevated px-1.5 rounded border border-border">Ctrl K</kbd>
        </Button>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border rounded-md text-xs cursor-pointer hover:border-border-strong">
          <Target className="h-3.5 w-3.5 text-text-muted" />
          <div className="flex flex-col">
            <span className="text-text-primary font-medium leading-tight">World Monitor</span>
            <span className="text-text-muted leading-tight">16d0a12e (Benchmark)</span>
          </div>
          <ChevronDown className="h-3 w-3 text-text-muted ml-1" />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger"></span>
        </Button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
            SA
          </div>
        </div>
      </div>
    </div>
  );
}

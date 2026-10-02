import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex flex-col h-full bg-background items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold text-border-strong mb-4">404</div>
          <h1 className="text-xl font-medium text-text-primary mb-2">Page not found</h1>
          <p className="text-sm text-text-secondary mb-6">The requested WorldShield resource does not exist.</p>
          <Link to="/" className="text-sm text-primary hover:underline">
            Return to Overview
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

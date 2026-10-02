import type { Assessment } from '../types';

export const mockAssessments: Assessment[] = [
  {
    id: 'WM-ASM-2026-001',
    name: 'World Monitor Security Baseline Assessment',
    target: 'World Monitor',
    snapshot: '16d0a12e',
    environment: 'Isolated Local Sandbox',
    status: 'Completed',
    profile: 'Full World Monitor Assessment',
    authorization: true,
    progress: 100,
    tests: 248,
    findingCount: 7,
    confirmedCount: 2,
    riskScore: 38,
    startedAt: '2026-09-29T21:00:00Z',
    completedAt: '2026-09-29T21:40:00Z',
  }
];

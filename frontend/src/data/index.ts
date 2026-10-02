export * from './findings';
export * from './assessments';

export const mockValidation = [{
  id: 'VAL-0001',
  findingId: 'WS-2026-0001',
  environment: 'Local Sandbox',
  expectedResult: 'HTTP 403 Forbidden',
  safetyChecks: ['No production data', 'Mock auth token', 'Isolated network'],
}];

export const mockEvidence = [
  {
    id: 'EV-0024',
    findingId: 'WS-2026-0001',
    type: 'Source Code',
    file: 'convex/alertRules.ts',
    content: `export const listAlertRules = query({
  // BUG: No ownership/tenant boundary enforced
  handler: async (ctx) => {
    return await ctx.db.query("alertRules").collect();
  },
});`,
    lineStart: 12,
    lineEnd: 18,
    integrity: 'Verified',
    capturedAt: '2026-09-29T21:04:00Z',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
];

export const mockRemediation = [
  {
    id: 'REM-001',
    findingId: 'WS-2026-0001',
    status: 'Pending Review',
    owner: 'Dev Team',
    rootCause: 'The `listAlertRules` Convex query did not apply an ownership filter, allowing any authenticated session to read all tenant alert configurations.',
    recommendation: 'Add an identity check via `ctx.auth.getUserIdentity()` and filter the query by `tenantId` before returning results.',
  },
];

export const mockRegression = [
  { id: 'REG-001', name: 'TestCrossTenantAlertRead', findingId: 'WS-2026-0001', version: 'v1.4.2', status: 'Failed', lastRun: '2026-09-29T21:28:00Z' },
  { id: 'REG-002', name: 'TestTenantDataIsolation', findingId: 'WS-2026-0001', version: 'v1.4.2', status: 'Passed', lastRun: '2026-09-29T21:28:00Z' },
  { id: 'REG-003', name: 'TestVerticalPrivEsc', findingId: 'WS-2026-0002', version: 'v1.4.2', status: 'Passed', lastRun: '2026-09-29T21:30:00Z' },
  { id: 'REG-004', name: 'TestRateLimitBypass', findingId: 'WS-2026-0003', version: 'v1.4.2', status: 'Passed', lastRun: '2026-09-29T21:32:00Z' },
];

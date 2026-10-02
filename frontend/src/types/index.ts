export type SecurityCategory = 
  | 'Authentication'
  | 'Authorization'
  | 'Input Validation'
  | 'API Security'
  | 'Client Security'
  | 'Secure Communication'
  | 'Data & Privacy'
  | 'Desktop / Tauri'
  | 'Dependencies'
  | 'Secrets';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
export type Confidence = 'Confirmed' | 'High' | 'Medium' | 'Low';
export type FindingStatus = 'New' | 'Open' | 'In Review' | 'Confirmed' | 'Needs Review' | 'False Positive' | 'Accepted Risk' | 'Remediated' | 'Regression Passed' | 'Regression Failed';

export type AssessmentStatus = 'Draft' | 'Queued' | 'Running' | 'Paused' | 'Completed' | 'Partial' | 'Failed' | 'Archived';

export interface Finding {
  id: string;
  title: string;
  description: string;
  category: SecurityCategory;
  severity: Severity;
  confidence: Confidence;
  status: FindingStatus;
  component: string;
  file?: string;
  lineStart?: number;
  lineEnd?: number;
  assessmentId: string;
  targetId: string;
  snapshot?: string;
  context: "current" | "historical" | "benchmark" | "simulated";
  cwe: string[];
  owasp: string[];
  apiSecurity?: string[];
  asvs?: string[];
  cvss?: {
    version: string;
    score?: number;
    vector?: string;
    metrics?: Record<string, string>;
  };
  evidenceIds: string[];
  validationId?: string;
  remediationId?: string;
  regressionTestIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  name: string;
  target: string;
  snapshot: string;
  environment: string;
  status: AssessmentStatus;
  profile: string;
  authorization: boolean;
  progress: number;
  tests: number;
  findingCount: number;
  confirmedCount: number;
  riskScore: number;
  startedAt: string;
  completedAt?: string;
}

export interface Evidence {
  id: string;
  findingId: string;
  type: 'Source Code' | 'Request' | 'Response' | 'Screenshot' | 'Log' | 'Test Result' | 'Configuration' | 'Dependency Report' | 'Diff';
  source: string;
  file?: string;
  lineStart?: number;
  lineEnd?: number;
  content: string;
  request?: string;
  response?: string;
  hash: string;
  capturedAt: string;
  integrity: 'Verified' | 'Failed' | 'Unknown';
}

export interface ValidationRun {
  id: string;
  findingId: string;
  environment: string;
  mode: 'Safe Local Validation' | 'Remote Simulation';
  status: 'Pending' | 'Running' | 'Passed' | 'Failed' | 'Blocked';
  startedAt: string;
  completedAt?: string;
  expectedResult: string;
  observedResult: string;
  safetyChecks: string[];
}

export interface Remediation {
  id: string;
  findingId: string;
  rootCause: string;
  recommendation: string;
  priority: Severity;
  owner: string;
  status: 'Suggested' | 'In Progress' | 'Ready for Validation' | 'Verified' | 'Rejected' | 'Accepted Risk';
  implementationGuidance: string;
  validationCriteria: string;
}

export interface RegressionTest {
  id: string;
  findingId: string;
  name: string;
  status: 'Passed' | 'Failed' | 'Blocked' | 'Pending';
  lastRun: string;
  expected: string;
  observed: string;
  version: string;
  owner: string;
}

// ---------------------------------------------------------------------------
// API Response Types (snake_case, as returned by the FastAPI backend)
// ---------------------------------------------------------------------------
export interface ApiFinding {
  id: string;
  project_id: string;
  assessment_id: string;
  target_id: string;
  title: string;
  description?: string;
  category?: string;
  severity?: string;
  confidence?: string;
  status?: string;
  component?: string;
  file?: string;
  line_start?: number;
  line_end?: number;
  snapshot_id?: string;
  context?: string;
  cwe?: string[];
  owasp?: string[];
  cvss?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ApiAssessment {
  id: string;
  project_id: string;
  target_id: string;
  name: string;
  assessment_type: string;
  profile: string;
  environment: string;
  status: string;
  snapshot_id?: string;
  progress: number;
  risk_score: number;
  files_scanned: number;
  tests_total: number;
  tests_completed: number;
  finding_count: number;
  confirmed_count: number;
  needs_review_count: number;
  created_by?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}


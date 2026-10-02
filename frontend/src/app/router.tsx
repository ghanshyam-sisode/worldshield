import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import Overview from '@/pages/Overview';
import Assessments from '@/pages/Assessments';
import CreateAssessment from '@/pages/CreateAssessment';
import AssessmentDetail from '@/pages/AssessmentDetail';
import AttackSurface from '@/pages/AttackSurface';
import SecurityTests from '@/pages/SecurityTests';
import Findings from '@/pages/Findings';
import FindingDetail from '@/pages/FindingDetail';
import Evidence from '@/pages/Evidence';
import ValidationLab from '@/pages/ValidationLab';
import Remediation from '@/pages/Remediation';
import Regression from '@/pages/Regression';
import Reports from '@/pages/Reports';
import Compliance from '@/pages/Compliance';
import Activity from '@/pages/Activity';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: <Overview /> },
      { path: 'assessments', element: <Assessments /> },
      { path: 'assessments/new', element: <CreateAssessment /> },
      { path: 'assessments/:assessmentId', element: <AssessmentDetail /> },
      { path: 'assessments/:assessmentId/surface', element: <AttackSurface /> },
      { path: 'assessments/:assessmentId/tests', element: <SecurityTests /> },
      { path: 'assessments/:assessmentId/findings', element: <Findings /> },
      { path: 'assessments/:assessmentId/evidence', element: <Evidence /> },
      { path: 'assessments/:assessmentId/validation', element: <ValidationLab /> },
      { path: 'assessments/:assessmentId/remediation', element: <Remediation /> },
      { path: 'assessments/:assessmentId/regression', element: <Regression /> },
      { path: 'findings', element: <Findings /> },
      { path: 'findings/:findingId', element: <FindingDetail /> },
      { path: 'findings/:findingId/evidence', element: <Evidence /> },
      { path: 'findings/:findingId/validation', element: <ValidationLab /> },
      { path: 'findings/:findingId/remediation', element: <Remediation /> },
      { path: 'findings/:findingId/regression', element: <Regression /> },
      { path: 'validation', element: <ValidationLab /> },
      { path: 'remediation', element: <Remediation /> },
      { path: 'regression', element: <Regression /> },
      { path: 'reports', element: <Reports /> },
      { path: 'reports/:reportId', element: <Reports /> },
      { path: 'compliance', element: <Compliance /> },
      { path: 'evidence', element: <Evidence /> },
      { path: 'activity', element: <Activity /> },
      { path: 'settings/*', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

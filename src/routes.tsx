import { lazy } from 'react';

export const routes = [
    { path: '/', element: lazy(() => import('./pages/Dashboard')) },
    { path: '/risk', element: lazy(() => import('./pages/RiskAssessment')) },
    { path: '/workflow', element: lazy(() => import('./pages/Workflow')) },
];

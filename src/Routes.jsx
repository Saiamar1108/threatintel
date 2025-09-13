import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import LeadershipDashboard from './pages/leadership-dashboard';
import OperationsDashboard from './pages/operations-dashboard';
import ThreatDetailsPage from './pages/threat-details';
import AnalystDashboard from './pages/analyst-dashboard';
import DailyBriefing from './pages/daily-briefing';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalystDashboard />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/leadership-dashboard" element={<LeadershipDashboard />} />
        <Route path="/operations-dashboard" element={<OperationsDashboard />} />
        <Route path="/threat-details" element={<ThreatDetailsPage />} />
        <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
        <Route path="/daily-briefing" element={<DailyBriefing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

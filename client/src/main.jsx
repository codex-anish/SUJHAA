import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BeneficiaryDashboardLayout from './components/layouts/BeneficiaryDashBoardLayout.jsx';
import BeneficiaryDashboard from './components/BeneficiaryDashboard.jsx';
import NewProject from './components/NewProject';
import MyApplications from './components/MyApplications';
import Documents from './components/Documents';
import SkillTraining from './components/SkillTraining';
import FundStatus from './components/FundStatus';

const router = createBrowserRouter([
  {
    path: "/beneficiary",
    element: <BeneficiaryDashboardLayout />,
    children: [
      { path: 'dashboard', element: <BeneficiaryDashboard /> },
      { path: 'dashboard/newProject', element: <NewProject /> },
      { path: 'dashboard/beneficiaryApplications', element: <MyApplications /> },
      { path: 'dashboard/documents', element: <Documents /> },
      { path: 'dashboard/skillTraining', element: <SkillTraining /> },
      { path: 'dashboard/fundStatus', element: <FundStatus /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

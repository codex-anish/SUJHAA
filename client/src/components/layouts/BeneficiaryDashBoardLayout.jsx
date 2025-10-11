import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Bell,
  FileText,
  Wallet,
  GraduationCap,
  FolderOpen,
  LayoutDashboard,
  Home,
  Users,
  ClipboardCheck,
  ClipboardList
} from "lucide-react";

function DashboardLayout() {
  const location = useLocation();
  const officer = {
    name: "Rajesh Kumar",
    role: "Beneficiary",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbNog60dqdQy1pC8DVoHK93qp6zlr_3vGszg&s"
  };

  const linkClass = (path) =>
    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === path
      ? "bg-orange-50 text-orange-600 font-medium"
      : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://pmajay.dosje.gov.in/public/latest/images/logo.png"
              alt="PM-AJAY"
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">SUJHAA Portal</h1>
              <p className="text-xs text-gray-500">Grant in Aid under PM-AJAY</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <img
              src={officer.avatar}
              alt="Officer Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{officer.name}</p>
              <p className="text-xs text-gray-500">{officer.role}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link to="/beneficiary" className={linkClass("/beneficiary")}>
              <Home className="w-5 h-5" />
              <span>Overview</span>
            </Link>

            <Link to="/beneficiary/newProject" className={linkClass("/newProject")}>
              <Users className="w-5 h-5" />
              <span>Applications</span>
            </Link>

            <Link to="/beneficiary/fundStatus" className={linkClass("/fundStatus")}>
              <Wallet className="w-5 h-5" />
              <span>Funds</span>
            </Link>

            <Link to="/beneficiary/skillTraining" className={linkClass("/skillTraining")}>
              <ClipboardCheck className="w-5 h-5" />
              <span>Training</span>
            </Link>

            <Link to="/beneficiary/documents" className={linkClass("/documents")}>
              <ClipboardList className="w-5 h-5" />
              <span>Documents</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

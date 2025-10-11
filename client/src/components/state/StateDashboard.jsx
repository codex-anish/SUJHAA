import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const StateDashboard = () => {
    const [kpis, setKpis] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setKpis([
                { id: 1, title: "Total Beneficiaries", value: "1,24,560", tone: "info" },
                { id: 2, title: "Verified Beneficiaries", value: "98,341", tone: "success" },
                { id: 3, title: "Pending Beneficiaries", value: "26,219", tone: "warning" },
                { id: 4, title: "Funds Disbursed", value: "₹ 23.4 Cr", tone: "success" },
                { id: 5, title: "Funds Pending Disbursal", value: "₹ 4.6 Cr", tone: "danger" },
                { id: 6, title: "Training Enrollments", value: "6,842", tone: "info" },
            ]);

            setDistricts([
                { name: "District A", beneficiaries: 12340, verifiedPct: 82, fundsUtilized: 2.1, trainingCompletion: 72 },
                { name: "District B", beneficiaries: 9210, verifiedPct: 64, fundsUtilized: 1.3, trainingCompletion: 55 },
                { name: "District C", beneficiaries: 22410, verifiedPct: 91, fundsUtilized: 4.5, trainingCompletion: 88 },
            ]);

            setAuditLogs([
                { date: "11 Oct 2025", action: "Beneficiary Verified", officer: "Officer_A", details: "ID 25152-34" },
                { date: "10 Oct 2025", action: "Fund Released", officer: "Officer_B", details: "₹1.2 Cr" },
                { date: "09 Oct 2025", action: "AI Flag Reviewed", officer: "Officer_C", details: "32 Records" },
            ]);
        }, 500);
    }, []);

    const fundData = {
        labels: districts.map(d => d.name),
        datasets: [
            { label: 'Allocated Funds (Cr)', data: districts.map(d => d.fundsUtilized), backgroundColor: '#3b82f6' },
            { label: 'Disbursed Funds (Cr)', data: districts.map(d => d.fundsUtilized * 0.85), backgroundColor: '#10b981' }
        ]
    };

    const trainingData = {
        labels: districts.map(d => d.name),
        datasets: [
            { label: 'Training Completion %', data: districts.map(d => d.trainingCompletion), borderColor: '#f59e0b', backgroundColor: '#fbbf24', tension: 0.3, fill: false }
        ]
    };

    const verifiedPieData = {
        labels: districts.map(d => d.name),
        datasets: [
            { label: 'Verified %', data: districts.map(d => d.verifiedPct), backgroundColor: ['#10b981', '#f59e0b', '#3b82f6'] }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 20, bottom: 40, left: 10, right: 10 } },
        plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 } }, padding: 20 },
            title: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 10 } }, x: { ticks: { padding: 10 } } }
    };

    if (districts.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-lg font-semibold">Loading Dashboard...</div>;
    }

    return (
        <div className="flex-1 min-h-screen bg-gray-50 text-gray-800 flex flex-col">

            {/* Main Content */}
            <main className="p-4 md:p-6 space-y-6">
                {/* KPI Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kpis.map(kpi => (
                        <div key={kpi.id} className="rounded-xl border p-5 shadow-md bg-white flex justify-between items-center hover:shadow-lg transition">
                            <div>
                                <div className="text-sm text-gray-500">{kpi.title}</div>
                                <div className="text-2xl font-semibold mt-1">{kpi.value}</div>
                            </div>
                            <div className={`h-12 w-12 flex items-center justify-center rounded-full ${kpi.tone === 'success' ? 'bg-green-100 text-green-700' :
                                kpi.tone === 'danger' ? 'bg-red-100 text-red-700' :
                                    kpi.tone === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                <span className="text-lg">
                                    {kpi.tone === 'success' ? '✅' : kpi.tone === 'danger' ? '⚠️' : kpi.tone === 'warning' ? '💰' : 'ℹ️'}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Charts & Audit */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="rounded-xl border p-4 bg-white shadow-md" style={{ height: '320px' }}>
                            <h3 className="font-semibold text-lg mb-2">Fund Allocation & Disbursal</h3>
                            <Bar data={fundData} options={chartOptions} />
                        </section>

                        <section className="rounded-xl border p-4 bg-white shadow-md" style={{ height: '320px' }}>
                            <h3 className="font-semibold text-lg mb-2">Training Completion</h3>
                            <Line data={trainingData} options={chartOptions} />
                        </section>

                        <section className="rounded-xl border p-4 bg-white shadow-md">
                            <h3 className="font-semibold text-lg mb-2">Recent Actions / Audit Log</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-xs text-gray-500 uppercase">
                                        <tr>
                                            <th className="py-2 px-2 text-left">Date</th>
                                            <th className="py-2 px-2 text-left">Action</th>
                                            <th className="py-2 px-2 text-left">Officer</th>
                                            <th className="py-2 px-2 text-left">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auditLogs.map((log, idx) => (
                                            <tr key={idx} className="border-t hover:bg-gray-50 transition">
                                                <td className="py-2 px-2">{log.date}</td>
                                                <td className="py-2 px-2">{log.action}</td>
                                                <td className="py-2 px-2">{log.officer}</td>
                                                <td className="py-2 px-2">{log.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-xl border p-4 bg-white shadow-md">
                            <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Generate Report</button>
                            <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-3 hover:bg-green-700 transition">Send Notification</button>
                        </section>

                        <section className="rounded-xl border p-4 bg-white shadow-md">
                            <h3 className="font-semibold text-lg mb-2">Predictive Insights</h3>
                            <p className="text-gray-600">AI predicted fund utilization trends and upcoming beneficiary approvals.</p>
                        </section>

                        <section className="rounded-xl border p-4 bg-white shadow-md" style={{ height: '250px' }}>
                            <h3 className="font-semibold text-lg mb-2">Verified Beneficiaries Distribution</h3>
                            <Pie data={verifiedPieData} options={{ ...chartOptions, plugins: { legend: { position: 'bottom' } } }} />
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default StateDashboard;

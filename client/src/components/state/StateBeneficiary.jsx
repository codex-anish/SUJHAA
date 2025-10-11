import React, { useEffect, useState } from "react";
import { FaSearch, FaFilePdf, FaFileExcel, FaCheck, FaRedo } from "react-icons/fa";

const beneficiariesData = [
    { id: 1, name: "Ramesh Das", aadhaar: "XXXX1234", district: "Bhubaneswar", status: "Verified", verification: "AI + Manual", lastUpdate: "11 Oct", documents: { aadhaar: true, caste: true, income: true }, aiFlag: "blue" },
    { id: 2, name: "Sita Devi", aadhaar: "XXXX5678", district: "Cuttack", status: "Pending", verification: "AI", lastUpdate: "10 Oct", documents: { aadhaar: true, caste: false, income: true }, aiFlag: "yellow" },
    { id: 3, name: "Raju Kumar", aadhaar: "XXXX9101", district: "Puri", status: "Rejected", verification: "AI", lastUpdate: "09 Oct", documents: { aadhaar: true, caste: true, income: false }, aiFlag: "red" },
    { id: 4, name: "Sunita Roy", aadhaar: "XXXX1122", district: "Bhubaneswar", status: "Verified", verification: "Manual", lastUpdate: "11 Oct", documents: { aadhaar: true, caste: true, income: true }, aiFlag: "green" },
];

const StateBeneficiary = () => {
    const [beneficiaries, setBeneficiaries] = useState(beneficiariesData);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [selectedDocs, setSelectedDocs] = useState(null);

    const filteredData = beneficiaries.filter((b) => {
        const matchesSearch =
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.aadhaar.toLowerCase().includes(search.toLowerCase()) ||
            b.district.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || b.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleBulkAction = (action) => {
        if (action === "approve") {
            alert("Approved all AI-verified beneficiaries!");
        } else if (action === "reverify") {
            alert("Sent selected beneficiaries for re-verification!");
        } else if (action === "export") {
            alert("Exporting table to Excel...");
        }
    };

    const aiColorMap = {
        green: "bg-green-100 text-green-700",
        yellow: "bg-yellow-100 text-yellow-700",
        red: "bg-red-100 text-red-700",
        blue: "bg-blue-100 text-blue-700",
    };

    return (
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Beneficiary Management</h2>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 w-full sm:w-1/2">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name, Aadhaar, District..."
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "Verified", "Pending", "AI-Flagged", "Rejected"].map((f) => (
                        <button
                            key={f}
                            className={`px-3 py-1 rounded-lg font-medium border ${filter === f ? "bg-blue-900 text-white border-blue-950" : "bg-white text-gray-700 border-gray-300"
                                }`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => handleBulkAction("approve")}
                    className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    <FaCheck /> Approve All Verified
                </button>
                <button
                    onClick={() => handleBulkAction("reverify")}
                    className="flex items-center gap-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                >
                    <FaRedo /> Send for Re-verification
                </button>
                <button
                    onClick={() => handleBulkAction("export")}
                    className="flex items-center gap-1 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                >
                    <FaFileExcel /> Export to Excel
                </button>
            </div>

            {/* Beneficiary Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Aadhaar</th>
                            <th className="py-2 px-3 text-left">District</th>
                            <th className="py-2 px-3 text-left">Status</th>
                            <th className="py-2 px-3 text-left">Verification Mode</th>
                            <th className="py-2 px-3 text-left">Last Update</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((b) => (
                            <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                                <td className="py-2 px-3">{b.name}</td>
                                <td className="py-2 px-3">{b.aadhaar}</td>
                                <td className="py-2 px-3">{b.district}</td>
                                <td className="py-2 px-3">
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${aiColorMap[b.aiFlag]}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="py-2 px-3">{b.verification}</td>
                                <td className="py-2 px-3">{b.lastUpdate}</td>
                                <td className="py-2 px-3 flex gap-2">
                                    <button
                                        className="bg-blue-900 text-white px-3 py-1 rounded-lg hover:bg-blue-950 transition"
                                        onClick={() => setSelectedDocs(b.documents)}
                                    >
                                        <FaFilePdf /> View Docs
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Document Viewer */}
            {selectedDocs && (
                <div className="mt-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg mb-2">Document Viewer</h3>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(selectedDocs).map(([doc, available]) => (
                            <div key={doc} className="flex flex-col items-center border p-3 rounded-lg w-32">
                                <FaFilePdf className="text-red-500 text-3xl mb-1" />
                                <span className="capitalize">{doc}</span>
                                <span className={`mt-1 font-medium ${available ? "text-green-600" : "text-red-600"}`}>
                                    {available ? "Available" : "Missing"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StateBeneficiary;

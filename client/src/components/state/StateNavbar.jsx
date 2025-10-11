import React, { useState } from 'react';

const StateNavbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ add local state

    return (
        <div>
            {/* Top Navbar */}
            <header className="bg-blue-200 shadow px-6 py-4 flex justify-between items-center md:justify-between">
                <div className="flex items-center space-x-3">
                    <button className="md:hidden text-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>
                    <h1 className="text-lg md:text-2xl font-bold text-purple-950">SUJHAA</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="hidden sm:block text-gray-700 font-medium">State Officer</span>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Officer"
                        className="rounded-full border-2 border-blue-500 w-10 h-10"
                    />
                </div>
            </header>
        </div>
    );
};

export default StateNavbar;

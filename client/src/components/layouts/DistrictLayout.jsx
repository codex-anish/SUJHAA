import React from 'react'
import DistrictNavbar from '../district/DistrictNavbar';
import DistrictSidebar from '../district/DistrictSidebar';
import { Outlet } from 'react-router';

const DistrictLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <DistrictNavbar />
            <div className="flex">
                {/* Sidebar */}
                <DistrictSidebar />
                {/* Main content */}
                <div className="ml-[250px] p-6 bg-gray-50 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default DistrictLayout;
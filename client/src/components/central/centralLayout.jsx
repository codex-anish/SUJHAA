import React from 'react';
import centralNavbar from './centralNavbar';
import centralSidebar from './centralSidebar';
import centralDashBoard from './centralDashBoard';

const centralLayout = () => {
    return (
        <div>
            <centralNavbar />
            <div className='flex'>
                <centralSidebar />
                <centralDashBoard.jsx />
            </div>
        </div>
    )
}

export default centralLayout;
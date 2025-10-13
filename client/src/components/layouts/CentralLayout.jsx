import React from 'react';
import CentralNavbar from '../central/centralNavbar';
import CentralSidebar from '../central/centralSidebar';
import CentralDashBoard from '../central/centralDashBoard';


const CentralLayout = () => {
    return (
        <div>
            <CentralNavbar />
            <div className='flex'>
                <CentralSidebar />
                <CentralDashBoard />
            </div>
        </div>
    )
}

export default CentralLayout;


import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (

    
        <div>
          <Navbar></Navbar>
            {children}
            <Footer></Footer>
            
        </div>
    );
};

export default MainLayout;
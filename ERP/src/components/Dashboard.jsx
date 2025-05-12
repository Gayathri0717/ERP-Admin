import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import MainData from './MainData';
import Header1 from './Header1';
import Spinner from './Spinner';
const Dashboard = ({ activeTab, children }) => {

    const [onMobile, setOnMobile] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setOnMobile(true);
        }
    }, [])

    return (
        <>
         <Spinner/>
            <main className=" min-h-screen min-w-full">
               
                <Header1/>

                {!onMobile && <Sidebar activeTab={activeTab} />}
                {toggleSidebar && <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar}/>}

                <div className="ml-60 min-h-screen">
                    <div className="flex flex-col gap-6 m-8 pt-12 pb-6 overflow-hidden">
                        <button onClick={() => setToggleSidebar(true)} className="sm:hidden bg-gray-700 w-10 h-10 rounded-full shadow text-white flex items-center justify-center"><MenuIcon /></button>
                        {children}
                    </div>
                </div>
                {/* <MainData/> */}
            </main>
        </>
    );
};

export default Dashboard;

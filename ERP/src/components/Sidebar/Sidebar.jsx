// // import { Link, useNavigate } from 'react-router-dom';
// // import EqualizerIcon from '@mui/icons-material/Equalizer';
// // import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// // import InventoryIcon from '@mui/icons-material/Inventory';
// // import GroupIcon from '@mui/icons-material/Group';
// // import ReviewsIcon from '@mui/icons-material/Reviews';
// // import AddBoxIcon from '@mui/icons-material/AddBox';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import AccountBoxIcon from '@mui/icons-material/AccountBox';
// // import CloseIcon from '@mui/icons-material/Close';
// // import Avatar from '@mui/material/Avatar';
// // import { useDispatch, useSelector } from 'react-redux';
// // import './Sidebar.css';
// // import { useSnackbar } from 'notistack';
// // import { logoutUser } from '../../../actions/userAction';

// // const navMenu = [
// //     {
// //         icon: <EqualizerIcon />,
// //         label: "Dashboard",
// //         ref: "/admin/dashboard",
// //     },
// //     {
// //         icon: <ShoppingBagIcon />,
// //         label: "Orders",
// //         ref: "/admin/orders",
// //     },
// //     {
// //         icon: <InventoryIcon />,
// //         label: "Products",
// //         ref: "/admin/products",
// //     },
// //     {
// //         icon: <AddBoxIcon />,
// //         label: "Add Product",
// //         ref: "/admin/new_product",
// //     },
// //     {
// //         icon: <GroupIcon />,
// //         label: "Users",
// //         ref: "/admin/users",
// //     },
// //     {
// //         icon: <ReviewsIcon />,
// //         label: "Reviews",
// //         ref: "/admin/reviews",
// //     },
// //     {
// //         icon: <AccountBoxIcon />,
// //         label: "My Profile",
// //         ref: "/account",
// //     },
// //     {
// //         icon: <LogoutIcon />,
// //         label: "Logout",
// //     },
// // ];

// // const Sidebar = ({ activeTab, setToggleSidebar }) => {

// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const { enqueueSnackbar } = useSnackbar();

// //     const { user } = useSelector((state) => state.user);

// //     const handleLogout = () => {
// //         dispatch(logoutUser());
// //         enqueueSnackbar("Logout Successfully", { variant: "success" });
// //         navigate("/login");
// //     }

// //     return (
// //         <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">
// //             <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
// //                 <Avatar
// //                     alt="Avatar"
// //                     src={user.avatar.url}
// //                 />
// //                 <div className="flex flex-col gap-0">
// //                     <span className="font-medium text-lg">{user.name}</span>
// //                     <span className="text-gray-300 text-sm">{user.email}</span>
// //                 </div>
// //                 <button onClick={()=>setToggleSidebar(false)} className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
// //                     <CloseIcon/>
// //                 </button>
// //             </div>

// //             <div className="flex flex-col w-full gap-0 my-8">
// //                 {navMenu.map((item, index) => {
// //                     const { icon, label, ref } = item;
// //                     return (
// //                         <>
// //                             {label === "Logout" ? (
// //                                 <button onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
// //                                     <span>{icon}</span>
// //                                     <span>{label}</span>
// //                                 </button>
// //                             ) : (
// //                                 <Link to={ref} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
// //                                     <span>{icon}</span>
// //                                     <span>{label}</span>
// //                                 </Link>
// //                             )}
// //                         </>
// //                     )
// //                 }
// //                 )}
// //             </div>

// //             <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden">
// //                 <h5>Developed with ❤️ by:</h5>
// //                 <div className="flex flex-col gap-0">
// //                     <a href="https://www.linkedin.com/in/jigar-sable" target="_blank" rel="noreferrer" className="font-medium text-lg hover:text-blue-500">Jigar Sable</a>
// //                     <a href="mailto:jigarsable21@gmail.com" className="text-gray-300 text-sm hover:text-blue-500">jigarsable21@gmail.com</a>
// //                 </div>
// //             </div>
// //         </aside>
// //     )
// // };

// // export default Sidebar;
// import { Link, useNavigate } from 'react-router-dom';
// import EqualizerIcon from '@mui/icons-material/Equalizer';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import GroupIcon from '@mui/icons-material/Group';
// import ReviewsIcon from '@mui/icons-material/Reviews';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import CloseIcon from '@mui/icons-material/Close';
// import Avatar from '@mui/material/Avatar';
// import { useEffect, useState } from 'react';
// import './Sidebar.css';
// import { useSnackbar } from 'notistack';
// import Spinner from '../Spinner';

// const navMenu = [
//     {
//         icon: <EqualizerIcon />,
//         label: "Dashboard",
//         ref: "/admin/dashboard",
//     },
//     {
//         icon: <GroupIcon />,
//         label: "Users",
//         ref: "/admin/users",
//     },
//     {
//         icon: <ShoppingBagIcon />,
//         label: "Orders",
//         ref: "/admin/orders",
//     },
//     {
//         icon: <InventoryIcon />,
//         label: "Products",
//         ref: "/admin/products",
//     },
//     {
//         icon: <AddBoxIcon />,
//         label: "Add Product",
//         ref: "/admin/new_product",
//     },
//     {
//         icon: <InventoryIcon />,
//         label: "Categor",  // Change this label
//         ref: "/admin/category",  // Update the route to your add category page
//     },
//     {
//         icon: <AddBoxIcon />,
//         label: "Add Category",  // Change this label
//         ref: "/admin/add-category",  // Update the route to your add category page
//     },
//     {
//         icon: <ReviewsIcon />,
//         label: "Banner",
//         ref: "/admin/HomeTable",
//     },
//     {
//         icon: <ReviewsIcon />,
//         label: "Add Banner",
//         ref: "/admin/Home",
//     },

    
//     {
//         icon: <ReviewsIcon />,
//         label: "Reviews",
//         ref: "/admin/reviews",
//     },
//     {
//         icon: <ReviewsIcon />,
//         label: "Feedback",
//         ref: "/admin/Feedback",
//     },
   
   
    
// ];

// const Sidebar = ({ activeTab, setToggleSidebar }) => {
//     const navigate = useNavigate();
//     const { enqueueSnackbar } = useSnackbar();
//     const [user, setUser] = useState(null);

//     // Fetch user data
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
//                 if (!token) {
//                     enqueueSnackbar("No token found. Please log in.", { variant: "error" });
//                   // Redirect if no token
//                     return;
//                 }

//                 const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setUser(data.user);
//                 } else {
//                     enqueueSnackbar(data.message || "Failed to fetch user data", { variant: "error" });
//                 }
//             } catch (error) {
//                 enqueueSnackbar("Something went wrong while fetching user data", { variant: "error" });
//             }
//         };

//         fetchUserData();
//     }, [enqueueSnackbar, navigate]);

//     const handleLogout = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`, { // Adjust the API URL
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 enqueueSnackbar("Logout Successfully", { variant: "success" });
//                 localStorage.removeItem('token'); // Clear token
//                 navigate("/login");
//             } else {
//                 enqueueSnackbar(data.message || "Logout failed", { variant: "error" });
//             }
//         } catch (error) {
//             enqueueSnackbar("Something went wrong during logout", { variant: "error" });
//         }
//     };

//     return (
//         <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-[#041421] text-white overflow-x-hidden border-r">
//             <Spinner/>
//             {user && (
//                 <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
//                     <Avatar
//                         alt="Avatar"
//                         src={user.avatar?.url} // Use optional chaining in case avatar is not defined
//                     />
//                     <div className="flex flex-col gap-0">
//                         <span className="font-medium text-lg">{user.name}</span>
//                         <span className="text-gray-300 text-sm">{user.email}</span>
//                     </div>
//                     <button onClick={() => setToggleSidebar(false)} className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
//                         <CloseIcon />
//                     </button>
//                 </div>
//             )}

//             <div className="flex flex-col w-full gap-0 my-8">
//                 {navMenu.map((item, index) => {
//                     const { icon, label, ref } = item;
//                     return (
//                         <div key={index}>
//                             {label === "Logout" ? (
//                                 <button onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
//                                     <span>{icon}</span>
//                                     <span>{label}</span>
//                                 </button>
//                             ) : (
//                                 <Link to={ref} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
//                                     <span>{icon}</span>
//                                     <span>{label}</span>
//                                 </Link>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

            
//         </aside>
//     );
// };

// export default Sidebar;
import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
import Spinner from '../Spinner';

const navMenu = [
    { icon: <EqualizerIcon />, label: "Dashboard", ref: "/admin/dashboard" },
    { icon: <GroupIcon />, label: "Users", ref: "/admin/users" },
    { icon: <ShoppingBagIcon />, label: "Orders", ref: "/admin/orders" },
    { icon: <InventoryIcon />, label: "Products", ref: "/admin/products" },
    { icon: <AddBoxIcon />, label: "Add Product", ref: "/admin/new_product" },
    { icon: <InventoryIcon />, label: "Categories", ref: "/admin/category" },
    { icon: <AddBoxIcon />, label: "Add Category", ref: "/admin/add-category" },
    { icon: <ReviewsIcon />, label: "Banner", ref: "/admin/HomeTable" },
    { icon: <ReviewsIcon />, label: "Add Banner", ref: "/admin/Home" },
    { icon: <ReviewsIcon />, label: "Reviews", ref: "/admin/reviews" },
    { icon: <ReviewsIcon />, label: "Feedback", ref: "/admin/Feedback" },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
                if (!token) {
                    enqueueSnackbar("No token found. Please log in.", { variant: "error" });
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    enqueueSnackbar(data.message || "Failed to fetch user data", { variant: "error" });
                }
            } catch (error) {
                enqueueSnackbar("Something went wrong while fetching user data", { variant: "error" });
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchUserData();
    }, [enqueueSnackbar, navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar("Logout Successfully", { variant: "success" });
                localStorage.removeItem('token'); // Clear token
                navigate("/login");
            } else {
                enqueueSnackbar(data.message || "Logout failed", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Something went wrong during logout", { variant: "error" });
        }
    };

    return (
        <aside className="sidebar z-10  block min-h-screen fixed left-0 pb-14 max-h-screen w-[250px] bg-[#041421] text-white overflow-x-hidden border-r">
            {loading ? ( <Spinner /> ) : (
                <>
                    {user && (
                        <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
                            <Avatar
                                alt="Avatar"
                                src={user.avatar?.url} // Use optional chaining in case avatar is not defined
                            />
                            <div className="flex flex-col gap-0">
                                <span className="font-medium text-lg">{user.name}</span>
                                <span className="text-gray-300 text-sm">{user.email}</span>
                            </div>
                            <button onClick={() => setToggleSidebar(false)} className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
                                <CloseIcon />
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col w-full gap-0 my-8">
                        {navMenu.map((item, index) => {
                            const { icon, label, ref } = item;
                            return (
                                <div key={index}>
                                    {label === "Logout" ? (
                                        <button onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
                                            <span>{icon}</span>
                                            <span>{label}</span>
                                        </button>
                                    ) : (
                                        <Link to={ref} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
                                            <span>{icon}</span>
                                            <span>{label}</span>
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </aside>
    );
};

export default Sidebar;

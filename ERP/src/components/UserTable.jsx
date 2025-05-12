// // import { useEffect } from 'react';
// // import { DataGrid } from '@mui/x-data-grid';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useSnackbar } from 'notistack';
// // import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
// // import { DELETE_USER_RESET } from '../../constants/userConstants';
// // import Actions from './Actions';
// // import MetaData from '../Layouts/MetaData';
// // import BackdropLoader from '../Layouts/BackdropLoader';

// // const UserTable = () => {

// //     const dispatch = useDispatch();
// //     const { enqueueSnackbar } = useSnackbar();

// //     const { users, error } = useSelector((state) => state.users);
// //     const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);

// //     useEffect(() => {
// //         if (error) {
// //             enqueueSnackbar(error, { variant: "error" });
// //             dispatch(clearErrors());
// //         }
// //         if (deleteError) {
// //             enqueueSnackbar(deleteError, { variant: "error" });
// //             dispatch(clearErrors());
// //         }
// //         if (isDeleted) {
// //             enqueueSnackbar("User Deleted Successfully", { variant: "success" });
// //             dispatch({ type: DELETE_USER_RESET });
// //         }
// //         dispatch(getAllUsers());
// //     }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

// //     const deleteUserHandler = (id) => {
// //         dispatch(deleteUser(id));
// //     }

// //     const columns = [
// //         {
// //             field: "name",
// //             headerName: "Name",
// //             minWidth: 200,
// //             flex: 1,
// //             renderCell: (params) => {
// //                 return (
// //                     <div className="flex items-center gap-2">
// //                         <div className="w-10 h-10 rounded-full">
// //                             <img draggable="false" src={params.row.avatar} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
// //                         </div>
// //                         {params.row.name}
// //                     </div>
// //                 )
// //             },
// //         },
// //         {
// //             field: "email",
// //             headerName: "Email",
// //             minWidth: 200,
// //             flex: 0.2,
// //         },
// //         {
// //             field: "gender",
// //             headerName: "Gender",
// //             minWidth: 100,
// //             flex: 0.1,
// //         },
// //         {
// //             field: "role",
// //             headerName: "Role",
// //             minWidth: 100,
// //             flex: 0.2,
// //             renderCell: (params) => {
// //                 return (
// //                     <>
// //                         {
// //                             params.row.role === "admin" ? (
// //                                 <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800 capitalize">{params.row.role}</span>
// //                             ) : (
// //                                 <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize">{params.row.role}</span>
// //                             )
// //                         }
// //                     </>
// //                 )
// //             },
// //         },
// //         {
// //             field: "registeredOn",
// //             headerName: "Registered On",
// //             type: "date",
// //             minWidth: 150,
// //             flex: 0.2,
// //         },
// //         {
// //             field: "actions",
// //             headerName: "Actions",
// //             minWidth: 200,
// //             flex: 0.3,
// //             type: "number",
// //             sortable: false,
// //             renderCell: (params) => {
// //                 return (
// //                     <Actions editRoute={"user"} deleteHandler={deleteUserHandler} id={params.row.id} name={params.row.name} />
// //                 );
// //             },
// //         },
// //     ];

// //     const rows = [];

// //     users && users.forEach((item) => {
// //         rows.unshift({
// //             id: item._id,
// //             name: item.name,
// //             avatar: item.avatar.url,
// //             email: item.email,
// //             gender: item.gender.toUpperCase(),
// //             role: item.role,
// //             registeredOn: new Date(item.createdAt).toISOString().substring(0, 10),
// //         });
// //     });

// //     return (
// //         <>
// //             <MetaData title="Admin Users | Flipkart" />

// //             {loading && <BackdropLoader />}

// //             <h1 className="text-lg font-medium uppercase">users</h1>
// //             <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

// //                 <DataGrid
// //                     rows={rows}
// //                     columns={columns}
// //                     pageSize={10}
// //                     disableSelectIconOnClick
// //                     sx={{
// //                         boxShadow: 0,
// //                         border: 0,
// //                     }}
// //                 />
// //             </div>
// //         </>
// //     );
// // };

// // export default UserTable;

// import { useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
// import { DELETE_USER_RESET } from '../../constants/userConstants';
// import Actions from './Actions';


// const UserTable = () => {
//     const dispatch = useDispatch();
//     const { enqueueSnackbar } = useSnackbar();

//     const { users, error } = useSelector((state) => state.users);
//     const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);

//     useEffect(() => {
//         // Fetch all users on component mount
//         dispatch(getAllUsers());
//     }, [dispatch]);

//     useEffect(() => {
//         // Handle errors
//         if (error) {
//             enqueueSnackbar(error, { variant: "error" });
//             dispatch(clearErrors());
//         }

//         if (deleteError) {
//             enqueueSnackbar(deleteError, { variant: "error" });
//             dispatch(clearErrors());
//         }

//         if (isDeleted) {
//             enqueueSnackbar("User Deleted Successfully", { variant: "success" });
//             dispatch({ type: DELETE_USER_RESET });
//         }
//     }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

//     const deleteUserHandler = (id) => {
//         dispatch(deleteUser(id));
//     }

//     const columns = [
//         {
//             field: "name",
//             headerName: "Name",
//             minWidth: 200,
//             flex: 1,
//             renderCell: (params) => (
//                 <div className="flex items-center gap-2">
//                     <div className="w-10 h-10 rounded-full">
//                         <img
//                             draggable="false"
//                             src={params.row.avatar}
//                             alt={params.row.name}
//                             className="w-full h-full rounded-full object-cover"
//                         />
//                     </div>
//                     {params.row.name}
//                 </div>
//             ),
//         },
//         {
//             field: "email",
//             headerName: "Email",
//             minWidth: 200,
//             flex: 0.2,
//         },
//         {
//             field: "gender",
//             headerName: "Gender",
//             minWidth: 100,
//             flex: 0.1,
//         },
//         {
//             field: "role",
//             headerName: "Role",
//             minWidth: 100,
//             flex: 0.2,
//             renderCell: (params) => (
//                 <span className={`text-sm p-1 px-2 font-medium rounded-full ${params.row.role === "admin" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"} capitalize`}>
//                     {params.row.role}
//                 </span>
//             ),
//         },
//         {
//             field: "registeredOn",
//             headerName: "Registered On",
//             type: "date",
//             minWidth: 150,
//             flex: 0.2,
//         },
//         {
//             field: "actions",
//             headerName: "Actions",
//             minWidth: 200,
//             flex: 0.3,
//             sortable: false,
//             renderCell: (params) => (
//                 <Actions
//                     editRoute={"user"}
//                     deleteHandler={deleteUserHandler}
//                     id={params.row.id}
//                     name={params.row.name}
//                 />
//             ),
//         },
//     ];

//     const rows = users ? users.map((item) => ({
//         id: item._id,
//         name: item.name,
//         avatar: item.avatar.url,
//         email: item.email,
//         gender: item.gender.toUpperCase(),
//         role: item.role,
//         registeredOn: new Date(item.createdAt).toISOString().substring(0, 10),
//     })) : [];

//     return (
//         <>
           
         
//             <h1 className="text-lg font-medium uppercase">Users</h1>
//             <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={10}
//                     disableSelectIconOnClick
//                     sx={{ boxShadow: 0, border: 0 }}
//                 />
//             </div>
//         </>
//     );
// };

// export default UserTable;
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import Actions from './Actions';
import Spinner from './Spinner';

const UserTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all users
    const token = localStorage.getItem('authToken')
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users);  // Assuming API returns a list of users in data.users
            } else {
                throw new Error(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError(err.message);
            enqueueSnackbar(err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const deleteUserHandler = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar('User Deleted Successfully', { variant: 'success' });
                setIsDeleted(true); // Trigger refetch
            } else {
                throw new Error(data.message || 'Failed to delete user');
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    // Fetch users on component mount and after delete
    useEffect(() => {
        fetchUsers();
        setIsDeleted(false); // Reset delete state
    }, [isDeleted]);

    
    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    
                   
                 
                    {params.row.name}
                </div>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.2,
        },
        {
            field: "gender",
            headerName: "Gender",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => (
                <span className={`text-sm p-1 px-2 font-medium rounded-full ${params.row.role === "admin" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"} capitalize`}>
                    {params.row.role}
                </span>
            ),
        },
        {
            field: "createdAt",
            headerName: "Registered On",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                if (!params.row.createdAt) {
                    return 'N/A';
                }
                return new Date(params.row.createdAt).toLocaleDateString();
            },
        },
        // {
        //     field: "createdAt",
        //     headerName: "Created At",
        //     type: "date",
        //     minWidth: 150,
        //     flex: 0.2,
        // },
        
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Actions
                    editRoute={"user"}
                    deleteHandler={deleteUserHandler}
                    id={params.row.id}
                    name={params.row.name}
                />
            ),
        },
    ];
    // const rows = users.map((item) => {
    //     console.log(item); // Debugging line
    //     return {
    //         id: item._id,
    //         name: item.name,
    //         avatar: item.avatar?.url || '',
    //         email: item.email,
    //         gender: item.gender?.toUpperCase() || 'N/A',
    //         role: item.role,
    //         registeredOn: item.createdAt ? new Date(item.createdAt) : null,
    //     };
    // });
    
    const rows = users.map((item) => {
        return {
            id: item._id,
            name: item.name,
        
            email: item.email,
            gender: item.gender?.toUpperCase() || 'N/A',
            role: item.role,
            createdAt: item.createdAt  // Make sure this line works
        };
    });
    console.log('Rows:', rows);
    return (
        <>
        {loading ? ( <Spinner /> ) : (
                <>
                 <h1 className="text-lg font-medium uppercase">Users</h1>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    disableSelectionOnClick
                    sx={{ boxShadow: 0, border: 0 }}
                />
            </div>
                </>)}
           
        </>
    );
};

export default UserTable;

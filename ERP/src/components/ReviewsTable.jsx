
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Spinner from './Spinner';
import Actions from './ReviewActions';


const ReviewsTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const token = localStorage.getItem('authToken')
    // Fetch products (GET)
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(data.products);
            } else {
                setError(data.message || "Failed to fetch products");
                enqueueSnackbar(data.message || "Failed to fetch products", { variant: "error" });
            }
        } catch (err) {
            setError("Something went wrong");
            enqueueSnackbar("Something went wrong while fetching products", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [enqueueSnackbar, isDeleted]); // Re-fetch on deletion


    // Define columns for DataGrid
    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                );
            },
        },
      
       
       

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.4,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"review"}  id={params.row.id} />
                );
            },
        },
    ];

    // Prepare rows for DataGrid
    const rows = [];
    products.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            image: item.images[0]?.url,
            
           
            rating: item.ratings,
        });
    });

    return (
        <>
             {loading ? ( <Spinner /> ) : (
                <>
                <div className="flex justify-between items-center">
                
                <h1 className="text-lg font-medium uppercase">Reviews</h1>
                
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
                </>)}

            
        </>
    );
};

export default ReviewsTable;
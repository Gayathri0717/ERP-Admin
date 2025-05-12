
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import Spinner from './Spinner';

const ProductTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');

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
    }, [enqueueSnackbar]);

    // Delete product handler
    const deleteProductHandler = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Token handling
                },
            });
            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
                fetchProducts(); // Re-fetch products
            } else {
                enqueueSnackbar(data.message || "Failed to delete product", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Something went wrong while deleting the product", { variant: "error" });
        }
    };

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
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                        <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    {params.row.name}
                </div>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => (
                <span className={params.row.stock < 10 ? "font-medium text-red-700 rounded-full bg-red-200 p-1" : ""}>
                    {params.row.stock}
                </span>
            ),
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => (
                <span>{params.row.price}</span>
            ),
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => (
                <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Actions editRoute={"product"} deleteHandler={deleteProductHandler} id={params.row.id} />
            ),
        },
    ];

    // Prepare rows for DataGrid
    const rows = products.map((item) => ({
        id: item._id,
        name: item.name,
        image: item.images[0]?.url,
        category: item.category,
        stock: item.stock,
        price: item.availableWeights[0]?.price,
        rating: item.ratings,
    }));

    return (
        <>   {loading ? ( <Spinner /> ) : (
            <>
            <div className="flex justify-between items-center">
              
              <h1 className="text-lg font-medium uppercase">Products</h1>
              <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-[#041445] hover:shadow-lg">
                  New Product
              </Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg w-full h-auto">
              {loading ? (
                  <div className="flex justify-center items-center h-full">
                      <span>Loading...</span>
                  </div>
              ) : error ? (
                  <div className="flex justify-center items-center h-full text-red-500">
                      <span>{error}</span>
                  </div>
              ) : (
                  <DataGrid
                      sx={{
                          boxShadow: 0,
                          border: 0,
                          '& .MuiDataGrid-columnHeaders': {
                              backgroundColor: '#f1f1f1',
                              fontWeight: 'bold',
                              color: '#333',
                          },
                          '& .MuiDataGrid-cell': {
                              paddingBottom: '10px',
                          },
                      }}
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectIconOnClick
                  />
              )}
          </div>
            </>)}
            
        </>
    );
};

export default ProductTable;

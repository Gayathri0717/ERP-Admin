
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSnackbar } from 'notistack';
import CategoryActions from '../components/Actions';
import Spinner from './Spinner';

const CategoryTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`);
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories);
        } else {
          enqueueSnackbar(data.message || 'Failed to fetch categories', { variant: 'error' });
        }
      } catch (err) {
        setError('An error occurred while fetching categories');
        enqueueSnackbar('Something went wrong while fetching categories', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [enqueueSnackbar]);

  // Delete category handler
  const deleteCategoryHandler = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        enqueueSnackbar('Category Deleted Successfully', { variant: 'success' });
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        enqueueSnackbar(data.message || 'Failed to delete category', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong while deleting the category', { variant: 'error' });
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    { field: 'subtitle', headerName: 'Subtitle', minWidth: 200, flex: 1 },
    {
      field: 'images',
      headerName: 'Images',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2">
            {params.row.images && params.row.images.length > 0 ? (
              params.row.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt="category"
                  className="w-12 h-12 object-cover"
                />
              ))
            ) : (
              <span>No images</span>
            )}
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <CategoryActions
          editRoute={"categorytable/update"}
            id={params.row.id} // Pass the id correctly here
            deleteHandler={deleteCategoryHandler}
          />
        );
      },
    },
  ];

  // Prepare rows for DataGrid
  const rows = categories.map((category) => ({
    id: category._id, // Ensure id is mapped correctly
    title: category.title,
    subtitle: category.subtitle,
    images: category.images,
  }));

  return (
    <div className="p-0">
      
      {loading ? (<Spinner/>) : (<>
        <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <div className="bg-white rounded-xl shadow-lg w-full p-1" style={{ height: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          loading={loading}
          disableSelectionOnClick
          
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
      <ToastContainer
        toastStyle={{
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
        progressStyle={{
          backgroundColor: 'black',
        }}
      /></>)}
    </div>
  );
};

export default CategoryTable;
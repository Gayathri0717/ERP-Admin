import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Actions from './Actions';
import Spinner from './Spinner';
const HomeTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('authToken');

  // Fetch banners when the component mounts
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banners`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBanners(response.data.banners);
      } catch (error) {
        enqueueSnackbar('Failed to fetch banners', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [enqueueSnackbar, token]);

  // Delete banner handler
  const deleteBannerHandler = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enqueueSnackbar('Banner deleted successfully!', { variant: 'success' });
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (error) {
      enqueueSnackbar('Failed to delete banner', { variant: 'error' });
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    {
      field: 'image',
      headerName: 'Image',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.image.url}
          alt="banner"
          className="w-12 h-12 object-cover"
        />
      ),
    },
    
  
    {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        flex: 0.5,
        sortable: false,
        renderCell: (params) => {
          return (
        <Actions
            editRoute={"banner"}
              id={params.row.id} // Pass the id correctly here
              deleteHandler={deleteBannerHandler}
            />
          );
        },
      },
    ];
    


  // Prepare rows for DataGrid
  const rows = banners.map((banner) => ({
    id: banner._id,
    title: banner.title,
    image: banner.image,
  }));

  return (
    <div className="p-0">
       {loading ? ( <Spinner /> ) : (
                <><h1 className="text-2xl font-semibold mb-4">Banner</h1>
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
                />
                </>)}
      
    </div>
  );
};

export default HomeTable;
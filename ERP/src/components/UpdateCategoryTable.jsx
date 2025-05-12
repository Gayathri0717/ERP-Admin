
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { FormControl,FormControlLabel,Switch } from '@mui/material';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
const UpdateCategoryTable = ({ token, categories, setCategories }) => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    title: '',
    subtitle: '',
    images: [],
    bsimages: [],
    isBestSeller: false, // Image URLs or base64 strings
  });
  const [loading,setLoading] =  useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${id}`);
        const data = await response.json();
        
        
        if (response.ok) {
          setCategory({
            title: data.category.title,
            subtitle: data.category.subtitle,
            images: data.category.images || [], 
            bsimages: data.category.bsimages || [],
            isBestSeller: data.category.isbestseller,
          });
        } else {
          toast.error(data.message || 'Failed to fetch category');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the category');
      }
    };

    fetchCategory();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Only handle one file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "param_upload"); // Ensure your upload preset is set correctly
  
    try {
      // Replace this URL with your Cloudinary upload URL
      const response = await fetch("https://api.cloudinary.com/v1_1/dbegd51hq/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        const uploadedImage = {
          public_id: data.public_id,
          url: data.secure_url,
        };
  
        // Update the category with the newly uploaded image, replacing any existing one
        setCategory((prevCategory) => ({
          ...prevCategory,
          images: [uploadedImage], // Only keep the uploaded image
        }));
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      toast.error('Failed to upload image');
    }
  };
  
  const handleBsImageChange = async (e) => {
    // Check if the category is marked as a bestseller before uploading best seller images
    if (!category.isBestSeller) {
      // If isBestSeller is false, skip the image upload
      toast.info('This category is not marked as a bestseller, skipping best seller image upload.');
      return;
    }
  
    const files = Array.from(e.target.files);
    const uploadedImages = [];
  
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'param_upload'); // Ensure this is correct
  
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dbegd51hq/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (response.ok) {
          const uploadedImage = {
            public_id: data.public_id,
            url: data.secure_url,
          };
          uploadedImages.push(uploadedImage);
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        toast.error('Failed to upload image');
        return;
      }
    }
  
    // Set the uploaded best seller images in the category state
    setCategory((prevCategory) => ({
      ...prevCategory,
      bsimages: uploadedImages,
    }));
  };

  const updateCategory = async () => {
    const { title, subtitle, images,bsimages,isBestSeller } = category;

    const payload = {
      title,
      subtitle,
      images:category.images,
      bsimages:category.bsimages,
      isBestSeller:isBestSeller,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('response.ok');
        toast.success('Category Updated successfully');
        setTimeout(() => {
          navigate('/admin/category');
        }, 3000);
         }
      }
     catch (error) {
      // toast.error('An error occurred');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
{loading ? ( <Spinner /> ) : (
                <>
                <h1 className="text-black text-2xl font-semibold mb-4">Update Category</h1>
  <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
    <label className="text mb-2 block">Category Title:</label>
    <input
      type="text"
      value={category.title}
      onChange={(e) => setCategory({ ...category, title: e.target.value })}
      required
      className="p-2 mb-4 w-full rounded-md border border-gray-300"
    />

    <label className="text mb-2 block">Category Subtitle:</label>
    <input
      type="text"
      value={category.subtitle}
      onChange={(e) => setCategory({ ...category, subtitle: e.target.value })}
      required
      className="p-2 mb-4 w-full rounded-md border border-gray-300"
    />

    <label className="text mb-2 block">Upload Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4"
    />
     <FormControl>
  <FormControlLabel
    control={
      <Switch
        checked={category.isBestSeller}
        onChange={(e) => {
          const newValue = e.target.checked;
          setCategory({ ...category, isBestSeller: newValue });
          console.log('Updated isBestSeller:', newValue); // Log the new state
      }}
      
        color="primary"
      />
    }
    label="Best Seller"
  />
</FormControl>
    {/* Displaying previously selected image */}
    <div className="mb-4">
      {category.images.length > 0 && (
        <div className="flex">
          <img
            src={category.images[0].url}  // Display the first image
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md m-1"
          />
        </div>
      )}
    </div>
    <label className="text mb-2 block">Upload Bestseller Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleBsImageChange}
      className="mb-4"
    />

    {/* Displaying previously selected image */}
    <div className="mb-4">
      {category.bsimages.length > 0 && (
        <div className="flex">
          <img
            src={category.bsimages[0].url}  // Display the first image
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md m-1"
          />
        </div>
      )}
    </div>
    <button
      type="submit"
      className="w-full m-2 bg-[#041439] text-gray-300 text-white font-semibold py-2 rounded-md transition duration-200"
    >
      Update Category
    </button>
  </form>
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
  </>) }
  
</div>

  );
};

export default UpdateCategoryTable;
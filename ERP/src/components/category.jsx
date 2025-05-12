
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
import Spinner from './Spinner';

const AddCategory = ({ token, setCategories }) => {
  const [category, setCategory] = useState({ title: '', subtitle: '', images: [], bsimages: [], isbestseller: false });
  const navigate = useNavigate();
  const [showSuggestion, setShowSuggestion] = useState(false); // State to track suggestion

  const handleImageChange = async (e) => {
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
        return;
      }
    }

    // Set the uploaded images in the category state
    setCategory((prevCategory) => ({
      ...prevCategory,
      images: uploadedImages,
    }));
  };

  const handleBsImageChange = async (e) => {
    if (!category.isbestseller) {
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

  const addCategory = async () => {
    const { title, subtitle, images, bsimages, isbestseller } = category;

    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    if (isbestseller && bsimages.length === 0) {
      toast.error('Please upload best seller images');
      return;
    }

    const payload = {
      title,
      subtitle,
      images,
      isbestseller,
      ...(isbestseller && { bsimages }),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Category added successfully');
        setTimeout(() => {
          navigate('/admin/category');
        }, 3000);
      }

      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data.category]);

    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory();
  };

  const handleBestSellerToggle = (e) => {
    const newValue = e.target.checked;
    setCategory({ ...category, isbestseller: newValue });
    setShowSuggestion(newValue); // Show suggestion when toggle is activated
  };

  return (
    <>
    <Spinner/>
    <div className="flex flex-col p-8">
      <h1 className="text-black text-2xl font-bold mb-4">Add a New Category</h1>
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

        <label className="text mb-2 block">Upload Images:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="mb-4"
        />

        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={category.isbestseller}
                onChange={handleBestSellerToggle}
                color="primary"
              />
            }
            label="Best Seller"
          />
        </FormControl>

        {showSuggestion && (
          <p className="text-sm text-blue-500 mb-4">
            Please upload different images specifically for the best seller category.
          </p>
        )}

        <label className="text mb-2 block">Upload Best Seller Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBsImageChange}
          multiple
          className="mb-4"
        />

        <button
          type="submit"
          className="w-full m-2 bg-[#041439] text-gray-300 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Add Category
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
    </div>
    </>
   
  );
};

export default AddCategory;

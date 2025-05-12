
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';

const UpdateBanner = () => {
  const { id } = useParams(); // Get the banner ID from URL parameters
  const [title, setTitle] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // For handling uploaded images
  const [existingImage, setExistingImage] = useState(''); // For the current banner image
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('authToken');

  // Fetch existing banner data
  const fetchBanner = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      const { title, image } = response.data.banner; // Assuming response data structure
      setTitle(title);
      setExistingImage(image.url); // Set the existing image (URL)
    } catch (error) {
      console.error('Error fetching banner', error);
      toast.error('Failed to fetch banner details');
    }
  };

  useEffect(() => {
    fetchBanner(); // Call fetchBanner when component mounts
  }, [id, token]);


// Handle image change
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
  
            // Update the existing image state with the newly uploaded image
            setExistingImage(uploadedImage.url); // Update existing image state
            setImageFiles(prevFiles => [...prevFiles, uploadedImage]); // Store the uploaded image as an array
        } else {
            throw new Error("Image upload failed");
        }
    } catch {
        toast.error('Failed to upload image');
    }
};
console.log(imageFiles)
// Update banner function
const updateBanner = async () => {
    console.log('Images to be sent:', imageFiles);
    const payload = {
        title,
        images: imageFiles, // Use the uploaded image object directly
    };
  
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banner/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
  
        if (response.status === 200) {
            toast.success('Banner updated successfully!');
            await fetchBanner(); // Refresh the banner data
        } else {
            toast.error('Failed to update banner');
        }
    } catch (error) {
        toast.error('An error occurred while updating the banner');
    }
};
  
  // Update handleSubmit to call updateBanner
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBanner(); // Call the updateBanner function
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
       {loading ? ( <Spinner /> ) : (
                <>
                  <h1 className="text-black text-2xl font-semibold mb-4">Update Banner</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <label className="text mb-2 block">Banner Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        {/* Displaying the current or newly uploaded image */}
        <div className="mb-4">
          {existingImage && (
            <img
              src={existingImage}
              alt="Banner Preview"
              className="w-40 h-40 object-cover rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full m-2 bg-[#041439] text-gray-300 text-white font-semibold py-2 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Banner'}
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
                </>)}
    
    </div>
  );
};

export default UpdateBanner;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import imageCompression from 'browser-image-compression';

const Home = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    

    const token = localStorage.getItem('authToken');

        
    const options = {
        maxSizeMB: 0.1,          // Max size in MB
        maxWidthOrHeight: 800,     // Max width/height in pixels
        useWebWorker: true
    };

    // Function to handle banner submission (already implemented)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const compressedFile = await imageCompression(image, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];
            console.log(base64Image);

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banner`, {
                    title,
                    image: base64Image,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMessage('Banner created successfully!');
                setTitle('');
                setImage(null);
            } catch (error) {
                console.error('Error creating banner', error);
                setMessage('Failed to create banner: ' + error.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            console.error('Error reading the image');
            setMessage('Failed to read image.');
            setLoading(false);
        };
    };


    


    return (
        <div className="container mx-auto p-6">
            <Spinner />
            {loading ? ( <Spinner /> ) : (
                <>
                {/* Heading */}
            <h1 className="text-3xl font-bold mb-4">Add Banner</h1>

{/* Banner Form */}
<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter banner title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
    </div>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image
        </label>
        <input
            type="file"
            className="w-full text-gray-700 py-2 px-3 border rounded leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
        />
    </div>

    <div className="flex items-center justify-between">
        <button
            type="submit"
            className={`bg-[#041435]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
        >
            {loading ? 'Uploading...' : 'Create Banner'}
        </button>
    </div>

    {message && <p className="mt-4 text-green-500">{message}</p>}
</form>
                </>)}
            

          
          
        </div>
    );
};

export default Home;

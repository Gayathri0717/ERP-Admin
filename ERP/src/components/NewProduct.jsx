import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from './Spinner';
import imageCompression from 'browser-image-compression';

const NewProduct = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState({ label: "", image: "", highlightDesc: "" });
    const [highlightImagePreview, setHighlightImagePreview] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [recipeInput, setRecipeInput] = useState({ description: "", image: "" });
    const [recipeImagePreview, setRecipeImagePreview] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const [highlightUploading, setHighlightUploading] = useState(false);
    const [recipeUploading, setRecipeUploading] = useState(false);
    const [productUploading, setProductUploading] = useState(false);
    const [newCategory, setNewCategory] = useState({
        title: "",
        subtitle: "",
        image: ""
    });
    const [newCategoryImagePreview, setNewCategoryImagePreview] = useState("");

    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: ""
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [superDescription, setSuperDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [recipesTitle, setRecipesTitle] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [sortNumber, setSortNumber] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedImage, setSelectedImage] = useState("");
    const [availableWeights, setAvailableWeights] = useState([]);

    // get the auth token from local storage
    const token = localStorage.getItem('authToken')



    const addHighlight = () => {
        if (!highlightInput.label.trim() || !highlightInput.image || !highlightInput.highlightDesc.trim()) return;  // Ensure description is filled
        setHighlights([...highlights, highlightInput]);
        setHighlightInput({ label: "", image: null, highlightDesc: "" }); 
        setHighlightImagePreview("");  
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((_, i) => i !== index));  // Remove the highlight at the specified index
    };

    
    const options = {
        maxSizeMB: 0.1,          // Max size in MB
        maxWidthOrHeight: 800,     // Max width/height in pixels
        useWebWorker: true
    };


    const handleHighlightImageChange = async (e) => {
        const file = e.target.files[0];  // Get the first file object

        if (!file) return; // Exit early if no file is selected
        setHighlightUploading(true);


        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];  // Extract the Base64 part
            setHighlightInput((prevState) => ({
                ...prevState,
                image: base64String,  // Store the Base64 string
            }));
            setHighlightImagePreview(reader.result);
            setHighlightUploading(false);  // Set preview for the UI
        };
        reader.readAsDataURL(compressedFile);
        // Convert file to Base64 string
    };


    const handleWeightChange = (e, index) => {
        const updatedWeights = [...availableWeights];
        updatedWeights[index].weight = e.target.value;
        setAvailableWeights(updatedWeights);
    };

    const handlePriceChange = (e, index) => {
        const updatedWeights = [...availableWeights];
        updatedWeights[index].price = e.target.value;
        setAvailableWeights(updatedWeights);
    };

    const addWeight = () => {
        setAvailableWeights([...availableWeights, { weight: "", price: "" }]);
    };

    const deleteWeight = (index) => {
        setAvailableWeights(availableWeights.filter((_, i) => i !== index));
    };

    // Delete an image
    // Handle product image input change

    const handleProductImageChange = async (e) => {
        

        const file = e.target.files[0]; // Get the first file object

        if (!file) return; // Exit early if no file is selected
        setProductUploading(true);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result; // Full data URL
            const base64String = base64Image.split(',')[1]; // Extract the Base64 part

            setImages((prevImages) => [...prevImages, base64String]); // Store the Base64 string
            setImagesPreview((prevPreviews) => [...prevPreviews, base64Image]);
            setProductUploading(false);  // Set preview for the UI
        };
        reader.onerror = () => {
            enqueueSnackbar("Failed to convert image", { variant: 'error' });
        };
        reader.readAsDataURL(file);
    };


    // Delete product image
    const deleteProductImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);  // Remove image by index
        const updatedPreviews = imagesPreview.filter((_, i) => i !== index);  // Remove preview by index
        setImages(updatedImages);  // Update images state
        setImagesPreview(updatedPreviews);  // Update previews state
    };

    const handleRecipeImageChange = async (e) => {
        
    
        const file = e.target.files[0]; // Ensure only the first file is processed

        if (!file) return; // Guard clause to handle cases where no file is selected
        setRecipeUploading(true);
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Extract Base64 string
            setRecipeInput((prevState) => ({
                ...prevState,
                image: base64String, // Update state with Base64 string
            }));
            setRecipeImagePreview(reader.result);
            setRecipeUploading(false); // Set image preview
        };

        reader.readAsDataURL(compressedFile);
    };

    // Add recipe to the list
    const addRecipe = () => {
        if (!recipeInput.description.trim() || !recipeInput.image) return;  // No need to trim the image (it's a File object)
        setRecipes([...recipes, recipeInput]);  // Add the recipe to the array
        setRecipeInput({ description: "", image: null });  // Reset the input fields (set image to null)
        setRecipeImagePreview("");  // Clear the image preview
    };

    // Delete a recipe from the list
    const deleteRecipe = (index) => {
        setRecipes(recipes.filter((_, i) => i !== index));  // Remove the recipe at the specified index
    };


    const newProductSubmitHandler = async (e) => {
        e.preventDefault();  // Prevent form submission
        console.log(highlights);
        setLoading(true); // Start loading spinner

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('superDescription', superDescription);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('sortNumber', sortNumber);
        formData.append('recipesTitle', recipesTitle);
        console.log(images);

        const highlightsArray = highlights.map((highlight) => {
            const highlightBase64 = highlight.image.startsWith('data:image/')
                ? highlight.image
                : `data:image/jpeg;base64,${highlight.image}`;
            return { ...highlight, image: highlightBase64 }; // Include highlightDesc
        });


        console.log("Highlights being sent to backend:", highlightsArray);
        formData.append("highlights", JSON.stringify(highlightsArray));

        images.forEach((imageBase64) => {
            const imageWithPrefix = imageBase64.startsWith('data:image/') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`;
            formData.append('images', imageWithPrefix);
        });

        const validAvailableWeights = availableWeights.filter(weight => weight.weight && weight.price);
        validAvailableWeights.forEach(weight => {
            formData.append("availableWeights", JSON.stringify(weight));
        });

        const recipesArray = recipes.map((recipe) => {
            const recipeBase64 = recipe.image.startsWith('data:image/')
                ? recipe.image
                : `data:image/jpeg;base64,${recipe.image}`;
            return { ...recipe, image: recipeBase64 };
        });

        formData.append("recipes", JSON.stringify(recipesArray));

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Product created:', response.data);

            // Display success toast notification
            toast.success('Product created successfully!');

            // Optionally navigate to a different page after successful creation
            navigate('/admin/products');

        } catch (error) {
            console.error('Error creating product:', error);

            // Display error toast notification
            toast.error('Failed to create product. Please try again.');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();


                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);




    return (
        <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-lg shadow p-4" id="mainform">
           <Spinner/>
            {loading ? (<Spinner />) : (
                <>

                    <h2 className="text-xl font-semibold mb-4">Create Product</h2>

                    <div className="flex flex-col gap-4 sm:w-1/2 mb-4">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                         <TextField
                            label="Super Description"
                            multiline
                            rows={3}
                            required
                            variant="outlined"
                            size="small"
                            value={superDescription}
                            onChange={(e) => setSuperDescription(e.target.value)}
                        />
                        <TextField
                            label="Recipes Title"
                            multiline
                            rows={3}
                            required
                            variant="outlined"
                            size="small"
                            value={recipesTitle}
                            onChange={(e) => setRecipesTitle(e.target.value)}
                        />
                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(categoryItem => (
                                    <MenuItem key={categoryItem._id} value={categoryItem._id}>
                                        {categoryItem.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Stock"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{ inputProps: { min: 0 } }}
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />

                            <TextField
                                label="Sort Order"
                                type="number"
                                multiline
                                rows={1}
                                required
                                variant="outlined"
                                size="small"
                                value={sortNumber}
                                onChange={(e) => setSortNumber(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Highlight Section */}
                    {/* Highlight Section */}
                    {/* Highlight Section */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Highlights</h3>
                        <div className="flex justify-between items-center border rounded p-2">
                            <input
                                value={highlightInput.label}
                                onChange={(e) => setHighlightInput({ ...highlightInput, label: e.target.value })}
                                type="text"
                                placeholder="Highlight Label"
                                className="px-2 flex-1 outline-none border-none"
                            />
                            <input
                                value={highlightInput.highlightDesc}
                                onChange={(e) => setHighlightInput({ ...highlightInput, highlightDesc: e.target.value })}
                                type="text"
                                placeholder="Highlight Description"
                                className="px-2 flex-1 outline-none border-none"
                            />
                            <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                                <input
                                    type="file"
                                    name="highlightImage"
                                    accept="image/*"
                                    onChange={handleHighlightImageChange}
                                    className="hidden"
                                    disabled={highlightUploading}  // Disable input when uploading
                                />
                                {highlightUploading ? "Uploading..." : "Choose Image"}  {/* Show "Uploading..." while the image is being uploaded */}
                            </label>
                            <span onClick={addHighlight} className="py-2 px-4 bg-[#041441] ml-4 text-white rounded hover:shadow-lg cursor-pointer">
                                Add
                            </span>
                        </div>

                        {highlightImagePreview && (
                            <div className="w-24 h-10 flex items-center justify-center border rounded-lg mt-2">
                                <img draggable="false" src={highlightImagePreview} alt="Highlight" className="w-full h-full object-contain" />
                            </div>
                        )}

                        {/* List of added highlights */}
                        <div className="flex flex-col gap-1.5">
                            {highlights.map((h, i) => (
                                <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50" key={i}>
                                    <div>
                                        <p className="text-green-800 text-sm font-medium">{h.label}</p>
                                        <p className="text-green-600 text-xs">{h.highlightDesc}</p> {/* Show description */}
                                    </div>
                                    <img src={h.image} alt={h.label} className="w-12 h-12 object-contain" />
                                    <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Specs Section */}
                    <div className="flex flex-col gap-4 mt-4">
                        <h3 className="font-semibold">Available Weights</h3>
                        <div>
                            {availableWeights.map((item, index) => (
                                <div key={index} className="flex gap-4 mb-4 items-center mb-2">
                                    <TextField
                                        label="Weight"
                                        type="text"
                                        size="small"
                                        value={item.weight}
                                        onChange={(e) => handleWeightChange(e, index)}
                                        className="flex-1"
                                    />
                                    <TextField
                                        label="Price"
                                        type="number"
                                        size="small"
                                        value={item.price}
                                        onChange={(e) => handlePriceChange(e, index)}
                                        className="flex-1"
                                    />
                                    <span onClick={() => deleteWeight(index)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                            <span onClick={addWeight} className="py-2 px-4  bg-[#041441] text-white rounded hover:shadow-lg cursor-pointer">
                                Add Weight
                            </span>
                        </div>
                    </div>

                    {/* Recipes Section */}
                    <div className="flex flex-col gap-4 mt-4">
                        <h3 className="font-semibold">Recipes</h3>
                        <div className="flex justify-between items-center border rounded p-2">
                            <input
                                value={recipeInput.description}
                                onChange={(e) => setRecipeInput({ ...recipeInput, description: e.target.value })}
                                type="text"
                                placeholder="Recipe Description"
                                className="px-2 flex-1 outline-none border-none"
                            />
                            <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                                <input
                                    type="file"
                                    name="recipeImage"
                                    accept="image/*"
                                    onChange={handleRecipeImageChange}
                                    className="hidden"
                                    disabled={recipeUploading}
                                />
                                {recipeUploading ? "Uploading..." : "Choose Image"}
                            </label>


                            <span onClick={addRecipe} className="py-2 px-4 bg-[#041441] ml-4 text-white rounded hover:shadow-lg cursor-pointer">
                                Add
                            </span>
                        </div>

                        {recipeImagePreview && (
                            <div className="w-24 h-10 flex items-center justify-center border rounded-lg mt-2">
                                <img draggable="false" src={recipeImagePreview} alt="Recipe" className="w-full h-full object-contain" />
                            </div>
                        )}

                        {/* List of added recipes */}
                        <div className="flex flex-col gap-1.5">
                            {recipes.map((r, i) => (
                                <div className="flex justify-between rounded items-center py-1 px-2 bg-orange-50" key={i}>
                                    <p className="text-orange-800 text-sm font-medium">{r.description}</p>
                                    <img src={r.image} alt={r.description} className="w-12 h-12 object-contain" />
                                    <span onClick={() => deleteRecipe(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Images Section */}
                    <div className="flex flex-col sm:w-1/2 m-2 gap-4 mt-4">
                        <label className="block mb-2 font-semibold text-gray-600">Product Images</label>
                        <div>

                        </div>
                        <div className="w-1/2 border-2 border-[#041441] rounded flex justify-center items-center">
                            <label className="flex flex-col items-center py-6 px-10 cursor-pointer">
                                <ImageIcon style={{ fontSize: "30px" }} />
                                {/* <span className="mt-2 text-sm text-gray-600">Select images</span> */}
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    onChange={handleProductImageChange}
                                    multiple
                                    className="hidden"
                                    disabled={productUploading}
                                />
                                {productUploading ? "Uploading..." : "Select Image"}
                            </label>

                        </div>

                        {/* Display preview of the selected images */}
                        <div className="flex gap-2 overflow-x-auto h-24 border-2 border-[#041441] rounded mt-2">
                            {imagesPreview.map((image, i) => (
                                <div key={i} className="relative">
                                    <img
                                        draggable="false"
                                        src={image}
                                        alt={`Product ${i}`}
                                        className="w-24 h-24 object-contain"
                                    />
                                    <span
                                        onClick={() => deleteProductImage(i)}
                                        className="absolute top-0 right-0 text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                        {images.length === 4 && (
                            <div className="text-red-500 text-sm">
                                You have reached the maximum limit of 4 images.
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="py-2 px-4 bg-[#041435] text-white rounded shadow hover:shadow-lg mt-4">
                        Create Product
                    </button>
                    <ToastContainer />
                </>)}
        </form>

    )
}

export default NewProduct;
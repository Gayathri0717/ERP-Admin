import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../utils/constants";

const UpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [availableWeights, setAvailableWeights] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [category, setCategory] = useState("");
  const [highlightUpload, setHighlightupload] = useState(false)
  const [recipeUpload, setRecipeUpload] = useState(false)
  const [productUpload, setProductUpload] = useState(false)

  // Basic Product Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [superDescription, setSuperDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cuttedPrice, setCuttedPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [sortNumber, setSortNumber] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [categories, setCategories] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [highlightsInput, setHighlightsInput] = useState({
    label: "",
    image: "",
    highlightDesc: "",
  });
  const [highlights, setHighlights] = useState([]);

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [recipeInput, setRecipeInput] = useState({
    description: "",
    image: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [highlightImagePreview, setHighlightImagePreview] = useState([]);
  const [recipeImagePreview, setRecipeImagePreview] = useState([]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "param_upload"); // Your Cloudinary preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dbegd51hq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return { url: data.secure_url, public_id: data.public_id }; // Return the URL of the uploaded image
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCategories(data.categories); // Assuming the response contains a 'categories' field
      } else {
        enqueueSnackbar(data.message || "Failed to fetch categories", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong while fetching categories", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetails(params.id);
    fetchCategories(); // Fetch categories on mount
  }, [params.id]);

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
  const handleHighlightImageChange = async (e) => {
    console.log("in handle highlight image change");
    const files = Array.from(e.target.files);
    const newHighlightImages = [];

    if (!highlightsInput.label.trim()) {
      console.error("Highlight label is empty.");
      return;
    }
    setHighlightupload(true);
    for (const file of files) {
      try {
        const { url, public_id } = await uploadImageToCloudinary(file);
        newHighlightImages.push({
          image: { url, public_id },
          label: highlightsInput.label,
          highlightDesc: highlightsInput.highlightDesc,
        });
      } catch (error) {
        console.error("Error uploading highlight image:", error);
      }
    }

    if (newHighlightImages.length > 0) {
      setHighlights((prevHighlights) => [
        ...prevHighlights,
        ...newHighlightImages,
      ]);
      setHighlightsInput({ label: "", image: "", highlightDesc: "" });
    }
    setHighlightupload(false);
  };

  const validateHighlights = () => {
    return highlights.every(
      (highlight) =>
        highlight.image && highlight.image.url && highlight.image.public_id
    );
  };

  // Before making the API call to update the product

  const handleRecipeImageChange = async (e) => {
    const files = Array.from(e.target.files); // Convert files to array
    const newRecipeImages = []; // To hold new recipe image objects

    // Validate the current recipe input before proceeding
    if (!recipeInput.description.trim()) {
      console.error("Recipe description is empty.");
      return; // Prevent adding if description is empty
    }
    setRecipeUpload(true);
    // Function to upload images sequentially
    for (const file of files) {
      try {
        const { url, public_id } = await uploadImageToCloudinary(file); // Upload to Cloudinary
        newRecipeImages.push({
          image: { url, public_id }, // Create an image object with URL and public_id
          description: recipeInput.description, // Use the current description from the state
        });

        console.log("Uploaded Recipe Image URL:", url);
        console.log("Uploaded Recipe Image Public ID:", public_id);
      } catch (error) {
        console.error("Error uploading recipe image:", error);
      }
    }

    // After all uploads are completed, update the recipe input
    if (newRecipeImages.length > 0) {
      console.log("Final New Recipe Images:", newRecipeImages);

      // Update recipes with new images
      setRecipes((prevRecipes) => [
        ...prevRecipes,
        ...newRecipeImages, // Append new recipe images
      ]);
      setRecipeInput({ description: "", image: "" }); // Reset the input fields
    }
    setRecipeUpload(false);
  };

  // Add a new highlight
  const addHighlight = () => {
    if (!highlightsInput.label.trim()) return;
    setHighlights([...highlights, highlightsInput]);
    setHighlightsInput({ label: "", image: "" }); // Reset input
  };

  // Function to delete a highlight
  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Handle recipe image change

  const addRecipe = () => {
    // Check that both description and image data (url & public_id) are present
    if (
      !recipeInput.description.trim() ||
      !recipeInput.image.url ||
      !recipeInput.image.public_id
    ) {
      console.error("Recipe description or image is incomplete.");
      return;
    }

    // Add the recipe to the list
    setRecipes([...recipes, recipeInput]);
    setRecipeInput({ description: "", image: "" }); // Reset input
  };

  // Function to delete a recipe
  const deleteRecipe = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  const handleProductImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = []; // To hold new image objects (with public_id and url)
    const newImagesPreview = []; // To hold new image preview objects (with public_id and url)
    let filesUploadedCount = 0; // To keep track of how many files have been uploaded
    setProductUpload(true);

    // Function to upload images sequentially
    const uploadImages = async () => {
      for (const file of files) {
        try {
          // Assuming uploadImageToCloudinary returns an object with public_id and url
          const uploadedImage = await uploadImageToCloudinary(file);

          // Create the new image object structure
          const imageObject = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.url,
          };

          // Add the new image object to the arrays
          newImages.push(imageObject);
          newImagesPreview.push(imageObject);

          filesUploadedCount++;

          // Debug statements to check the values
          console.log("Current File:", file);
          console.log("Uploaded Image Object:", imageObject);
          console.log("New Images Array:", newImages);
          console.log("New Images Preview Array:", newImagesPreview);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }

      // After all uploads are completed, update the state
      if (filesUploadedCount === files.length) {
        console.log("Final New Images:", newImages);
        console.log("Final New Images Preview:", newImagesPreview);

        // Update state with new image objects and previews
        setImages((prevImages) => [...prevImages, ...newImages]);
        setImagesPreview((prevPreviews) => [
          ...prevPreviews,
          ...newImagesPreview,
        ]);
        setProductUpload(false);
      }
    };

    // Start uploading images
    await uploadImages();
  };

  const newProductSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateHighlights()) {
      console.error("Some highlights are missing image URLs or public IDs.");
      return; // Prevent the request from proceeding
    }
    if (highlights.length === 0) {
      enqueueSnackbar("Please add at least one highlight", {
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("superDescription", superDescription);
    formData.set("price", price);
    formData.set("cuttedPrice", cuttedPrice);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.append('sortNumber', sortNumber);
    formData.set("warranty", warranty);


    // Add images & highlights to formData
    // images.forEach(image => formData.append("images", image));
    //append images as an array form

    formData.append("images", JSON.stringify({ images }));
    formData.append("highlights", JSON.stringify({ highlights }));
    formData.set("recipesTitle", recipeTitle);
    // formData.append("highlights", JSON.stringify(highlights));
    formData.append("recipes", JSON.stringify({ recipes }));


    setLoading(true);
    // Filter out unwanted fields from available weights
    const validAvailableWeights = availableWeights
      .filter((weight) => weight.weight && weight.price)
      .map((weight) => ({
        weight: weight.weight,
        price: weight.price,
      })); // Only include weight and price, ignore _id

    if (validAvailableWeights.length > 0) {
      formData.append(
        "availableWeights",
        JSON.stringify(validAvailableWeights)
      ); // Correctly append as an array
    } else {
      enqueueSnackbar("Please add valid weights and prices.", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${params.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        enqueueSnackbar("Product updated successfully", { variant: "success" });
        setIsUpdated(true);

        // Redirect to the Order Table after successful update
        navigate("/admin/products"); // Change this to the correct route for your Order Table
      } else {
        enqueueSnackbar(data.message || "Failed to update product", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
        setName(data.product.name);
        setDescription(data.product.description);
        setSuperDescription(data.product.superDescription);
        setPrice(data.product.price);
        setCuttedPrice(data.product.cuttedPrice);
        setCategory(data.product.category);
        setStock(data.product.stock);
        setSortNumber(data.product.sortNumber);
        setWarranty(data.product.warranty);
        setAvailableWeights(data.product.availableWeights || []);
        setHighlights(data.product.highlights);
        setRecipeTitle(data.product.recipesTitle);
        setRecipes(data.product.recipes);
        setImagesPreview(data.product.images.map((image) => image.url));

        setOldImages(data.product.images); // Keep old images
        setImages(data.product.images); // Set images state
      } else {
        enqueueSnackbar(data.message || "Failed to fetch product", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong while fetching product", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails(params.id);
    console.log("images", images);
  }, [params.id]);
  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Assuming you're using React state to manage images
  };

  return (
    <>
      <form
        onSubmit={newProductSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col bg-white rounded-lg shadow p-10 gap-12"
        id="mainform"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4 m-2 w-full">
          <h1 className="font-semibold text-[#041435] p-4 text-2xl">Update Product :</h1>
          <TextField
            label="Product Name"
            variant="outlined"
            size="small"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Product Description"
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

          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              label="Select Category"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((categoryItem, i) => (
                <MenuItem value={categoryItem._id} key={i}>
                  {categoryItem.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Stock Quantity"
              type="number"
              variant="outlined"
              size="small"
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

          {/* Highlights Section */}
          <div className="flex flex-col gap-2">


            <TextField
              label="Highlight Label"
              value={highlightsInput.label}
              onChange={(e) =>
                setHighlightsInput({
                  ...highlightsInput,
                  label: e.target.value,
                })
              }
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <label className="cursor-pointer bg-gray-400 text-white p-2 m-2 w-[150px] rounded ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHighlightImageChange}
                      className="hidden"
                      disabled={highlightUpload}
                    />
                    {highlightUpload ? "Uploading..." : "Choose Image"}
                  </label>
                ),
              }}
            />
            <TextField
              label="Highlight Description"
              value={highlightsInput.highlightDesc}
              onChange={(e) => setHighlightsInput({
                ...highlightsInput,
                highlightDesc: e.target.value,
              })}
              size="small"
            />
            <ul className="mt-2">
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start border-2 border-[#041435] p-4 w-full sm:w-full gap-4"
                >
                  <div>
                    <strong>Label:</strong> {highlight.label}
                  </div>
                  <div>
                    <strong>Description:</strong> {highlight.highlightDesc}
                  </div>
                  {highlight.image && (
                    <div>
                      <strong>Image:</strong>
                      <img
                        src={highlight.image.url}
                        style={{ width: "100px", marginTop: "8px" }}
                        alt="highlight preview"
                      />
                    </div>
                  )}
                  <button type="button" onClick={() => deleteHighlight(index)}>
                    <DeleteIcon className="mr-8" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - File Inputs */}
        <div className="flex flex-col gap-4 m-2 w-full p-2">
          <div className="flex flex-col gap-2 w-1/2">
            <h4 className="font-semibold mb-2">Product Image :</h4>
            <label
              htmlFor="image-input"
              className="flex items-center cursor-pointer bg-gray-400 text-white px-2 py-1 rounded"
            >
              <ImageIcon /> Upload Product Images
            </label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleProductImageChange}
              className="border border-gray-300 rounded"
              disabled={productUpload}
            />
            {images.map((img, i) => (
              <div
                key={i}
                className="flex flex-col border-2 border-[#041435] m-1 p-2 relative"
                style={{
                  width: "150px",
                  height: "auto",
                  objectFit: "cover",
                }}
              >
                <img
                  src={img.url}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  alt={`product preview ${i + 1}`}
                />
                <span className="mt-2 text-center">Product Image {i + 1}</span>
                <DeleteIcon
                  className="absolute top-1 right-1 cursor-pointer text-black-600"
                  onClick={() => deleteImage(i)}
                />
              </div>
            ))}
            {productUpload ? "Uploading..." : ""}
            <div className="flex flex-wrap mt-2 gap-4"></div>
          </div>


          <div className="mb-3 w-1/2">
            <h4 className="font-semibold mb-4">Available Weights :</h4>
            {availableWeights.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <TextField
                  label="Weight"
                  value={item.weight}
                  onChange={(e) => handleWeightChange(e, index)}
                  size="small"
                />
                <TextField
                  label="Price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handlePriceChange(e, index)}
                  size="small"
                />
                <DeleteIcon onClick={() => deleteWeight(index)} />
              </div>
            ))}
            <button
              type="button"
              className="bg-[#041441] text-white rounded py-4 px-3 mt-1 w-full"
              onClick={addWeight}
            >
              Add Weight
            </button>
          </div>
          <TextField
            label="Recipe Title"
            variant="outlined"
            size="small"
            required
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <TextField
              label="Recipe Description"
              value={recipeInput.description}
              onChange={(e) =>
                setRecipeInput({ ...recipeInput, description: e.target.value })
              }
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <label className="cursor-pointer bg-gray-400 text-white p-2 m-2 w-[150px] rounded ml-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleRecipeImageChange}
                      className="hidden"
                      disabled={recipeUpload}
                    />
                    {recipeUpload ? "Uploading..." : "Choose Image"}
                  </label>
                ),
              }}
            />
            <ul className="mt-2">
              {recipes.map((recipe, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start border-2 border-[#041435] p-4 w-full sm:w-full gap-4"
                >
                  <div>
                    <strong>Title:</strong> {recipeTitle}
                  </div>

                  <div>
                    <strong>Description:</strong> {recipe.description}
                  </div>
                  {recipe.image && (
                    <div>
                      <strong>Image:</strong>
                      <img
                        src={recipe.image.url}
                        style={{ width: "100px", marginTop: "8px" }}
                        alt="recipe preview"
                      />
                    </div>
                  )}
                  <button type="button" onClick={() => deleteRecipe(index)}>
                    <DeleteIcon className="mr-8" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="bg-[#041441] h-16 text-white rounded py-2 px-4 mt-4"
            disabled={loading}
          >
            Update Product
          </button>
        </div>
      </form>

    </>
  );
};

export default UpdateProduct;

const Category = require('../models/categoryModel');
const cloudinary = require('cloudinary');
const { uploadImageToStorage } = require('../utils/uploadImageToStorage'); 
// Create a new category
// exports.createCategory = async (req, res, next) => {
//     try {
//         const { title, subtitle } = req.body;

//         // Assuming req.files.images contains the uploaded image files from fileupload
//         let images = req.files && req.files.images ? req.files.images : [];

//         // Handle single or multiple image uploads
//         if (!Array.isArray(images)) {
//             images = [images]; // Convert single image to array
//         }

//         const imagesLink = [];
//         for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
//                 folder: "categories",
//             });
//             imagesLink.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // Create the category object
//         const category = new Category({
//             title,
//             subtitle,
//             images: imagesLink, // Save uploaded images information
//         });

//         // Save the category
//         await category.save();

//         res.status(201).json({
//             success: true,
//             category,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
// exports.createCategory = async (req, res, next) => {
//     try {
//         const { title, subtitle, images } = req.body;

//         // If images are passed in the request body, you can use them directly
//         let imagesLink = images || [];

//         // Validate and format images
//         if (!Array.isArray(imagesLink)) {
//             return res.status(400).json({ success: false, message: 'Images must be an array' });
//         }

//         // Create the category object
//         const category = new Category({
//             title,
//             subtitle,
//             images: imagesLink, // Save uploaded images information
//         });

//         // Save the category
//         await category.save();

//         res.status(201).json({
//             success: true,
//             category,
//         });
//     } catch (error) {
//         console.error('Error creating category:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

exports.createCategory = async (req, res, next) => {

    try {
        const { title, subtitle, images } = req.body;
        console.log(images);
        // Validate images
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No images uploaded or incorrect format.',
            });
        }

        // Process and upload images
        const imageDetails = await Promise.all(images.map(async (base64Image) => {
            const base64Data = base64Image.split(',')[1]; // Get the part after the comma
            const buffer = Buffer.from(base64Data, 'base64'); // Convert to buffer

            // Upload the buffer to Cloudinary
            const uploadResult = await uploadImageToStorage(buffer); // Ensure this returns the correct format
            return {
                public_id: uploadResult.public_id,
                url: uploadResult.url,
            };
        }));

        // Create the category with the uploaded images
        const category = await Category.create({
            title,
            subtitle,
            images: imageDetails,
        });

        res.status(201).json({
            success: true,
            category,
        });
    } catch (error) {
        console.error('Error creating category:', error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get all categories
exports.getCategories = async (req, res, next) => {
    try {
        // Find all categories from the database
        const categories = await Category.find();

        // Format the data to return the required structure
        const formattedCategories = categories.map(category => ({
            _id: category._id,          // Category ID
            title: category.title,      // Category title
            subtitle: category.subtitle, // Category subtitle
            images: category.images.map(image => ({
                public_id: image.public_id,
                url: image.url,
                _id: image._id,
            })),  // Images array containing public_id, url, and image _id
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }));

        res.status(200).json({
            success: true,
            categories: formattedCategories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get a single category    by ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update a category
// exports.updateCategory = async (req, res, next) => {
//     try {
//         let category = await Category.findById(req.params.id);

//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Category not found',
//             });
//         }

//         const { title, subtitle, images } = req.body;
//         category.title = title || category.title;
//         category.subtitle = subtitle || category.subtitle;
//         category.images = images || category.images;

//         await category.save();
//         res.status(200).json({
//             success: true,
//             category,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
exports.updateCategory = async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const { title, subtitle, images } = req.body;

        // Update title and subtitle only if provided in request body
        if (title) category.title = title;
        if (subtitle) category.subtitle = subtitle;

        // Log the incoming images for debugging
        console.log("Incoming images:", images);

        // If images are provided, validate each image has the required fields
        if (images && Array.isArray(images)) {
            for (let img of images) {
                console.log("Validating image:", img); // Log each image for validation
                if (!img.public_id || !img.url) {
                    return res.status(400).json({
                        success: false,
                        message: 'Each image must have both public_id and url.',
                    });
                }
            }
            category.images = images; // Only set if all images are valid
        }

        // Save the updated category
        await category.save();

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete a category
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        await category.remove();
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

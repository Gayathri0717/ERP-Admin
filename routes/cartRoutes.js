// const express = require('express');
// const { addToCart } = require('../controllers/cartController');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
// const router = express.Router();

// // Allow only authenticated users with "admin" role to add products to the cart
// router.post('/cart', isAuthenticatedUser, authorizeRoles('user'), addToCart);

// module.exports = router;



const express = require('express');
const { addToCart, getCartItems, updateCartQuantity, removeFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth'); // Ensure this middleware is set up

const router = express.Router();

// Route to get cart items
router.get('/cart', isAuthenticatedUser, getCartItems);

// Route to add to cart
router.post('/cart', isAuthenticatedUser, addToCart);
// Route to update product quantity in cart
router.put('/cart/:cartItemId', isAuthenticatedUser, updateCartQuantity);

// Route to remove product from cart
router.delete('/cart/:cartItemId', isAuthenticatedUser, removeFromCart);

module.exports = router;


// import React, { useState, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Logo from '../components/parammoblogo.png';

// const Header1 = () => {
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCategoriesAndProducts = async () => {
//       try {
//         const categoriesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`);
//         const fetchedCategories = categoriesResponse.data.categories.map(category => ({
//           name: category.title,
//           description: category.description || "",
//         }));
//         setCategories(fetchedCategories);

//         const productsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/all`);
//         setAllProducts(productsResponse.data.products);
//       } catch (error) {
//         console.error('Error fetching categories and products:', error);
//       }
//     };
    
//     fetchCategoriesAndProducts();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`);
//       localStorage.removeItem('email');
//       localStorage.removeItem('userId');
//       setEmail(null);
//       setShowDropdown(false);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       alert('Failed to log out. Please try again.');
//     }
//   };

//   const handleCategoryClick = (name, description) => {
//     navigate('/category', { state: { categoryName: name, description: description } });
//   };

//   const handleTitleClick = (productId) => {
//     navigate(`/product?productId=${encodeURIComponent(productId)}`);
//     setIsMenuOpen(false);
//   };

//   const handleMouseEnter = (itemName) => {
//     setHoveredItem(itemName);
//     setDropdownVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setDropdownVisible(false);
//     setTimeout(() => {
//       setHoveredItem(null);
//     }, 10000);
//   };

//   const filteredProducts = allProducts.filter(product => product.category === hoveredItem);

//   const dropdownStyles = {
//     transition: 'opacity 10000ms ease-in-out, transform 10000ms ease-in-out',
//     opacity: isDropdownVisible ? 1 : 0,
//     transform: isDropdownVisible ? 'scale(1)' : 'scale(0.95)',
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       {/* Top Header Section */}
//       <div className="bg-[#000E21] text-white px-[20px] md:px-[80px] md:pb-1">
//         <div className="flex justify-between items-center">
//           {/* Logo on the left */}
//           <div onClick={() => navigate('/')} className="cursor-pointer">
//             <img src={Logo} alt="Param Logo" className="h-[40px] md:h-[50px]" />
//           </div>

//           {/* Icons section on the right */}
//           <div className="flex items-center space-x-4">
//             {email ? (
//               <div className="relative">
//                 <FiUser
//                   className="text-2xl cursor-pointer"
//                   onClick={() => setShowDropdown(!showDropdown)}
//                 />
//                 {showDropdown && (
//                   <div className="absolute right-0 w-[120px] mt-2 bg-white text-black rounded-lg shadow-lg z-50">
//                     <button
//                       className="w-full px-4 py-2 text-sm cursor-pointer flex justify-center items-center"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <FiUser
//                 className="text-2xl cursor-pointer"
//                 onClick={() => navigate('/login') }
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header1;
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Logo from '../components/parammoblogo.png';
import Logo from '../components/paarampariyaa_logo.png'
import Spinner from "./Spinner";

const Header1 = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
   const [loading, setLoading] = useState(true); // Loading state

  
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`);
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      setEmail(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#000E21] text-white">
      <Spinner/>
      <div className="flex justify-between items-center px-4 md:px-16 py-2">
        {/* Left side: Placeholder for spacing */}
        <div className="flex-1"></div>

        {/* Center: Logo */}
        <div className="flex justify-center items-center">
          <img
            src={Logo}
            alt="Param Logo"
            className="h-[40px] md:h-[50px] cursor-pointer"
            onClick={() => navigate('/admin/dashboard')}
          />
        </div>

        {/* Right side: User and logout */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          {email ? (
            <div className="relative">
              <FiUser
                className="text-2xl cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-[120px] bg-white text-black rounded-lg shadow-lg z-50">
                  <button
                    className="w-full px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <FiUser
              className="text-2xl cursor-pointer"
              onClick={() => navigate('/')}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header1;

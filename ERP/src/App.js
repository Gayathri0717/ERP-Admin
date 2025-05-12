
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import Dashboard from './components/Dashboard';
import Login from './components/login'; // Ensure this is the correct path
import NewProduct from './components/NewProduct'; // Ensure this is the correct path
import category from './components/category'
import AddCategory from './components/category';
import ReviewsTable from './components/ReviewsTable';
import ProductTable from './components/ProductTable';
import UpdateProduct from './components/UpdateProduct';
import OrderTable from './components/OrderTable';
import UpdateOrder from './components/UpdateOrder';
import UserTable from './components/UserTable';
import UpdateUser from './components/UpdateUser';
import MainData from './components/MainData';
import CategoryTable from './components/CategoryTable';
import UpdateCategoryTable from './components/UpdateCategoryTable';
import ProductReviews from './components/ProductReview';
import Feedback from './components/Feedback'; 
import Home from './components/Home';
import HomeTable from './components/HomeTable';
import UpdateBanner from './components/UpdateBanner';
function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Routes>
        {/* Define the routes properly */}
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <MainData/>
            </Dashboard>
          }
        />
   <Route
          path="/admin/home"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <Home/>
            </Dashboard>
          }
        />
        <Route
          path="/admin/hometable"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <HomeTable/>
            </Dashboard>
          }
        />
        <Route
          path="/admin/banner/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UpdateBanner/>
            </Dashboard>
          }
        />
        {/* For New Product Route */}
        <Route
          path="/admin/new_product"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <NewProduct />
            </Dashboard>
          }
        />
     
<Route
          path="/admin/category"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <CategoryTable />
            </Dashboard>
          }
        />
         <Route
          path="/admin/reviews"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <ReviewsTable/>
            </Dashboard>
          }
        />
                <Route
          path="/admin/Feedback"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <Feedback/>
            </Dashboard>
          }
        />
             <Route
          path="/admin/add-category"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <AddCategory/>
            </Dashboard>
          }
        />
             <Route
          path="/admin/products"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <ProductTable/>
            </Dashboard>
          }
        />
             <Route
          path="/admin/product/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UpdateProduct/>
            </Dashboard>
          }
        />
        <Route
          path="/admin/categorytable/update/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UpdateCategoryTable/>
            </Dashboard>
          }
        />
           <Route
          path="/admin/orders"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <OrderTable/>
            </Dashboard>
          }
        />
             <Route
          path="/admin/orders/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UpdateOrder/>
            </Dashboard>
          }
        />
              <Route
          path="/admin/users"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UserTable/>
            </Dashboard>
          }
        />
         <Route
          path="/admin/user/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <UpdateUser/>
            </Dashboard>
          }

          
        />
        <Route
          path="/admin/review/:id"
          element={
            <Dashboard> {/* Wrap NewProduct inside Dashboard for consistent layout */}
              <ProductReviews/>
            </Dashboard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


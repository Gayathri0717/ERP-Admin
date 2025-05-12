import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import TrackStepper from './TrackStepper';
import Loading from './Loading';
import { formatDate } from '../utils/functions';
import Spinner from './Spinner';

const UpdateOrder = () => {
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate(); // Initialize navigate hook
    const [status, setStatus] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('authToken');

    // Fetch order details (GET)
    const fetchOrderDetails = async (orderId) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setOrder(data.order);
            } else {
                setError(data.message || "Failed to fetch order details");
                enqueueSnackbar(data.message || "Failed to fetch order details", { variant: "error" });
            }
        } catch (err) {
            setError("Something went wrong");
            enqueueSnackbar("Something went wrong while fetching order details", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    console.log(order);

    // Update order status (PUT)
    const updateOrderStatus = async (orderId, status) => {
        console.log("Attempting to update to:", status); // Log attempted status
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            console.log("Update API response:", data); // Log response from API
            if (response.ok) {
                enqueueSnackbar("Order Updated Successfully", { variant: "success" });
                fetchOrderDetails(orderId); // Re-fetch updated order
            } else {
                enqueueSnackbar(data.message || "Failed to update order", { variant: "error" });
            }
        } catch (err) {
            console.error("Update order error:", err);
            enqueueSnackbar("Something went wrong while updating the order", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchOrderDetails(params.id);

    }, [params.id]);

  

    useEffect(() => {
        if (order && !loading) {
            // Set status only if it hasn't been updated manually
            setStatus((prevStatus) => prevStatus || order.orderStatus);
        }
    }, [order, loading]);
    

    // Handle form submission
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        updateOrderStatus(params.id, status);
    };

    return (
        <>
            {loading ? <Spinner /> : (
                <>
                    {order && order.shippingInfo && (
                        <div className="flex flex-col gap-4">
                            <Link to="/admin/orders" className="ml-1 flex items-center gap-0 font-medium text-[#041445] uppercase">
                                <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
                                Go Back
                            </Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="font-medium text-lg">Delivery Address</h3>
                                        {/* <h4 className="font-medium">{order.user.name}</h4> */}
                                        <p className="text-sm">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.zip}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{order.billingDetails.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Phone Number</p>
                                            <p>{order.billingDetails.phone}</p>
                                        </div>
                                    </div>


                                    <div className="my-8 mx-10">
                                        <h3 className="font-medium text-lg mb-4">Order Items</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white border border-gray-300">
                                                <thead>
                                                    <tr className="bg-gray-100 border-b">
                                                        <th className="px-4 py-2 text-left font-medium border-r">Product Name</th>
                                                        <th className="px-4 py-2 text-left font-medium border-r">Weight</th>
                                                        <th className="px-4 py-2 text-left font-medium">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.products.map((item) => (
                                                        <tr key={item._id} className="border-b">
                                                            <td className="px-4 py-2 border-r">{item.name}</td>
                                                            <td className="px-4 py-2 border-r">{item.weight}</td>
                                                            <td className="px-4 py-2">{item.quantity}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </div>

                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">
                                    <h3 className="font-medium text-lg">Update Status</h3>
                                    <div className="flex gap-2">
                                        <p className="text-sm font-medium">Current Status:</p>
                                        <p className="text-sm">
                                            {order.orderStatus === "Confirmed" && `Confirmed on ${formatDate(order.createdAt)}`}
                                            {order.orderStatus === "Shipped" && `Shipped on ${formatDate(order.shippedAt)}`}
                                            {order.orderStatus === "Processing" && `Ordered on ${formatDate(order.createdAt)}`}
                                            {order.orderStatus === "Delivered" && `Delivered on ${formatDate(order.deliveredAt)}`}
                                        </p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="order-status-select-label"
                                            id="order-status-select"
                                            value={status} // Bind to the state
                                            label="Status"
                                            onChange={(e) => setStatus(e.target.value)} // Update state on change
                                        >
                                            <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                                            <MenuItem value={"Processing"}>Processing</MenuItem>
                                            <MenuItem value={"Shipped"}>Shipped</MenuItem>
                                            <MenuItem value={"Delivered"}>Delivered</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <button type="submit" className="bg-[#041445] p-2.5 text-white font-medium rounded shadow hover:shadow-lg">
                                        Update
                                    </button>
                                </form>

                            </div>

                            {order.orderItems && order.orderItems.map((item) => {
                                const { _id, image, name, price, quantity } = item;

                                return (
                                    <div className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5" key={_id}>
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-1">
                                            <div className="w-full sm:w-32 h-24">
                                                <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                            </div>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="text-sm">{name.length > 45 ? `${name.substring(0, 45)}...` : name}</p>
                                                <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{price.toLocaleString()}</p>
                                                <span className="font-medium">Total: ₹{(quantity * price).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <h3 className="font-medium sm:text-center">Order Status</h3>
                                            <TrackStepper
                                                orderOn={order.createdAt}
                                                shippedAt={order.shippedAt}
                                                deliveredAt={order.deliveredAt}
                                                activeStep={
                                                    order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;
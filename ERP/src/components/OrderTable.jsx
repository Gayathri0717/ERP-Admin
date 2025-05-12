import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { formatDate } from '../utils/functions';
import Spinner from './Spinner';
import Actions from './Actions';

const OrderTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(6); // Number of orders per page
    const token = localStorage.getItem('authToken');

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setOrders(data.orders);
                } else {
                    setError(data.message || "Failed to fetch orders");
                    enqueueSnackbar(data.message || "Failed to fetch orders", { variant: "error" });
                }
            } catch (err) {
                setError("Something went wrong");
                enqueueSnackbar("Something went wrong while fetching orders", { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [enqueueSnackbar, isDeleted]);

    // Delete order handler
    const deleteOrderHandler = async (orderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/order/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
                setIsDeleted(true);
            } else {
                enqueueSnackbar(data.message || "Failed to delete order", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Something went wrong while deleting the order", { variant: "error" });
        }
    };

    useEffect(() => {
        if (isDeleted) {
            setIsDeleted(false);
        }
    }, [isDeleted]);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Prepare rows for the table
    const rows = currentOrders.map((order) => {
        const productNames = order.products.map((product) => product.name)
        const weights = order.products.map((product) => product.weight)
        const quantities = order.products.map((product) => product.quantity)
        const customerFullName = order.billingDetails.firstName + " " + order.billingDetails.lastName;

        return {
            id: order._id,
            customerName: customerFullName,
            customerAddress: `${order.shippingInfo.address}, ${order.shippingInfo.city} - ${order.shippingInfo.zip}`,
            customerPhone: order.billingDetails.phone,
            productName: productNames,
            weight: weights,
            quantity: quantities,
            amount: order.totalAmount,
            orderOn: formatDate(order.createdAt),
            status: order.orderStatus,
        };
    });



    return (
        <>
            {loading ? <Spinner /> : (
                <>
                    <h1 className="text-lg font-medium uppercase">Orders</h1>
                    <div className="bg-white rounded-xl shadow-lg w-full overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/10">Order Date</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/8">Customer Name</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/8">Customer Phone</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/12">Amount</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/2">Products</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/6">Weight</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/8">Quantity</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/8">Status</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/3">Address</th>
                                    <th className="border-gray-200 border-r p-2 text-left w-1/12">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((order) => (
                                    <tr
                                        key={order.id}
                                        className={`border-b hover:bg-gray-50 ${order.status === "Confirmed" ? 'bg-yellow-100' : ''}`} // Add the yellow background if status is "Confirmed"
                                    >
                                        <td className="p-2">{order.orderOn}</td>
                                        <td className="p-2">{order.customerName}</td>
                                        <td className="p-2">{order.customerPhone}</td>
                                        <td className="p-2">₹{order.amount.toLocaleString()}</td>
                                        <td className="p-2">
                                            {order.productName.map((productName, index) => <div key={index}>{productName}</div>)}
                                        </td>
                                        <td className="p-2">
                                            {order.weight.map((weight, index) => <div key={index}>{weight}</div>)}
                                        </td>
                                        <td className="p-2">
                                            {order.quantity.map((quantity, index) => <div key={index}>{quantity}</div>)}
                                        </td>
                                        <td className="p-2">
                                            <span className={`text-sm font-medium p-1 px-2 rounded-full ${order.status === "Delivered" ? 'bg-green-100 text-green-800' : order.status === "Shipped" ? 'bg-yellow-100 text-yellow-800' : order.status === "Processing" ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-2">{order.customerAddress}</td>
                                        <td className="p-6">
                                            <Actions editRoute={"orders"} deleteHandler={deleteOrderHandler} id={order.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>



                    </div>
                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        <button
                            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    );

};

export default OrderTable;

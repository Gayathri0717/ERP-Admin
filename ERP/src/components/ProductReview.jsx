import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import { useSnackbar } from 'notistack';
import Spinner from './Spinner';

const ProductReviews = () => {
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/reviews/${params.id}`);
                setReviews(response.data.reviews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [params.id]);

    const deleteReviewHandler = async (reviewId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/reviews/${reviewId}`, {
                params: { productId: params.id },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                enqueueSnackbar("Review deleted successfully", { variant: "success" });
                setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
            }
        } catch (err) {
            enqueueSnackbar("Failed to delete review", { variant: "error" });
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    if (loading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-lg font-medium uppercase mb-4">Reviews for Product ID: {params.id}</h1>
            <div className="bg-white rounded-xl shadow-lg w-full overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border-gray-200 border-r p-2 text-left">Review ID</th>
                            <th className="border-gray-200 border-r p-2 text-left">User Name</th>
                            <th className="border-gray-200 border-r p-2 text-left">Comment</th>
                            <th className="border-gray-200 border-r p-2 text-left">Rating</th>
                            <th className="border-gray-200 border-r p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <tr
                                    key={review._id}
                                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                                >
                                    <td className="p-2 align-top">{review._id}</td>
                                    <td className="p-2 align-top">{review.name}</td>
                                    <td className="p-2 align-top">{review.comment}</td>
                                    <td className="p-2 align-top">
                                        <Rating readOnly value={review.rating} size="small" precision={0.5} />
                                    </td>
                                    <td className="p-2 align-top">
                                        <Actions editRoute={"review"} deleteHandler={deleteReviewHandler} id={review._id} />

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No reviews available for this product.
                                </td>
                            </tr>
                        )}

                        
                    </tbody>
                </table>
                <div className="my-4 flex items-center justify-center">
                            <button
                                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(reviews.length / 10)}
                            >
                                Next
                            </button>
                        </div>
            </div>
        </div>
    );
};

export default ProductReviews;
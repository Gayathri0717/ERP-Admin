import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Spinner from './Spinner';
import Actions from './Actions';

const FeedbackTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 10;
    const token = localStorage.getItem('authToken');

    // Fetch feedback (GET)
    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/feedback`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setFeedbacks(data);
            } else {
                setError(data.message || 'Failed to fetch feedback');
                enqueueSnackbar(data.message || 'Failed to fetch feedback', { variant: 'error' });
            }
        } catch (err) {
            setError('Something went wrong');
            enqueueSnackbar('Something went wrong while fetching feedback', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, [enqueueSnackbar, isDeleted]);

    // Delete feedback handler
    const deleteFeedbackHandler = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/feedback/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar('Feedback Deleted Successfully', { variant: 'success' });
                setIsDeleted(true);
            } else {
                enqueueSnackbar(data.message || 'Failed to delete feedback', { variant: 'error' });
            }
        } catch (err) {
            enqueueSnackbar('Something went wrong while deleting the feedback', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (isDeleted) {
            fetchFeedbacks();
            setIsDeleted(false);
        }
    }, [isDeleted, enqueueSnackbar]);

    // Pagination logic
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="bg-white rounded-xl shadow-lg w-full overflow-x-auto">
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-lg font-medium uppercase">Feedback</h1>
                    </div>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-gray-200 border-r p-2 text-left w-1/10">Feedback ID</th>
                                <th className="border-gray-200 border-r p-2 text-left w-1/8">Name</th>
                                <th className="border-gray-200 border-r p-2 text-left w-1/8">Email</th>
                                <th className="border-gray-200 border-r p-2 text-left w-1/2">Message</th>
                                <th className="border-gray-200 border-r p-2 text-left w-1/12">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeedbacks.length > 0 ? (
                                currentFeedbacks.map((feedback, index) => (
                                    <tr
                                        key={feedback._id}
                                        className={`border-b hover:bg-gray-50 ${
                                            index % 2 === 0 ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        <td className="p-2 align-top">{feedback._id}</td>
                                        <td className="p-2 align-top">{feedback.name}</td>
                                        <td className="p-2 align-top">{feedback.mailid}</td>
                                        <td className="p-2 align-top">{feedback.message}</td>
                                        <td className="p-2 align-top">
                                            <Actions
                                                editRoute={"feedback"}
                                                deleteHandler={deleteFeedbackHandler}
                                                id={feedback._id}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No Feedback Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Pagination */}
                
                </div>
            )}
                <div className="my-4 flex justify-center">
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
                            disabled={currentPage === Math.ceil(feedbacks.length / feedbacksPerPage)}
                        >
                            Next
                        </button>
                    </div>
        </>
    );
};

export default FeedbackTable;

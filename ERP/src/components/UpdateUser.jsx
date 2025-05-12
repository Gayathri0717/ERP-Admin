

import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Spinner from './Spinner';

const UpdateUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();
    const userId = params.id;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default-avatar.png");

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                    setName(data.user.name);
                    setEmail(data.user.email);
                    setGender(data.user.gender);
                    setRole(data.user.role);
                    setAvatarPreview(data.user.avatar ? data.user.avatar.url : "/images/default-avatar.png");
                } else {
                    throw new Error(data.message || 'Failed to fetch user details');
                }
            } catch (error) {
                enqueueSnackbar(error.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId, enqueueSnackbar]);

    const updateUserSubmitHandler = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        const token = localStorage.getItem('authToken');
        
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("role", role);
      

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                enqueueSnackbar("User Updated Successfully", { variant: "success" });
                navigate("/admin/users");
            } else {
                throw new Error(data.message || 'Failed to update user');
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {loading ? <Spinner/> : (
                <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-full max-w-xl p-6 sm:p-10">
                    <h2 className="text-center text-2xl font-medium mb-6 text-gray-800">Update User</h2>

                    <form onSubmit={updateUserSubmitHandler} className="space-y-6">
                        {/* User Name and Email Fields */}
                        <div className="flex flex-col space-y-4 justify-start">
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Gender Selection */}
                        <div className="flex items-center space-x-4">
                            <h2 className="text-md">Gender:</h2>
                            <RadioGroup
                                row
                                aria-labelledby="radio-buttons-group-label"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="male" control={<Radio required />} label="Male" />
                                <FormControlLabel value="female" control={<Radio required />} label="Female" />
                            </RadioGroup>
                        </div>

                        {/* Role and Avatar Upload */}
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* <div className="flex items-center space-x-4">
                                {/* <Avatar
                                    alt="Avatar Preview"
                                    src={avatarPreview}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <label className="cursor-pointer">
                                    <span className="text-primary-blue">Change Avatar</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    /> 
                                </label>
                            </div> */}

                            <TextField
                                label="Role"
                                select
                                fullWidth
                                variant="outlined"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="flex flex-col space-y-3">
                            <button
                                type="submit"
                                className="py-3 w-full bg-[#041435] text-white font-medium rounded-sm shadow hover:shadow-lg"
                                disabled={updateLoading}
                            >
                                {updateLoading ? 'Updating...' : 'Update User'}
                            </button>
                            <Link
                                to="/admin/users"
                                className="text-center py-3 w-full text-black bg-gray-300 rounded-sm shadow hover:bg-gray-100"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default UpdateUser;
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';

// const ReviewActions = ({ id, deleteHandler, name, editRoute }) => {

//     const [open, setOpen] = useState(false);


//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             <div className="flex justify-between items-center gap-3">
               
//                     <Link to={`/admin/${editRoute}/${id}`} className="text-blue-600  p-1 rounded-full  ">
//                         <RemoveRedEyeIcon />
//                     </Link>
            
//                 <button onClick={() => setOpen(true)} className="text-red-600 p-1 rounded-full ">
//                     <DeleteIcon />
//                 </button>
//             </div>

//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//             >
//                 <DialogTitle id="alert-dialog-title">
//                     {"Are you sure?"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <p className="text-gray-500">Do you really want to delete{name && <span className="font-medium">&nbsp;{name}</span>}? This process cannot be undone.</p>
//                 </DialogContent>
//                 <DialogActions>
//                     <button onClick={handleClose} className="py-2 px-6 rounded shadow bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
//                     <button onClick={() => deleteHandler(id)} className="py-2 px-6 ml-4 rounded bg-red-600 hover:bg-red-700 text-white shadow">Delete</button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default ReviewActions;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Spinner from './Spinner';

const ReviewActions = ({ id, deleteHandler, name, editRoute }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-center gap-3">
            
                
                
               
               <Link to={`/admin/${editRoute}/${id}`} className="text-blue-600  p-1 rounded-full  ">
                   <RemoveRedEyeIcon />
               </Link>

                
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <p className="text-gray-500">Do you really want to delete{name && <span className="font-medium">&nbsp;{name}</span>}? This process cannot be undone.</p>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="py-2 px-6 rounded shadow bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
                    <button onClick={() => deleteHandler(id)} className="py-2 px-6 ml-4 rounded bg-red-600 hover:bg-red-700 text-white shadow">Delete</button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ReviewActions;
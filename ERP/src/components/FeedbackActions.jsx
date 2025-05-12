import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Actions = ({ id, deleteHandler }) => {
    return (
        <div>
            
            <IconButton onClick={() => deleteHandler(id)} color="error">
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default Actions;

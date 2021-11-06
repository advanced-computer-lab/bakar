import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api';
import Box from '@mui/material/Box';

export default function DeleteFlight({ checks }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

    const handleDelete = async () => {
        const toBeDeleted = [];
        for (const key in checks) {
			if (checks[key] === true) {
				toBeDeleted.push(key);
			}
		}
        const deleteQuery = {
            flightNo: {
              $in: toBeDeleted
            }
        }
        console.log(deleteQuery);
        try {
            let response = await axios.post('/flights/delete', {deleteQuery: deleteQuery});
            console.log(response);
			setOpen(false);
        } catch (err){
            console.log(err);
        }
    }

    function isChecked(x) {
		for (const key in x) {
			if (x[key] === true) {
				return false;
			}
		}
		return true;
	}

	return (
		<div>
			<Button
				variant="contained"
				startIcon={<DeleteIcon />}
				onClick={handleClickOpen}
				disabled={isChecked(checks)}
			>
				Delete Flight(s)
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Careful!"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete all of the selected elements?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant='contained' onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

import { React, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Grid, IconButton } from '@mui/material';

export default function NumberCounter({ value, setValue }) {
	function handleClick(event) {
		if (event.currentTarget.name === 'decrement') {
			value !== 0 ? setValue(--value) : setValue(0);
		} else {
			value !== 12 ? setValue(++value) : setValue(12);
		}
	}

	return (
		<Grid container>
			<Grid item>
				<IconButton variant="outlined" name="decrement" onClick={handleClick}>
					<RemoveCircleIcon />
				</IconButton>
			</Grid>
			<Grid item>{value}</Grid>
			<Grid item>
				<IconButton name="increment" onClick={handleClick}>
					<AddCircleIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
}

import React from 'react';
import { Typography } from '@mui/material';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			sx={{ bottom: '0px', position: 'absolute' }}
			{...props}
		>
			{'Copyright © '}
			Bakar Airlines {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default Copyright;

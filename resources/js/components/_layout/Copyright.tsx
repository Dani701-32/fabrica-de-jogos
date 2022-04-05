import { Typography } from '@mui/material';
import React from 'react';

const Copyright = () => {
    return (
        <>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright Portal Educacional© '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
};
export default React.memo(Copyright);

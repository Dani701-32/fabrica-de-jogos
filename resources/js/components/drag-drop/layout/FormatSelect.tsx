import { Card, Grid, ToggleButton, Typography } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import { styled } from '@mui/system';

const ImageToggleButton = styled(ToggleButton)({
    '&.Mui-selected': {
        border: '5px solid rgba(0, 134, 248, 0.7)',
    },
});

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1440 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1440, min: 1100 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1100, min: 600 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    },
};
const formats = [0, 1, 2];

type Props = {
    callback: Function;
    selectedFormat: Number;
};

const FormatSelect = ({ callback, selectedFormat }: Props) => {
    return (
        <>
            {/* @ts-ignore*/}
            <Grid item align="center" xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Formato: </Typography>
                    </Grid>
                    {formats.map((format, i) => {
                        return (
                            /* @ts-ignore*/
                            <Grid item align="center" margin="auto" xs={12} md={6} lg={4} key={i}>
                                <ImageToggleButton
                                    selected={selectedFormat === format}
                                    value={format}
                                    color="primary"
                                    size="large"
                                    sx={{
                                        padding: 0,
                                        borderRadius: 8,
                                    }}
                                    onChange={(event, value) => {
                                        callback(event, value);
                                    }}
                                >
                                    <Card
                                        sx={{
                                            borderRadius: 8,
                                            height: 150,
                                        }}
                                        elevation={5}
                                    >
                                        <img
                                            src={`/storage/drag-drop/${format}.png`}
                                            alt={`Formato ${format}`}
                                            width="100%"
                                            height="100%"
                                        />
                                    </Card>
                                </ImageToggleButton>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(FormatSelect);

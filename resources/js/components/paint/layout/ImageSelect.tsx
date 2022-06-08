import { Box, Card, Grid, ToggleButton, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
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
        items: 3,
    },
    desktop: {
        breakpoint: { max: 1440, min: 1100 },
        items: 2,
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
const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

type Props = {
    callback: Function;
    selectedImage: Number;
};

const ImageSelect = ({ callback, selectedImage }: Props) => {
    return (
        <>
            {/* @ts-ignore*/}
            <Grid item align="center" xs={12}>
                <Grid container alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Imagem: </Typography>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" margin="auto" xs={12} md={9}>
                        <Carousel responsive={responsive} infinite={true} shouldResetAutoplay={false}>
                            {images.map((image, i) => {
                                return (
                                    <Box
                                        sx={{
                                            width: { xs: 180, sm: 280 },
                                            height: 300,
                                        }}
                                        key={i}
                                    >
                                        <ImageToggleButton
                                            selected={selectedImage === image}
                                            value={image}
                                            color="primary"
                                            size="small"
                                            sx={{
                                                padding: 0,
                                            }}
                                            onChange={(event, value) => {
                                                callback(event, value);
                                            }}
                                        >
                                            <Card
                                                sx={{
                                                    width: 280,
                                                    height: 289,
                                                    borderRadius: selectedImage === image ? 0 : null,
                                                }}
                                                elevation={5}
                                            >
                                                <img
                                                    src={`/storage/paint/${image}.png`}
                                                    alt={`Imagem ${image}`}
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </Card>
                                        </ImageToggleButton>
                                    </Box>
                                );
                            })}
                        </Carousel>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(ImageSelect);

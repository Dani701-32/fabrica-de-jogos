import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Box,
    CssBaseline,
    Container,
    Grid,
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageEditor from './layout/imageEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export default function CreateMemoryGame() {
    const navigate = useNavigate();
    const [images, setImages] = useState([null, null]);
    const [size, setSize] = useState(2);
    const [progress, setProgress] = useState(0);

    const handleSize = (event, newSize) => {
        if (newSize === null) {
            return;
        }
        setSize(newSize);
        if (newSize < images.length) {
            images.splice(newSize - 1, images.length - newSize);
        } else if (newSize > images.length) {
            let img = [...images];
            for (let i = 0; i < newSize - images.length; i++) {
                img.push(null);
            }
            setImages(img);
        }
    };

    const updateImage = (newImage, index) => {
        let i = [...images];
        i.splice(index, 1, newImage);
        setImages(i);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        images.map((image) => {
            data.append('images[]', image);
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDU1YmE3YWVkY2ZhZTlhZjUxMGMzMTBlOWZmODY3ODc0ZGFiNGY5ZGRjMGY0M2IwNzQ3M2VlMzcxYWE2YjE4NTBjZmRhMWY0ODFmMTkyOTYiLCJpYXQiOjE2NDMwMTkzNDMuMTc3MjMsIm5iZiI6MTY0MzAxOTM0My4xNzcyMzcsImV4cCI6MTY3NDU1NTM0My4wOTU5NCwic3ViIjoiMSIsInNjb3BlcyI6W119.cZ_qYhOKtL6zCtska_12w0w-JMabe_O7a6Jy_jdQJ9Jq8BgFOIoxhX4tbcFADoWd8Xm1e8mjXT1y2nBWgweNfZD2Rz7kJgKSg6y9CHferhmzQ5tcIri6GThmKlZfJR5aJNVlFncf7F3xYvcRuBLxQ5z5cLLGSuKkNQr7h_T9BwcA8NWePmDWFmpt2ANFBrAJXYhH7bzriVvDhjr3rAWz6pDwaxM4KPpc0xt8vJBR39Mhrqy--6NiHQ5QqaCkiJ5VRggy7GRaJPTDgzjKLyPsCVYne79iJ6pRW-I8jsdLNBOdlPf38qArY_qPirOlGrPM7vUJq2OhyazDFghdFHI3y7mPItP9RKSdJCjgNb-EFzpmB90hDhckxB9bAeqZclLZW_J_I_NQvNSOrtr9vwesGdp6uDc7uzhRuZZy0zVh6w0v7xj26GclcT4QW3yWg09m0H33VQzhHzmbt5aQbJx4zPnYUKEvEQLGkmlsmsGYMfv5_876EBm6AV3cbNLfZOqkhXi7NkQhxZGCdM6IVpJLXAYPZl3wp0PSj_Yl8sU6jDoqqAwveDlYAfeHpVGZAjkR5xfvZ7SZwJ8BZR8bbIguYnPwIcgLTOAP-ylyT-QDPtuAiM4VTErORNZKXwcDZWUA0msmg-ulmg53Fy4-5KpTyA2x0FiuFs3_EwAdIz209SY'
            },
            onUploadProgress: (event) => {
                setProgress(Math.round((event.loaded * 100) / event.total));
            }
        };
        axios.post('/api/memorygame', data, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/memorygame/${response.data.data.slug}`);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Grid
                        container
                        align="center"
                        component="form"
                        onSubmit={handleSubmit}
                        spacing={3}
                    >
                        <Grid item align="center" xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                required
                            />
                            <TextField
                                type="number"
                                defaultValue={1}
                                variant="outlined"
                                name="layout"
                                required
                                InputProps={{
                                    inputProps: { min: 1, max: 3 }
                                }}
                            />
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <ToggleButtonGroup
                                value={size}
                                exclusive
                                onChange={handleSize}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="2">2x2</ToggleButton>
                                <ToggleButton value="3">2x3</ToggleButton>
                                <ToggleButton value="4">2x4</ToggleButton>
                                <ToggleButton value="5">2x5</ToggleButton>
                                <ToggleButton value="6">3x4</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Grid
                                container
                                align="center"
                                alignItems="flex-start"
                                justifyContent="center"
                                spacing={3}
                            >
                                {images.map((image, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={6}
                                            md={4}
                                            lg={3}
                                            key={index}
                                        >
                                            <ImageEditor
                                                index={index}
                                                callback={updateImage}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        {progress === 0 ? (
                            <Grid item align="center" xs={12}>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="outlined"
                                >
                                    Create
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item align="center" xs={12}>
                                <CircularProgress
                                    variant="determinate"
                                    value={progress}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                WordWall {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}

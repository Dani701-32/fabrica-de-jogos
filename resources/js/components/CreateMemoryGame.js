import React, { useEffect, useState } from 'react';
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
    CircularProgress,
    Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageEditor from './layout/imageEditor';
import { useNavigate } from 'react-router-dom';
import LayoutPicker from './layout/layoutPicker';
import userInfo from './utils/userInfo';
import createGame from './utils/createGame';
import SuccessDialog from './layout/successDialog';

const theme = createTheme();

export default function CreateMemoryGame() {
    let user_info = {};
    useEffect(() => {
        user_info = userInfo();
    }, []);
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

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const [name, setName] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    };

    const updateImage = (newImage, index) => {
        let i = [...images];
        i.splice(index, 1, newImage);
        setImages(i);
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setName('');
        setLayout(1);
        setSize(2);
        setImages([null, null]);
        setProgress(0);
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (images.includes(null)) {
            setAlert('Preencha todos os campos!');
            return;
        }
        const data = new FormData();
        images.map((image) => {
            data.append('images[]', image);
        });
        data.append('name', name);
        data.append('layout', layout.toString());
        data.append('user_id', user_info.user_id);
        data.append('client_id', user_info.client_id);
        data.append('origin', user_info.api_address);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user_info.token}`
            },
            onUploadProgress: (event) => {
                setProgress(Math.round((event.loaded * 100) / event.total));
            }
        };
        createGame(
            'memorygame',
            data,
            config,
            user_info.api_address,
            setAlert,
            navigate,
            setOpen
        );
    };

    const [alert, setAlert] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <SuccessDialog open={open} handleClose={handleClose} />
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
                                label="Nome"
                                onChange={handleName}
                                name="name"
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                        <Grid item align="center" xs={12}>
                            <ToggleButtonGroup
                                value={size}
                                exclusive
                                onChange={handleSize}
                                aria-label="text alignment"
                                color="primary"
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
                                {alert && (
                                    <Grid item xs={12}>
                                        <Alert
                                            severity="warning"
                                            onClick={() => {
                                                setAlert('');
                                            }}
                                        >
                                            {alert}
                                        </Alert>
                                    </Grid>
                                )}
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
                                    Criar
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
                Edutec {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}

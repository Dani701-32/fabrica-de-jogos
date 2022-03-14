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
import ImageEditor from './layout/ImageEditor';
import LayoutPicker from './layout/LayoutPicker';
import userInfo from './utils/userInfo';
import SuccessDialog from './layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import { useParams } from 'react-router-dom';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';

const theme = createTheme();

export default function MemoryGamePage({ mode }) {
    const { slug } = useParams();
    let user_info = {};
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const memorygame = useSelector((state) => state.game.memorygame);
    const progress = useSelector((state) => state.base.progress);
    const [images, setImages] = useState(memorygame.images);
    const [size, setSize] = useState(memorygame.size);
    const [name, setName] = useState(memorygame.name);
    const [layout, setLayout] = useState(memorygame.layout);
    const dispatch = useDispatch();
    const { createGame, getGame, editGame, setAlert, setClose, setProgress } =
        bindActionCreators(actionCreators, dispatch);
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
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleName = (event) => {
        setName(event.target.value);
    };
    const updateImage = (newImage, index) => {
        let i = [...images];
        i.splice(index, 1, newImage);
        setImages(i);
    };
    const handleClose = () => {
        setName('');
        setLayout(1);
        setSize(2);
        setImages([null, null]);
        setProgress(0);
        setClose();
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
        mode === 'EDIT'
            ? editGame(
                  data,
                  'memorygame',
                  memorygame.slug,
                  user_info.token,
                  'multipart/form-data'
              )
            : createGame(data, 'memorygame', user_info, 'multipart/form-data');
    };
    useEffect(() => {
        user_info = userInfo();
        if (mode === 'EDIT') {
            getGame('memorygame', slug);
            setImages(memorygame.images);
            setName(memorygame.name);
            setLayout(memorygame.layout);
        }
    }, [memorygame.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    type="memorygame"
                    slug={memorygame.slug}
                />
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
                                value={name}
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
                                <ToggleButton value="8">4x4</ToggleButton>
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
                                                defaultImg={image}
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
                                    {mode === 'EDIT' ? 'Editar' : 'Criar'}
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
            <Copyright />
        </ThemeProvider>
    );
}

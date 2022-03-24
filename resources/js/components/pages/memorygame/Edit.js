import React, { useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { Grid, Button, CircularProgress, Alert } from '@mui/material';
import ImageEditor from './layout/ImageEditor';
import LayoutSelect from '../../layout/LayoutSelect';
import SuccessDialog from '../../layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actionCreators';
import { useParams } from 'react-router-dom';
import GridSelect from './layout/GridSelect';

const EditMemoryGame = () => {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const memorygame = useSelector((state) => state.game.memorygame);
    const progress = useSelector((state) => state.base.progress);
    const [defaultImages, setDefaultImages] = useState(memorygame.images);
    const [images, setImages] = useState(memorygame.images);
    const [size, setSize] = useState(
        (memorygame.grid[0] * memorygame.grid[1]) / 2
    );
    const [name, setName] = useState(memorygame.name);
    const [layout, setLayout] = useState(memorygame.layout);
    const dispatch = useDispatch();
    const {
        getGame,
        editGame,
        setAlert,
        setClose,
        setProgress,
        refreshBaseState
    } = bindActionCreators(actionCreators, dispatch);
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
        editGame(data, 'memorygame', memorygame.slug, 'multipart/form-data');
    };
    useEffect(() => {
        getGame('memorygame', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);

    useEffect(() => {
        memorygame.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setDefaultImages(memorygame.images);
        setImages(memorygame.images);
        setSize((memorygame.grid[0] * memorygame.grid[1]) / 2);
        setLayout(memorygame.layout);
    }, [memorygame.slug]);

    return (
        <>
            <SuccessDialog
                open={open}
                handleClose={handleClose}
                edit={true}
                type="memorygame"
                slug={memorygame.slug}
            />
            <Grid
                container
                align="center"
                component="form"
                justifyContent="center"
                onSubmit={handleSubmit}
                spacing={3}
            >
                <LayoutSelect
                    handleLayout={handleLayout}
                    selectedLayout={layout}
                />
                <GridSelect size={size} handleSize={handleSize} />
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
                                <ImageEditor
                                    key={index}
                                    index={index}
                                    defaultImg={defaultImages[index]}
                                    callback={updateImage}
                                />
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
                            disabled={!!memorygame.approved_at}
                        >
                            Salvar
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
        </>
    );
};

export default EditMemoryGame;

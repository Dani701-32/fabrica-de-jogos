import React, { ChangeEvent, useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Grid,
    Button,
    CircularProgress,
    Alert,
    Typography
} from '@mui/material';
import ImageEditor from './layout/ImageEditor';
import LayoutSelect from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import GridSelect from './layout/GridSelect';
import Copyright from '../_layout/Copyright';
import { Box } from '@mui/system';
import {
    useUpdateMemoryGameMutation,
    useGetMemoryGameBySlugQuery
} from '../../services/games';
import { getError } from '../../utils/errors';

const EditMemoryGame = () => {
    const { slug } = useParams();
    const [updateMemoryGame, response] = useUpdateMemoryGameMutation();
    const { data, error, isLoading } = useGetMemoryGameBySlugQuery(
        slug as string
    );
    const [open, setOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>('');
    const [images, setImages] = useState<Blob[]>([new Blob(), new Blob()]);
    const [size, setSize] = useState<number>(2);
    const [layout, setLayout] = useState<number>(1);
    const handleSize = (
        event: ChangeEvent<HTMLInputElement>,
        newSize: number
    ) => {
        if (newSize !== null) {
            return;
        }
        setSize(newSize);
        if (newSize < images.length) {
            images.splice(newSize - 1, images.length - newSize);
        } else if (newSize > images.length) {
            let img = [...images];
            for (let i = 0; i < newSize - images.length; i++) {
                img.push(new Blob());
            }
            setImages(img);
        }
    };
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const updateImage = (newImage: Blob, index: number) => {
        let i = [...images];
        i.splice(index, 1, newImage);
        setImages(i);
    };
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const data = new FormData();
        images.map((image: Blob) => {
            data.append('options[]', image);
        });
        data.append('layout', layout.toString());
        updateMemoryGame({ slug, data });
    };

    const getImageBlobs = (images: string[]) => {
        let blobs: Blob[] = [];
        images.map((image) => {
            fetch(image)
                .then((res) => res.blob()) // Gets the response and returns it as a blob
                .then((blob) => {
                    blobs.push(blob);
                });
        });
        return blobs;
    };

    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            setImages(getImageBlobs(data.options as string[]));
            setLayout(data.layout);
        }
        error && setAlert(getError(error));
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && setOpen(true);
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        );

    return (
        <>
            <SuccessDialog open={open} handleClose={() => setOpen(false)} />
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
                    component="form"
                    justifyContent="center"
                    onSubmit={handleSubmit as any}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Jogo da Memória</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <LayoutSelect
                            callback={handleLayout}
                            selectedLayout={layout}
                        />
                    </Grid>
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <GridSelect size={size} handleSize={handleSize} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
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
                            {images.map((image: Blob, index: number) => {
                                return (
                                    <ImageEditor
                                        key={index}
                                        image={image}
                                        index={index}
                                        callback={updateImage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        {response.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                                disabled={Boolean(data?.approved_at)}
                            >
                                Salvar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default EditMemoryGame;

import React, { ChangeEvent, FormEvent, FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import SuccessDialog from '../_layout/SuccessDialog';
import { Alert, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import LayoutPicker from '../_layout/LayoutSelect';
import { getError } from '../../utils/errors';
import { useParams } from 'react-router-dom';
import { useGetPuzzleBySlugQuery, useUpdatePuzzleMutation } from '../../services/games';
import PiecesSelect from './layout/PiecesSelect';
import ImageSelect from './layout/ImageSelect';

const EditPuzzle: FunctionComponent = ({}) => {
    const { slug } = useParams();
    const { data, error, isLoading } = useGetPuzzleBySlugQuery(slug as string);
    const [updatePuzzle, response] = useUpdatePuzzleMutation();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [layout, setLayout] = useState<number>(1);
    const [image, setImage] = useState(0);
    const [pieces, setPieces] = useState<number>(2);
    const handlePieces = (event: ChangeEvent<HTMLInputElement>, newPieces: number) => {
        if (newPieces === null) {
            return;
        }
        setPieces(newPieces);
    };
    const handleImage = (event: ChangeEvent<HTMLInputElement>, newImage: number) => {
        if (newImage === null) {
            return;
        }
        setImage(newImage);
    };
    const handleLayout = (event: ChangeEvent<HTMLInputElement>, newLayout: number) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleSubmit: FormEventHandler = (event: FormEvent<HTMLInputElement>): void => {
        event.preventDefault();

        const body = {
            layout: layout,
            options: [pieces, image],
        };

        updatePuzzle({ slug, ...body });
    };
    useEffect(() => {
        if (data) {
            data.approved_at && setAlert('Esse jogo já foi aprovado, logo não pode mais ser editado!');
            setPieces(data.options[0]);
            setImage(data.options[1]);
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
                    transform: 'translate(-50%, -50%)',
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
                    flexDirection: 'row',
                }}
            >
                <Grid container justifyContent="center" component="form" onSubmit={handleSubmit} spacing={3}>
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Quebra-Cabeça</b>
                        </Typography>
                    </Grid>
                    <LayoutPicker callback={handleLayout} selectedLayout={layout} />
                    <Grid item lg={12}>
                        <Grid container alignItems="flex-start" justifyContent="center" spacing={3}>
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
                            {/* @ts-ignore */}
                            <Grid item align="center" xs={12}>
                                <PiecesSelect pieces={pieces} handlePieces={handlePieces} />
                            </Grid>
                            {/* @ts-ignore */}
                            <Grid item align="center" xs={12}>
                                <ImageSelect selectedImage={image} callback={handleImage} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        {response.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Grid item xs={12}>
                                <Button size="large" type="submit" variant="outlined" disabled={Boolean(data?.approved_at)}>
                                    Salvar
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default EditPuzzle;

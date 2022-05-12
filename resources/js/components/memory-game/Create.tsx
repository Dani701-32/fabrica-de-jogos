import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Grid,
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress,
    Alert,
    SelectChangeEvent
} from '@mui/material';
import ImageEditor from './layout/ImageEditor';
import LayoutPicker from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import Copyright from '../_layout/Copyright';
import { Box } from '@mui/system';
import BackFAButton from '../_layout/BackFAButton';
import { RootState } from '../../store';
import ObjectPropertiesSelect from '../_layout/ObjectPropertiesSelect';

const CreateMemorygame = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [images, setImages] = useState<Blob[]>([new Blob(), new Blob()]);
    const [size, setSize] = useState(2);
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const [selectedSerie, setSelectedSerie] = useState([] as string[]);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const handleSize = (
        event: ChangeEvent<HTMLInputElement>,
        newSize: number
    ) => {
        if (newSize === null) {
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
    const handleClose = () => {
        setName('');
        setLayout(1);
        setSize(2);
        setImages([]);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        if (value !== null) {
            setSelectedSerie(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };
    const disciplineChange = (event: SelectChangeEvent): void => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (selectedSerie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (selectedDiscipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        const data = new FormData();
        images.map((image: Blob) => {
            data.append('images[]', image);
        });
        data.append('name', name);
        data.append('layout', layout.toString());
    };

    return (
        <>
            <SuccessDialog open={open} handleClose={handleClose} />
            <BackFAButton />
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
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <TextField
                            label="Nome"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ObjectPropertiesSelect
                            token={token as string}
                            origin={origin as string}
                            selectedSerie={selectedSerie}
                            handleSelectSerie={seriesChange}
                            selectedDiscipline={selectedDiscipline}
                            handleSelectDiscipline={disciplineChange}
                        />
                    </Grid>
                    <LayoutPicker
                        handleLayout={handleLayout}
                        selectedLayout={layout}
                    />
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <ToggleButtonGroup
                            value={size}
                            exclusive
                            onChange={handleSize as any}
                            aria-label="text alignment"
                            color="primary"
                        >
                            <ToggleButton value={2}>2x2</ToggleButton>
                            <ToggleButton value={3}>2x3</ToggleButton>
                            <ToggleButton value={4}>2x4</ToggleButton>
                            <ToggleButton value={5}>2x5</ToggleButton>
                            <ToggleButton value={6}>3x4</ToggleButton>
                        </ToggleButtonGroup>
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
                                        index={index}
                                        callback={updateImage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Button size="large" type="submit" variant="outlined">
                            Criar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default CreateMemorygame;

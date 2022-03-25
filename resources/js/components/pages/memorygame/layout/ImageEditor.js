import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, Box, Grid, Card, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 2
};

const ImageEditor = ({ index, callback, defaultImg = null }) => {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [crop, setCrop] = useState({ unit: '%', width: 40, aspect: 1 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
            handleOpen();
        }
    };

    function generateBlob(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                callback(blob, index);
            },
            'image/png',
            1
        );
    }

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const loadDefaultImg = (defaultImg) => {
        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        let img = new Image();
        ctx.imageSmoothingQuality = 'high';
        img.src = URL.createObjectURL(defaultImg);
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    useEffect(() => {
        defaultImg && loadDefaultImg(defaultImg);
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
        generateBlob(previewCanvasRef.current, completedCrop);
    }, [completedCrop, defaultImg]);

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Grid container align="center" spacing={3}>
                <Grid item xs={12}>
                    <Card elevation={5} sx={{ width: 250, height: 250 }}>
                        <canvas
                            id={`canvas ${index}`}
                            ref={previewCanvasRef}
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                        />
                    </Card>
                    <Grid
                        item
                        xs={12}
                        align="center"
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <label htmlFor={`upload-image${index}`}>
                            <input
                                style={{ display: 'none' }}
                                id={`upload-image${index}`}
                                name={`upload-image${index}`}
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                            />

                            <Button
                                size="small"
                                variant="outlined"
                                component="span"
                            >
                                Selecione uma imagem
                            </Button>
                        </label>
                    </Grid>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ReactCrop
                            src={upImg}
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                        />
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
};

export default React.memo(ImageEditor);

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Modal,
    Box,
    Grid,
    Card,
    CardActions,
    CardContent
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function ImageEditor(props) {
    const { index, callback } = props;
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [open, setOpen] = React.useState(false);
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

    useEffect(() => {
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
    }, [completedCrop]);

    return (
        <Grid container align="center" spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                width: 200,
                                height: 200
                            }}
                        />
                    </CardContent>
                    <CardActions>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onSelectFile}
                            required
                        />
                    </CardActions>
                </Card>
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
    );
}

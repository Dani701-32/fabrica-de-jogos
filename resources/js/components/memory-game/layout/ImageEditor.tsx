import React, { useState, useRef, useEffect, FunctionComponent } from 'react';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop
} from 'react-image-crop';
import { canvasPreview } from '../utils/canvasPreview';
import { useDebounceEffect } from '../utils/useDebounceEffect';
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

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

type Props = {
    image: Blob;
    index: number;
    callback: Function;
};

export const ImageEditor: FunctionComponent<Props> = ({
    image,
    index,
    callback
}) => {
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [open, setOpen] = useState(Boolean(completedCrop));
    const [aspect, setAspect] = useState<number | undefined>(1);

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setOpen(true);
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader?.result?.toString() || '')
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    function generateBlob(crop: Crop, canvas?: HTMLCanvasElement) {
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

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                await canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop
                );
            }
        },
        100,
        [completedCrop]
    );

    useEffect(() => {
        const canvas = previewCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            let img = new Image();
            ctx.imageSmoothingQuality = 'high';
            img.src = URL.createObjectURL(image);
            img.onload = () => {
                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvas?.width ?? 0,
                    canvas?.height ?? 0
                );
            };
        }
    }, []);

    useEffect(() => {
        if (completedCrop) {
            generateBlob(
                completedCrop,
                previewCanvasRef.current ?? new HTMLCanvasElement()
            );
        }
    }, [completedCrop]);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {/*@ts-ignore*/}
            <Grid container align="center" spacing={1}>
                <Grid item xs={12}>
                    <Card elevation={5} sx={{ width: 250, height: 250 }}>
                        {Boolean(completedCrop) && (
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    objectFit: 'contain',
                                    width: 250,
                                    height: 250
                                }}
                            />
                        )}
                    </Card>
                </Grid>
                {/*@ts-ignore*/}
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
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
};

export default ImageEditor;

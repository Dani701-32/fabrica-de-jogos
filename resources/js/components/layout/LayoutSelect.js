import { Box, Card, Grid, ToggleButton, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import { styled } from '@mui/material/styles';

const ImageToggleButton = styled(ToggleButton)({
    '&.Mui-selected': {
        border: '5px solid rgba(0, 134, 248, 0.7)'
    }
});

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};
const layouts = [1, 2, 3, 4, 5];

const LayoutSelect = ({ handleLayout, selectedLayout }) => {
    return (
        <Grid item align="center" xs={12}>
            <Grid container align="center" alignItems="center">
                <Grid item align="center" xs={12}>
                    <Typography variant="subtitle1">Tema:</Typography>
                </Grid>
                <Grid item align="center" margin="auto" lg={9} md={12}>
                    <Carousel responsive={responsive} infinite={true}>
                        {layouts.map((layout, i) => {
                            return (
                                <Box sx={{ width: 250, height: 145 }} key={i}>
                                    <ImageToggleButton
                                        selected={selectedLayout === layout}
                                        value={layout}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <Card
                                            sx={
                                                selectedLayout === i
                                                    ? {
                                                          width: 250,
                                                          height: 125
                                                      }
                                                    : {
                                                          width: 250,
                                                          height: 125,
                                                          borderRadius: 0
                                                      }
                                            }
                                            elevation={5}
                                        >
                                            <img
                                                src={`/storage/layout/layout${layout}.png`}
                                                alt={`Layout ${layout}`}
                                                width="100%"
                                                height="100%"
                                            />
                                        </Card>
                                    </ImageToggleButton>
                                </Box>
                            );
                        })}
                    </Carousel>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default React.memo(LayoutSelect);

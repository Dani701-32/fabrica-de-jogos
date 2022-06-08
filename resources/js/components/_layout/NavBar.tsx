import React from 'react';
import { AppBar, Avatar, Box, Container, Grid, Toolbar, Typography } from '@mui/material';
import { userInfoData } from '../../types';

type Props = {
    data?: userInfoData;
};

const NavBar = ({ data }: Props) => {
    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 0 }}>
                            <img
                                src={`https://metech.s3.flexify.io/${data?.data.prefeitura_logo}`}
                                alt="logo"
                                height="50px"
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    ml: 2,
                                    display: { xs: 'none', sm: 'flex' },
                                }}
                            >
                                {data?.data.prefeitura_nome}
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Grid container direction="column" justifyContent="flex-end">
                                <Grid item xs={9}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', sm: 'flex' },
                                        }}
                                    >
                                        {data?.data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="subtitle2"
                                        noWrap
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', sm: 'flex' },
                                        }}
                                    >
                                        {data?.data.role}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Avatar
                                alt="avatar"
                                src={`https://metech.s3.flexify.io/${data?.data.pfp}`}
                                sx={{
                                    p: 0,
                                    margin: 2,
                                    height: 50,
                                    width: 50,
                                }}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default React.memo(NavBar);

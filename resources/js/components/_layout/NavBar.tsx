import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    CircularProgress,
    Container,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetUserInfoQuery } from '../../services/portal';

const NavBar = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const { data, isLoading } = useGetUserInfoQuery({ token, origin });
    if (isLoading)
        return (
            // @ts-ignore
            <Grid item align="center">
                <CircularProgress />
            </Grid>
        );
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid sx={{ margin: 2 }}>
                            <img
                                src={data?.data.prefeitura_logo}
                                alt="logo"
                                height="50px"
                            />
                        </Grid>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            {data?.data.prefeitura_nome}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar
                            alt="avatar"
                            src={`https://metech.s3.flexify.io/${data?.data.pfp}`}
                            sx={{ p: 0, margin: 2, height: 50, width: 50 }}
                        />
                    </Box>
                    <Grid container direction="column">
                        <Grid item xs={9}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' }
                                }}
                            >
                                {data?.data.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' }
                                }}
                            >
                                {data?.data.role}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </>
    );
};

export default React.memo(NavBar);

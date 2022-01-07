import React from "react";
import { AppBar, Toolbar, Typography, Link, Button } from "@mui/material";

export default function Header() {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar sx={{ flexWrap: "wrap" }}>
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    WordWall
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Enterprise
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

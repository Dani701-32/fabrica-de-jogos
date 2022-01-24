import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper,
    Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MUIRichTextEditor from 'mui-rte';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    },
    overrides: {
        MUIRichTextEditor: {
            container: {
                display: 'flex',
                flexDirection: 'column'
            },
            editor: {
                padding: '10px',
                maxHeight: '200px',
                overflow: 'auto',
                alignItems: 'center'
            },
            toolbar: {
                borderBottom: '1px solid gray'
            },
            placeHolder: {
                paddingLeft: 20,
                width: 'inherit',
                color: 'lightgrey'
            },
            anchorLink: {
                color: '#333333',
                textDecoration: 'underline'
            }
        }
    }
});

export default function CreateMatchUp() {
    const navigate = useNavigate();
    const wordState = {
        word: '',
        meaning: EditorState.createEmpty()
    };
    const pageState = [wordState, wordState, wordState, wordState];
    const [pages, setPages] = useState([pageState]);

    const handleCreatePage = () => {
        setPages([...pages, pageState]);
    };

    const handleDeletePage = (index) => {
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };

    const handleMeaningChange = (editorState, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(index, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
        console.log(pages);
    };

    const handleWordChange = (event, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(index, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
        console.log(pages);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(pages);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
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
                        align="center"
                        component="form"
                        onSubmit={handleSubmit}
                        spacing={5}
                    >
                        <Grid item align="center" xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                required
                            />
                            <TextField
                                type="number"
                                defaultValue={1}
                                variant="outlined"
                                name="layout"
                                required
                                InputProps={{
                                    inputProps: { min: 1, max: 3 }
                                }}
                            />
                        </Grid>

                        <Grid item align="center" xs={12}>
                            <Typography variant="p" fontSize="small">
                                Add Page
                            </Typography>
                            <IconButton onClick={handleCreatePage}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        {pages.map((page, index) => {
                            return (
                                <Grid key={index} item lg={6}>
                                    <Paper
                                        elevation={5}
                                        sx={{
                                            padding: '15px'
                                        }}
                                    >
                                        <Grid
                                            container
                                            align="center"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={10}>
                                                <Typography variant="subtitle1">
                                                    Page{' '}
                                                    {(index + 1).toString()}
                                                </Typography>
                                            </Grid>
                                            {index === pages.length - 1 && (
                                                <Grid item xs={2}>
                                                    <IconButton
                                                        onClick={() => {
                                                            handleDeletePage(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                            <Grid item xs={12}>
                                                <Grid
                                                    container
                                                    align="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    {page.map((item, i) => {
                                                        return (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                key={i}
                                                            >
                                                                <Grid
                                                                    container
                                                                    align="center"
                                                                    alignItems="center"
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                    >
                                                                        <TextField
                                                                            variant="outlined"
                                                                            label="Word"
                                                                            required
                                                                            inputProps={{
                                                                                maxLength: 26
                                                                            }}
                                                                            fullWidth
                                                                            value={
                                                                                item.word
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleWordChange(
                                                                                    event,
                                                                                    index,
                                                                                    i
                                                                                )
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1}
                                                                    >
                                                                        <KeyboardDoubleArrowRight fontSize="small" />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        align="left"
                                                                        xs={7}
                                                                    >
                                                                        <Paper variant="outlined">
                                                                            <MUIRichTextEditor
                                                                                controls={[
                                                                                    'bold',
                                                                                    'italic',
                                                                                    'underline',
                                                                                    'strikethrough',
                                                                                    'undo',
                                                                                    'redo',
                                                                                    'clear'
                                                                                ]}
                                                                                editorState={
                                                                                    item.meaning
                                                                                }
                                                                                label="Meaning"
                                                                                maxLength={
                                                                                    80
                                                                                }
                                                                                onChange={(
                                                                                    editorState
                                                                                ) => {
                                                                                    handleMeaningChange(
                                                                                        editorState,
                                                                                        index,
                                                                                        i
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </Paper>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            );
                        })}
                        <Grid item align="center" xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                WordWall {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}

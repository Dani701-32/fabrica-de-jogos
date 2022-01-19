import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MUIRichTextEditor from 'mui-rte';
import { EditorState, convertToRaw } from 'draft-js';

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
                width: 'inherit'
            },
            anchorLink: {
                color: '#333333',
                textDecoration: 'underline'
            }
        }
    }
});

export default function CreateQuiz() {
    const navigate = useNavigate();
    const questionObj = {
        title: EditorState.createEmpty(),
        answers: ['', '']
    };
    const [questions, setQuestions] = useState([
        { title: EditorState.createEmpty(), answers: ['', ''] }
    ]);
    const handleCreateQuestion = () => {
        setQuestions([...questions, questionObj]);
    };
    const handleRemoveQuestion = (index) => {
        let q = [...questions];
        q.splice(index, 1);
        setQuestions(q);
    };
    const handleCreateAnswer = (index) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 5) {
            return;
        }
        question.answers.push('');
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleRemoveAnswer = (index, i) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 2) {
            return;
        }
        question.answers.splice(i, 1);
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleQuestionTitleChange = (value, index) => {
        let q = [...questions];
        let question = q[index];
        question.title = value;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleAnswerChange = (event, index, i) => {
        let q = [...questions];
        let question = questions[index];
        question.answers[i] = event.target.value;
        q.splice(index, 1, question);
        setQuestions(q);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let layout = data.get('layout');
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent())
            let fullText = [];
            console.log(textJson)
            textJson.blocks.map((block ) => {
                let text = block.text.split("");
                let counter = 0;
                block.inlineStyleRanges.map((inline) => {
                    let start = inline.offset + counter
                    let end = inline.offset + inline.length + counter
                    switch (inline.style) {
                        case "BOLD":
                            text.splice(start, 0, "[b]");
                            text.splice(end, 0, "[/b]");
                            break
                        case "UNDERLINE":
                            text.splice(start, 0, "[u]");
                            text.splice(end, 0, "[/u]");
                            break
                        case "STRIKETHROUGH":
                            text.splice(start, 0, "[s]");
                            text.splice(end, 0, "[/s]");
                            break
                        case "ITALIC":
                            text.splice(start, 0, "[i]");
                            text.splice(end, 0, "[/i]");
                            break
                    }
                    counter += 1
                fullText.push(text)
                })
            })
            questionsJSON.push({
                answers: item.answers,
                title: fullText.join(),
            });
        });
        const body = JSON.stringify({
            name: name,
            layout: layout,
            questions: questionsJSON
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGI2OWIxOTE4ODg3OTc5M2IwZjRiY2M2NTVjNTRkMGQxMGIzZDM3M2VhYTVjZjYwZmVlYTFmZDhhMGUwYTJiNTBiNWZlZWE0MGY1N2ZhMTIiLCJpYXQiOjE2NDI2MDI4MTkuMTY0MTYzLCJuYmYiOjE2NDI2MDI4MTkuMTY0MTY4LCJleHAiOjE2NzQxMzg4MTkuMTU2Nzc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lJKyZb1bS5BToPjsz5xUdsUJ-arSRhsco6GXHJ-Xl6mmGLEaKt-2wzZ29fcq9FNP1GjUbnko96_9Ho8IEK37UXs4kXfHldsYlGch8u0ZLv83HgFctWyYHVpOoQ6_J8ATRFKQLtuWQ12JNmB_NHNV6SuoR7JQI603hsHTlEc_UGodBMO0RK3WEnIbZ3gsunEB9gCMhhesXD2tKhLhCbNeG5IFhhP_UQHVRjy4gVUg2dRxytwSp6VoIMpmFDkKRrRJHSG7bZz5rcodMwJVsFzWcFNhwBN0dtakiq_YD3s7u0Mo0NBcKm6G4OysoTw-2GMYdXNtzn46mg8rslkUcPOJkrpGSw-T1ZNhCeAqby3o6rptNGMhSTK9POZ9N0oUOHic96xk_cUKUUDpDPMvzV3L_Key3EzyUjge19QzvSPdFY3aXYEcCkvjRRanqun13q5KD4o3yMOHHsVSUKNX80P1mur5mnqL9rRIhPq1mXsNsHN-G14sVRRArSjpiHVBPSKq1g044_38VWyll-quWsJrnQfNaydILKxeuanM7x7hw1KzlJv6ift0ac3yIRFrph_jsva6CIGg86dv93lOx-uZJ9OLSjEbZcN66oap4C4yvIOVZeDy-yw-eKH1_D0Zsz898CmhogeuJsCCY1dfrTAzC0KTE19vBKivKXn_9zm66qs'
            }
        };
        axios.post('/api/quiz', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/quiz/${response.data.data.slug}`);
            }
        });
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
                                Add Question
                            </Typography>
                            <IconButton onClick={handleCreateQuestion}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Grid item lg={12}>
                            <Grid
                                container
                                align="center"
                                alignItems="flex-start"
                                justifyContent="center"
                                spacing={5}
                            >
                                {questions.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={8}
                                            md={6}
                                            lg={6}
                                            key={index}
                                        >
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
                                                            Question{' '}
                                                            {(
                                                                index + 1
                                                            ).toString()}
                                                        </Typography>
                                                    </Grid>
                                                    {index > 0 && (
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleRemoveQuestion(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Grid>
                                                    )}
                                                    <Grid
                                                        item
                                                        align="left"
                                                        xs={12}
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
                                                                value={JSON.stringify(
                                                                    convertToRaw(item.title.getCurrentContent()))}
                                                                onChange={(
                                                                    editorState
                                                                ) => {
                                                                    handleQuestionTitleChange(
                                                                        editorState,
                                                                        index
                                                                    );
                                                                }}
                                                                label="Title..."
                                                                maxLength={160}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                    {questions[index].answers
                                                        .length <= 4 && (
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                variant="p"
                                                                fontSize="small"
                                                            >
                                                                Add Answer
                                                            </Typography>
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleCreateAnswer(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Grid>
                                                    )}
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        key={index}
                                                    >
                                                        <Grid
                                                            container
                                                            align="center"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            {item.answers.map(
                                                                (answer, i) => {
                                                                    return (
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {i ===
                                                                            0 ? (
                                                                                <Grid
                                                                                    container
                                                                                    align="center"
                                                                                    spacing={
                                                                                        2
                                                                                    }
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            10
                                                                                        }
                                                                                    >
                                                                                        <TextField
                                                                                            variant="outlined"
                                                                                            label="Correct answer"
                                                                                            size="small"
                                                                                            required
                                                                                            inputProps={{
                                                                                                maxLength: 31
                                                                                            }}
                                                                                            focused
                                                                                            fullWidth
                                                                                            color="success"
                                                                                            value={
                                                                                                questions[
                                                                                                    index
                                                                                                ]
                                                                                                    .answers[
                                                                                                    i
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                event
                                                                                            ) =>
                                                                                                handleAnswerChange(
                                                                                                    event,
                                                                                                    index,
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ) : (
                                                                                <Grid
                                                                                    container
                                                                                    align="center"
                                                                                    spacing={
                                                                                        2
                                                                                    }
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            10
                                                                                        }
                                                                                    >
                                                                                        <TextField
                                                                                            variant="outlined"
                                                                                            label={
                                                                                                'Answer ' +
                                                                                                (i +
                                                                                                    1)
                                                                                            }
                                                                                            fullWidth
                                                                                            size="small"
                                                                                            inputProps={{
                                                                                                maxLength: 31
                                                                                            }}
                                                                                            value={
                                                                                                questions[
                                                                                                    index
                                                                                                ]
                                                                                                    .answers[
                                                                                                    i
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                event
                                                                                            ) =>
                                                                                                handleAnswerChange(
                                                                                                    event,
                                                                                                    index,
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            2
                                                                                        }
                                                                                    >
                                                                                        <IconButton
                                                                                            onClick={() => {
                                                                                                handleRemoveAnswer(
                                                                                                    index,
                                                                                                    i
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <DeleteIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            )}
                                                                        </Grid>
                                                                    );
                                                                }
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
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

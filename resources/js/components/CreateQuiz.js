import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MaterialSlate,
    MaterialEditable,
    createMaterialEditor,
    Toolbar,
    CharCounter,
    withCounter,
    BoldButton,
    ItalicButton,
    UnderlinedButton,
    StrikethroughButton,
} from "@unicef/material-slate";

const theme = createTheme();

export default function CreateQuiz() {
    const navigate = useNavigate();
    const initialValue = () => {
        return [
            {
                type: "paragraph",
                children: [{ text: "" }],
            },
        ];
    };
    const questionObj = {
        title: initialValue(),
        answers: ["", ""],
    };
    const [questions, setQuestions] = useState([
        { title: initialValue(), answers: ["", ""] },
    ]);
    const handleCreateQuestion = () => {
        setQuestions([...questions, questionObj]);
        let editors_ = editors;
        editors_.push(withCounter(createMaterialEditor()));
        setEditors(editors_);
    };
    const handleRemoveQuestion = (index) => {
        let q = [...questions];
        q.splice(index, 1);
        let editors_ = editors;
        editors_.splice(index, 1);
        setEditors(editors_);
        setQuestions(q);
    };
    const handleCreateAnswer = (index) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 5) {
            return;
        }
        question.answers.push("");
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
        let question = questions[index];
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
        let name = data.get("name");
        let layout = data.get("layout");
        let questionsJSON = [];
        console.log(questions);
        questions.map((item) => {
            let title = "";
            item.title[0].children.map((child) => {
                let text = child.text;
                child.bold && (text = `[b]${text}[/b]`);
                child.italic && (text = `[i]${text}[/i]`);
                child.underlined && (text = `[u]${text}[/u]`);
                child.strikethrough && (text = `[s]${text}[/s]`);
                title = title + text;
            });
            questionsJSON.push({
                answers: item.answers,
                title: title,
            });
        });
        const body = JSON.stringify({
            name: name,
            layout: layout,
            questions: questionsJSON,
        });
        console.log(body);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODVkMjg0N2FjMDQ0ZWFmMTVlM2NmYTIxN2Y2YjJlMjk2ZTI1Mzc0ODI1MjA3ODRjYmI2MmMwNDQ3ZmM4MDBmZDIzY2I4ZTNiNTM0MDljNjciLCJpYXQiOjE2NDE1NjU0MzAuOTkwMTcsIm5iZiI6MTY0MTU2NTQzMC45OTAxNzQsImV4cCI6MTY3MzEwMTQzMC44NTYzODksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.GYIjvpZIYkzCoM094Ie9Tu0oQwgkc7WIC3-rjIXfYVGgB9CulBAsA9Kd5hpRaGkokqYkxOdRl01xq2V67D4QzZD47cNsm0Lwiyxy0Jg0WGmjs1SAT3sF43Doac44Z684G5SYPESGVzIFioelGMzGjnMgw_zgS1mMr2tTK7N8KG0Yja1sC5jp-zIzOlJvzsOG40GoW3YBqs1F6cU8X8SMgvRjgemUAexBN2Hs98pfhopTSNvrZmkLlRwyLReZZVEur7B54q6s2o4uHj-eCobo3GzsjSE13p0ieMMs6v0wmUl5RGXn8OmdVxhdJGQgquT50OKc-c6XAiXi8Vzll-XabDVNtxkD3AxSBVnHap56o6sgZ-rhNra3XA7VMWYBjVlSgWsroAutxx5vZvLyuRrS8BK-LKb5vZmhTr9u_MoWhByXGs1VMbT_P_oD26tXfYnldgcuZV7Z8Rvpbvfar8AE1sSiQEuOB5pqQQzOjNO447rv3g_RQ8eBc5fuvVv7rpkPljxfbQg7wT0k5iBx82auMevfVxE_CyFTKE2qHv1G2veNeZaWurVW0sOE3VHZ5vpnGdY6f_FQXsOjAhpXCyQJZwWVmaOINMRDdCDmRtOXXGj_2_c6RdepEj-53WFYAQbwKLmop8YdgPOHR8i_AJjlDaEuwulYaEFDDG7KXqlQ8Z8",
            },
        };
        axios.post("/api/quiz", body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/quiz/${response.data.data.slug}`);
            }
        });
    };
    const [editors, setEditors] = useState([
        withCounter(createMaterialEditor()),
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
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
                                    inputProps: { min: 1, max: 3 },
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
                                                    padding: "15px",
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
                                                            Question{" "}
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
                                                        <MaterialSlate
                                                            editor={
                                                                editors[index]
                                                            }
                                                            value={
                                                                questions[index]
                                                                    .title
                                                            }
                                                            onChange={(event) =>
                                                                handleQuestionTitleChange(
                                                                    event,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Toolbar>
                                                                <BoldButton />
                                                                <ItalicButton />
                                                                <UnderlinedButton />
                                                                <StrikethroughButton />
                                                            </Toolbar>
                                                            <MaterialEditable placeholder="Title of the Question" />
                                                            <Box
                                                                display="flex"
                                                                justifyContent="space-between"
                                                                mr={1}
                                                            >
                                                                <CharCounter
                                                                    maxChars={
                                                                        160
                                                                    }
                                                                />
                                                            </Box>
                                                        </MaterialSlate>
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
                                                                                                maxLength: 31,
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
                                                                                                "Answer " +
                                                                                                (i +
                                                                                                    1)
                                                                                            }
                                                                                            fullWidth
                                                                                            size="small"
                                                                                            inputProps={{
                                                                                                maxLength: 31,
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
                {"Copyright © "}
                WordWall {new Date().getFullYear()}
                {"."}
            </Typography>
        </ThemeProvider>
    );
}

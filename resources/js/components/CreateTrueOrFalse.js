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
    Paper,
    Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function CreateTrueOrFalse() {
    const navigate = useNavigate();
    const initialValue = () => {
        return [
            {
                type: 'paragraph',
                children: [{ text: '' }]
            }
        ];
    };
    const [questions, setQuestions] = useState([
        { title: initialValue(), right: false }
    ]);
    const handleQuestionTitleChange = (value, index) => {
        let q = [...questions];
        let question = questions[index];
        question.title = value;
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
            let title = '';
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
                title: title
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
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWFhYzRiNGYyMTBiMGM4MmMyNWUwYTNhNzU1NWQwNmJiYTdjOTJiZTNjODRlNDA5N2MwZGM5MjBkMzJiODAyOWRlMzE3MWVhOGM2ZThkNWIiLCJpYXQiOjE2NDE5MjU4ODMuNDQwNDMzLCJuYmYiOjE2NDE5MjU4ODMuNDQwNDM3LCJleHAiOjE2NzM0NjE4ODMuNDI5NDI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Z87TMAFbFhPXHftVULt0snAY0rbXgGs5I_DhMvlVhdC0HtcHqQxdAVSIOOoTt3rcx0rUOPxbPeLXlPlf0P5Y4vOAQukCFI2L2lbq12daRpYYg7ZQNBt-KYG974tcNbd6_YH7xViOISqPRreTEF6nSPun3rvjuKT65TwFR1fjzf0vXOQDxPlMES9aYRNRsjnrHcnDe-KO9j_040WJtI5ZI43tWFRWMq6Rb1U4e-l1hLopKHZpukNxqe3ZHIvwiZSBKb_wDRilxmuzP-UnVF2vCbvgJBkQGwlrKZusoLD6ixf-towFcKlrHZX5Wn71bevsIUW9S4jc5FMKf2zB41ii4Y_oglwlAg36l58vDDfncHEY8R_ppkR3jjWu1U3un4bLbaXS-yLn7VqkL-Fdyk94kKUCi5aBhWbc_VZGPSVSeiU-QujSlTwG_ghRuIASBH-mpmBq8WedADhMA6uGWRc52F3Tn31Ske0LQLDZPiw0NbZ56E5uXJOhFo10DXki7MVh-oPhNNGEndOHV5rNguB0Zf1fX15UTMFUKPbbw81whx_yM5_AlfDzPFOYLjSnwa2sPGlsMoYTUkw_LjuUlJsUnmeGwNdts08eGynIdx3F9SI4AIr2sY9FemkBS9_8kFWGqG9cK3jMwurFDXkG0wvO9jHsI5-u0zGfZosPyIApGoQ'
            }
        };
        axios.post('/api/quiz', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/quiz/${response.data.data.slug}`);
            }
        });
    };

    const [editors, setEditors] = useState([
        withCounter(createMaterialEditor())
    ]);
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
                            <IconButton>
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
                                                    <Grid
                                                        item
                                                        align="center"
                                                        xs={12}
                                                    >
                                                        <Typography variant="subtitle1">
                                                            False
                                                        </Typography>
                                                        <Switch color="success" />
                                                        <Typography variant="subtitle1">
                                                            True
                                                        </Typography>
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

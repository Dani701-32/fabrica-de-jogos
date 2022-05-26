import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import SuccessDialog from '../_layout/SuccessDialog';
import BackFAButton from '../_layout/BackFAButton';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import LayoutSelect from '../_layout/LayoutSelect';
import AddIcon from '@mui/icons-material/Add';
import { balloonOptions, gameState } from '../../types';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import { convertToRaw, EditorState } from 'draft-js';
import {
    useUpdateBalloonsMutation,
    useGetBalloonsBySlugQuery
} from '../../services/games';
import draftToText from '../../utils/draftToText';
import RichTextField from '../_layout/RichTextField';
import { useParams } from 'react-router-dom';
import textToDraft from '../../utils/textToDraft';
import { getError } from '../../utils/errors';

export default function EditBalloons({}) {
    const { slug } = useParams();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [layout, setLayout] = useState<number>(1);
    const [question, setQuestion] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [answers, setAnswers] = useState<string[][]>([['', '', '', '', '']]);
    const [updateBalloons, response] = useUpdateBalloonsMutation();
    const { data, error, isLoading } = useGetBalloonsBySlugQuery(
        slug as string
    );
    const handleAddPage = () => {
        if (answers.length >= 8) {
            setAlert('O número máximo de questões para esse jogo é 8!');
            return;
        }
        setAnswers([...answers, ['', '', '', '', '']]);
    };
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleRemovePage = (index: number) => {
        if (answers.length === 1) {
            return;
        }
        let q = [...answers];
        q.splice(index, 1);
        setAnswers(q);
    };
    const handleAnswerChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        i: number
    ) => {
        let a = [...answers];
        let answer = a[index];
        answer[i] = event.target.value;
        a.splice(index, 1, answer);
        setAnswers(a);
    };
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        let textJson = convertToRaw(question.getCurrentContent());
        let markup = draftToText(textJson);
        const questionsJSON: balloonOptions = {
            title: markup,
            answers: answers
        };
        let body: Partial<gameState<balloonOptions>> = {
            layout: layout,
            options: questionsJSON
        };
        updateBalloons({ slug, ...body });
    };

    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            let deep_copy = JSON.parse(JSON.stringify(data.options));
            setAnswers(deep_copy.answers);
            setQuestion(textToDraft(deep_copy.title as string));
            setLayout(data.layout);
        }
        error && setAlert(getError(error));
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && setOpen(true);
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        );

    return (
        <>
            <SuccessDialog open={open} handleClose={() => setOpen(false)} />
            <BackFAButton />
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
                    component="form"
                    justifyContent="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Estoura Balões</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <LayoutSelect
                            callback={handleLayout}
                            selectedLayout={layout}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="left" xs={3}>
                        <RichTextField
                            editorState={question}
                            onChange={(value: EditorState) =>
                                setQuestion(value)
                            }
                            label={'Enunciado'}
                            maxLength={160}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleAddPage}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Questão
                        </Button>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" lg={12}>
                        <Grid
                            container
                            alignItems="flex-start"
                            justifyContent="center"
                            spacing={3}
                        >
                            {alert && (
                                <Grid item xs={12}>
                                    <Alert
                                        severity="warning"
                                        onClick={() => {
                                            setAlert('');
                                        }}
                                    >
                                        {alert}
                                    </Alert>
                                </Grid>
                            )}
                            {answers.map((answers: string[], index: number) => {
                                return (
                                    <Page
                                        key={index}
                                        answers={answers}
                                        index={index}
                                        handleAnswerChange={handleAnswerChange}
                                        handleRemoveQuestion={handleRemovePage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        {response.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                                disabled={Boolean(data?.approved_at)}
                            >
                                Salvar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

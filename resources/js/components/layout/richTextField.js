import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import MUIRichTextEditor from 'mui-rte';

const theme = createTheme({
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

export default function (props) {
    const { editorState, handleTextChange, index, i, label, maxLength } = props;

    return (
        <Paper variant="outlined">
            <ThemeProvider theme={theme}>
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
                    editorState={editorState}
                    onChange={(editorState) => {
                        handleTextChange(editorState, index, i);
                    }}
                    label={label}
                    maxLength={maxLength}
                />
            </ThemeProvider>
        </Paper>
    );
}

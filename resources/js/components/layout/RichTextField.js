import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';

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

const richTextField = ({
    editorState,
    handleTextChange,
    index,
    i,
    label,
    maxLength
}) => {
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
                        'redo'
                    ]}
                    defaultValue={JSON.stringify(
                        convertToRaw(editorState.getCurrentContent())
                    )}
                    onChange={(editorState) => {
                        handleTextChange(editorState, index, i);
                    }}
                    label={label}
                    maxLength={maxLength}
                />
            </ThemeProvider>
        </Paper>
    );
};

export default React.memo(richTextField);

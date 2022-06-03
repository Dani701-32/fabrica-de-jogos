import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Card, Grid, IconButton, Paper } from '@mui/material';
import 'draft-js/dist/Draft.css';
import {
    FormatItalicOutlined,
    FormatBoldOutlined,
    FormatUnderlinedOutlined,
    FormatStrikethroughOutlined,
    UndoOutlined,
    RedoOutlined,
} from '@mui/icons-material';

type Props = {
    editorState: EditorState;
    onChange: Function;
    index?: number;
    i?: number;
    label: string;
    maxLength: number;
};

const RichTextField = ({ editorState, onChange, index, i, label, maxLength }: Props) => {
    const activeStyles = {
        BOLD: false,
        ITALIC: false,
        STRIKETHROUGH: false,
        UNDERLINE: false,
    };
    Object.keys(activeStyles).map((style: string) => {
        activeStyles[style as keyof typeof activeStyles] = editorState.getCurrentInlineStyle().contains(style);
    });

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const onUnderlineClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'), index, i);
    };
    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'), index, i);
    };
    const onItalicClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'), index, i);
    };
    const onStrikethroughClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'), index, i);
    };
    const handleUndo = (): void => {
        onChange(EditorState.undo(editorState), index, i);
    };
    const handleRedo = (): void => {
        onChange(EditorState.redo(editorState), index, i);
    };

    const getSelectedTextLength = (): number => {
        const currentSelection = editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();

        let length = 0;

        if (!isCollapsed) {
            const currentContent = editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const startBlock = currentContent.getBlockForKey(startKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);
            if (isStartAndEndBlockAreTheSame) {
                length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
            } else {
                let currentKey = startKey;

                while (currentKey && currentKey !== keyAfterEnd) {
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                        length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }

                    currentKey = currentContent.getKeyAfter(currentKey);
                }
            }
        }
        return length;
    };

    const handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength: number = currentContent.getPlainText('').length;
        const selectedTextLength: number = getSelectedTextLength();

        if (currentContentLength - selectedTextLength > maxLength - 1) {
            return 'handled';
        }
        return 'not-handled';
    };

    const handlePastedText = (pastedText: string) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = getSelectedTextLength();

        if (currentContentLength + pastedText.length - selectedTextLength > maxLength) {
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <>
            <Grid
                sx={{
                    marginBottom: 1,
                    marginTop: 1,
                }}
                container
                spacing={0}
                justifyContent="left"
            >
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={onUnderlineClick}>
                            <FormatUnderlinedOutlined fontSize="small" color={activeStyles.UNDERLINE ? 'primary' : 'inherit'} />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={onBoldClick}>
                            <FormatBoldOutlined fontSize="small" color={activeStyles.BOLD ? 'primary' : 'inherit'} />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={onItalicClick}>
                            <FormatItalicOutlined fontSize="small" color={activeStyles.ITALIC ? 'primary' : 'inherit'} />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={onStrikethroughClick}>
                            <FormatStrikethroughOutlined fontSize="small" color={activeStyles.STRIKETHROUGH ? 'primary' : 'inherit'} />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={handleUndo}>
                            <UndoOutlined fontSize="small" />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: 1.3 }}>
                    <Paper elevation={2} sx={{ minWidth: '30px', minHeight: '30px' }}>
                        <IconButton sx={{ minWidth: '30px', minHeight: '30px' }} size="small" onClick={handleRedo}>
                            <RedoOutlined fontSize="small" />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Card
                elevation={2}
                sx={{
                    padding: 1,
                }}
            >
                <Editor
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    handleBeforeInput={handleBeforeInput}
                    handlePastedText={handlePastedText}
                    onChange={(value) => {
                        onChange(value, index, i);
                    }}
                    placeholder={label}
                />
            </Card>
        </>
    );
};

export default React.memo(RichTextField);

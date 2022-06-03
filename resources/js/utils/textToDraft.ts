import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const textToDraft = (raw: string): EditorState => {
    let collection = {
        '\\[b\\]': '<strong>',
        '\\[/b\\]': '</strong>',
        '\\[i\\]': '<em>',
        '\\[/i\\]': '</em>',
        '\\[u\\]': '<ins>',
        '\\[/u\\]': '</ins>',
        '\\[s\\]': '<del>',
        '\\[/s\\]': '</del>',
    };
    for (const [key, value] of Object.entries(collection)) {
        const regex = new RegExp(key, 'g');
        raw = raw.replace(regex, value);
    }
    const { contentBlocks, entityMap } = htmlToDraft(raw);
    return EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
};

export default textToDraft;

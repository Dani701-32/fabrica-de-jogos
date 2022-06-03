import draftToHtml from 'draftjs-to-html';
import { RawDraftContentState } from 'draft-js';

export default function draftToText(textJson: RawDraftContentState): string {
    let collection = {
        '<p>': '',
        '</p>': '',
        '<strong>': '[b]',
        '</strong>': '[/b]',
        '<em>': '[i]',
        '</em>': '[/i]',
        '<ins>': '[u]',
        '</ins>': '[/u]',
        '<del>': '[s]',
        '</del>': '[/s]',
        '&nbsp': '',
    };
    let markup = draftToHtml(textJson);
    for (const [key, value] of Object.entries(collection)) {
        const regex = new RegExp(key, 'g');
        markup = markup.replace(regex, value);
    }
    return markup;
}

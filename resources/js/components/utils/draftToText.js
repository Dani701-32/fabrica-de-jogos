import draftToHtml from 'draftjs-to-html';

export default function draftToText(textJson) {
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
        '</del>': '[/s]'
    };
    let markup = draftToHtml(textJson);
    for (const [key, value] of Object.entries(collection)) {
        const regex = new RegExp(key, 'g');
        markup = markup.replace(regex, value);
    }
    return markup;
}

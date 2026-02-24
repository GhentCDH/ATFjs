import {createToken} from "chevrotain";

// ============================================================================
// NOTE LINE TOKENS (from ebl_atf_note_line.lark)
// ============================================================================

export const NoteMarker = createToken({
    name: 'NoteMarker',
    pattern: /#note:/,
});

export const MarkupLanguage = createToken({
    name: 'MarkupLanguage',
    pattern: /akk|sux|es/,
});

export const MarkupToken = createToken({
    name: 'MarkupToken',
    pattern: /i|sup|sub|b/,
});

export const UrlMarker = createToken({
    name: 'UrlMarker',
    pattern: /@url/,
});

export const BibMarker = createToken({
    name: 'BibMarker',
    pattern: /@bib/,
});
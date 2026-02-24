import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Note line rules
 * Mirrors: ebl_atf_note_line.lark
 */
export class NoteLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    noteLine = this.RULE('noteLine', () => {
        this.CONSUME(Tokens.Hash);
        this.CONSUME(Tokens.AnyText);
        this.CONSUME(Tokens.Colon);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.markup);
    });

    markup = this.RULE('markup', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.markupTokenPart) },
                { ALT: () => this.SUBRULE(this.languagePart) },
                { ALT: () => this.SUBRULE(this.bibliographyPart) },
                { ALT: () => this.SUBRULE(this.stringPart) },
                { ALT: () => this.SUBRULE(this.urlPart) },
            ]);
        });
    });

    languagePart = this.RULE('languagePart', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.AnyText);
        this.CONSUME(Tokens.OpenCurly);
        this.SUBRULE(this.text);
        this.CONSUME(Tokens.CloseCurly);
    });

    markupTokenPart = this.RULE('markupTokenPart', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.AnyText);
        this.CONSUME(Tokens.OpenCurly);
        this.SUBRULE(this.noteText);
        this.CONSUME(Tokens.CloseCurly);
    });

    bibliographyPart = this.RULE('bibliographyPart', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.AnyText);
        this.CONSUME(Tokens.OpenCurly);
        this.SUBRULE(this.escapedText);
        this.OPTION(() => {
            this.CONSUME(Tokens.At);
            this.SUBRULE2(this.escapedText);
        });
        this.CONSUME(Tokens.CloseCurly);
    });

    escapedText = this.RULE('escapedText', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.CONSUME(Tokens.AnyText) },
                { ALT: () => this.CONSUME(Tokens.Backslash) },
            ]);
        });
    });

    stringPart = this.RULE('stringPart', () => {
        this.SUBRULE(this.noteText);
    });

    urlPart = this.RULE('urlPart', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.AnyText);
        this.CONSUME(Tokens.OpenCurly);
        this.SUBRULE(this.url);
        this.CONSUME(Tokens.CloseCurly);
        this.OPTION(() => {
            this.CONSUME(Tokens.OpenCurly);
            this.SUBRULE(this.noteText);
            this.CONSUME(Tokens.CloseCurly);
        });
    });

    url = this.RULE('url', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    noteText = this.RULE('noteText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    text = this.RULE('text', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


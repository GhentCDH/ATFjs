import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Translation line rules
 * Mirrors: ebl_atf_translation_line.lark
 */
export class TranslationLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    translationLine = this.RULE('translationLine', () => {
        this.CONSUME(Tokens.TranslationMarker);
        this.OPTION1(() => {
            this.CONSUME(Tokens.Dot);
            this.CONSUME(Tokens.TranslationLanguage);
        });
        this.OPTION2(() => {
            this.CONSUME(Tokens.Dot);
            this.CONSUME(Tokens.OpenParen);
            this.SUBRULE(this.translationExtent);
            this.CONSUME(Tokens.CloseParen);
        });
        this.CONSUME(Tokens.Colon);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.markup);
    });

    translationExtent = this.RULE('translationExtent', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.labels);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.lineNumber);
    });

    labels = this.RULE('labels', () => {
        this.SUBRULE(this.freeText);
    });

    lineNumber = this.RULE('lineNumber', () => {
        this.SUBRULE(this.freeText);
    });

    legacyTranslationLine = this.RULE('legacyTranslationLine', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.legacyTranslationBlockAtLine) },
            { ALT: () => this.SUBRULE(this.legacyTranslationBlockLabelLine) },
            { ALT: () => this.SUBRULE(this.legacyTranslationBlockLine) },
            { ALT: () => this.SUBRULE(this.legacyTranslationBlockLabelTextLine) },
        ]);
    });

    legacyTranslationBlockAtLine = this.RULE('legacyTranslationBlockAtLine', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.TranslationMarker);
        this.CONSUME(Tokens.WordSeparator);
        this.CONSUME(Tokens.TranslationLanguage);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
    });

    legacyTranslationBlockLabelTextLine = this.RULE('legacyTranslationBlockLabelTextLine', () => {
        this.SUBRULE(this.legacyTranslationBlockLabelLine);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.legacyTranslationBlockLine);
    });

    legacyTranslationBlockLabelLine = this.RULE('legacyTranslationBlockLabelLine', () => {
        this.CONSUME(Tokens.At);
        this.SUBRULE(this.labelsStart);
    });

    legacyTranslationBlockLine = this.RULE('legacyTranslationBlockLine', () => {
        this.SUBRULE(this.freeText);
    });

    labelsStart = this.RULE('labelsStart', () => {
        this.SUBRULE(this.labelsAndLineNumber);
    });

    labelsExtent = this.RULE('labelsExtent', () => {
        this.SUBRULE(this.labelsAndLineNumber);
    });

    labelsAndLineNumber = this.RULE('labelsAndLineNumber', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.labels);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.lineNumber);
    });

    markup = this.RULE('markup', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.markupToken) },
                { ALT: () => this.CONSUME(Tokens.AnyText) },
            ]);
        });
    });

    markupToken = this.RULE('markupToken', () => {
        this.CONSUME(Tokens.At);
        this.CONSUME(Tokens.AnyText);
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


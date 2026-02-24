import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Manuscript line rules
 * Mirrors: ebl_atf_manuscript_line.lark
 */
export class ManuscriptLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    manuscriptLine = this.RULE('manuscriptLine', () => {
        this.OPTION1(() => this.CONSUME(Tokens.WhiteSpace));
        this.SUBRULE(this.siglum);
        this.OPTION2(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.labels);
        });
        this.SUBRULE(this.manuscriptText);
        this.MANY(() => {
            this.CONSUME(Tokens.Newline);
            this.OPTION3(() => this.CONSUME(Tokens.WhiteSpace));
            this.SUBRULE(this.paratext);
        });
    });

    siglum = this.RULE('siglum', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.detailedSiglum) },
            { ALT: () => this.SUBRULE(this.standardTextSiglum) },
        ]);
    });

    detailedSiglum = this.RULE('detailedSiglum', () => {
        this.SUBRULE(this.freeText);
    });

    standardTextSiglum = this.RULE('standardTextSiglum', () => {
        this.CONSUME(Tokens.Std);
        this.OPTION(() => {
            this.SUBRULE(this.disambiguator);
        });
    });

    disambiguator = this.RULE('disambiguator', () => {
        this.CONSUME(Tokens.AnyText);
    });

    manuscriptText = this.RULE('manuscriptText', () => {
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(Tokens.WordSeparator);
                    this.SUBRULE(this.textLine);
                },
            },
            { ALT: () => this.SUBRULE(this.emptyLine) },
        ]);
    });

    paratext = this.RULE('paratext', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.noteLine) },
            { ALT: () => this.SUBRULE(this.dollarLine) },
        ]);
    });

    labels = this.RULE('labels', () => {
        this.SUBRULE(this.freeText);
    });

    textLine = this.RULE('textLine', () => {
        this.SUBRULE(this.freeText);
    });

    noteLine = this.RULE('noteLine', () => {
        this.SUBRULE(this.freeText);
    });

    dollarLine = this.RULE('dollarLine', () => {
        this.SUBRULE(this.freeText);
    });

    emptyLine = this.RULE('emptyLine', () => {
        this.MANY(() => this.CONSUME(Tokens.WhiteSpace));
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


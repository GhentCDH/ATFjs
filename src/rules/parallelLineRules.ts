import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Parallel line rules
 * Mirrors: ebl_atf_parallel_line.lark
 */
export class ParallelLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    parallelLine = this.RULE('parallelLine', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.parallelFragment) },
            { ALT: () => this.SUBRULE(this.parallelText) },
            { ALT: () => this.SUBRULE(this.parallelComposition) },
        ]);
    });

    parallelFragment = this.RULE('parallelFragment', () => {
        this.CONSUME(Tokens.ParallelLineMarker);
        this.OPTION1(() => this.CONSUME(Tokens.CfMarker));
        this.CONSUME(Tokens.AnyText); // 'F'
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.museumNumber);
        this.OPTION2(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.CONSUME(Tokens.Duplicates);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.OPTION3(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.objectLabel);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.OPTION4(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.surfaceLabel);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.OPTION5(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.columnLabel);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.lineNumber);
    });

    museumNumber = this.RULE('museumNumber', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    parallelText = this.RULE('parallelText', () => {
        this.CONSUME(Tokens.ParallelLineMarker);
        this.OPTION1(() => this.CONSUME(Tokens.CfMarker));
        this.SUBRULE(this.textId);
        this.CONSUME(Tokens.WordSeparator);
        this.OPTION2(() => {
            this.SUBRULE(this.chapterName);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.lineNumber);
    });

    textId = this.RULE('textId', () => {
        this.SUBRULE(this.genre);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.category);
        this.CONSUME(Tokens.Dot);
        this.CONSUME(Tokens.Int);
    });

    genre = this.RULE('genre', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Lex) },
            { ALT: () => this.CONSUME(Tokens.Med) },
            { ALT: () => this.CONSUME(Tokens.L) },
            { ALT: () => this.CONSUME(Tokens.D) },
            { ALT: () => this.CONSUME(Tokens.Mag) },
            { ALT: () => this.CONSUME(Tokens.Sui) },
        ]);
    });

    category = this.RULE('category', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Digit) },
            { ALT: () => this.SUBRULE(this.capitalRomanNumeral) },
        ]);
    });

    capitalRomanNumeral = this.RULE('capitalRomanNumeral', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.CONSUME(Tokens.Letter) },
            ]);
        });
    });

    chapterName = this.RULE('chapterName', () => {
        this.SUBRULE(this.stage);
        this.OPTION1(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.quotedString);
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.quotedString);
    });

    stage = this.RULE('stage', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.CONSUME(Tokens.Letter) },
                { ALT: () => this.CONSUME(Tokens.Digit) },
            ]);
        });
    });

    quotedString = this.RULE('quotedString', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    parallelComposition = this.RULE('parallelComposition', () => {
        this.CONSUME(Tokens.ParallelLineMarker);
        this.OPTION1(() => this.CONSUME(Tokens.CfMarker));
        this.CONSUME(Tokens.OpenParen);
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.lineNumber);
        this.CONSUME(Tokens.CloseParen);
    });

    objectLabel = this.RULE('objectLabel', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    surfaceLabel = this.RULE('surfaceLabel', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    columnLabel = this.RULE('columnLabel', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    lineNumber = this.RULE('lineNumber', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


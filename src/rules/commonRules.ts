import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens/commonTokens';

/**
 * Common rules used across multiple line types
 * Mirrors: ebl_atf_common.lark
 */
export class CommonRules extends CstParser {
    // constructor() {
    //     super([
    //         // ... token list will be added by the main parser ...
    //     ]);
    //     this.performSelfAnalysis();
    // }

    // // object rule
    // object = this.RULE('object', () => {
    //     this.OR([
    //         { ALT: () => this.CONSUME(Tokens.Tablet) },
    //         { ALT: () => this.CONSUME(Tokens.Envelope) },
    //         { ALT: () => this.CONSUME(Tokens.Prism) },
    //         { ALT: () => this.CONSUME(Tokens.Bulla) },
    //         { ALT: () => this.SUBRULE(this.fragment) },
    //         { ALT: () => this.SUBRULE(this.genericObject) },
    //     ]);
    // });
    //
    // // fragment rule
    // fragment = this.RULE('fragment', () => {
    //     this.CONSUME(Tokens.Fragment);
    //     this.SUBRULE(this.freeText);
    // });
    //
    // // genericObject rule
    // genericObject = this.RULE('genericObject', () => {
    //     this.CONSUME(Tokens.Object);
    //     this.SUBRULE(this.freeText);
    // });
    //
    // // surface rule
    // surface = this.RULE('surface', () => {
    //     this.OR([
    //         { ALT: () => this.CONSUME(Tokens.Obverse) },
    //         { ALT: () => this.CONSUME(Tokens.Reverse) },
    //         { ALT: () => this.CONSUME(Tokens.Left) },
    //         { ALT: () => this.CONSUME(Tokens.Right) },
    //         { ALT: () => this.CONSUME(Tokens.Top) },
    //         { ALT: () => this.CONSUME(Tokens.Bottom) },
    //         { ALT: () => this.SUBRULE(this.face) },
    //         { ALT: () => this.SUBRULE(this.edge) },
    //         { ALT: () => this.SUBRULE(this.genericSurface) },
    //     ]);
    // });
    //
    // // face rule
    // face = this.RULE('face', () => {
    //     this.CONSUME(Tokens.Face);
    //     this.CONSUME(Tokens.LcaseLetter);
    // });
    //
    // // edge rule
    // edge = this.RULE('edge', () => {
    //     this.CONSUME(Tokens.Edge);
    //     this.OPTION(() => {
    //         this.CONSUME(Tokens.LcaseLetter);
    //     });
    // });
    //
    // // genericSurface rule
    // genericSurface = this.RULE('genericSurface', () => {
    //     this.CONSUME(Tokens.Surface);
    //     this.SUBRULE(this.freeText);
    // });
    //
    // // seal rule
    // seal = this.RULE('seal', () => {
    //     this.CONSUME(Tokens.Seal);
    //     this.CONSUME(Tokens.Int);
    // });
    //
    // // freeText rule - matches any sequence of characters
    // freeText = this.RULE('freeText', () => {
    //     this.AT_LEAST_ONE(() => {
    //         this.CONSUME(Tokens.AnyText);
    //     });
    // });

    // lineNumber rule
    lineNumber = this.RULE('lineNumber', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.lineNumberRange) },  // Most specific: includes Dash
            { ALT: () => this.SUBRULE(this.singleLineNumber) },  // Standard format: optional Letter/Plus + Int + optional Prime + optional Letter
            // { ALT: () => this.SUBRULE(this.legacySingleLineNumber) }, // Legacy format: optional Letter + Int + optional Multiprimes + optional Letter
        ]);
    });

    // lineNumberRange rule
    lineNumberRange = this.RULE('lineNumberRange', () => {
        this.SUBRULE(this.singleLineNumber);
        this.CONSUME(Tokens.Minus);
        this.SUBRULE2(this.singleLineNumber);
    });

    // singleLineNumber rule
    singleLineNumber = this.RULE('singleLineNumber', () => {
        this.OPTION1(() => {
            this.OR1([
                { ALT: () => this.SUBRULE(this.letter) },
                { ALT: () => this.CONSUME(Tokens.Plus) },
            ]);
        });
        this.CONSUME(Tokens.Int);
        this.OPTION2(() => {
            this.OR2([
                { ALT: () => this.CONSUME(Tokens.SingleQuote, { LABEL: 'Prime' }) },
                { ALT: () => this.CONSUME(Tokens.LegacyPrime) },
            ]);
        });
        this.OPTION3(() => {
            //this.CONSUME(Tokens.Letter);
            this.SUBRULE2(this.letter);
        });
    });

    // legacySingleLineNumber rule
    legacySingleLineNumber = this.RULE('legacySingleLineNumber', () => {
        this.OPTION1(() => {
            //this.CONSUME(Tokens.Letter);
            this.SUBRULE(this.letter);
        });
        this.CONSUME(Tokens.Int);
        this.OPTION2(() => {
            this.SUBRULE(this.legacyMultiprimes);
        });
        this.OPTION3(() => {
            //this.CONSUME(Tokens.Letter);
            this.SUBRULE2(this.letter);
        });
    });

    // legacyMultiprimes rule
    legacyMultiprimes = this.RULE('legacyMultiprimes', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                { ALT: () => this.CONSUME(Tokens.SingleQuote) },
                { ALT: () => this.CONSUME(Tokens.LegacyPrime) },
            ]);
        });
    });

    letter = this.RULE('letter', () => {
        this.CONSUME(Tokens.Letter);
    });
}


import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Dollar line rules
 * Mirrors: ebl_atf_dollar_line.lark
 */
export class DollarLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    dollarLine = this.RULE('dollarLine', () => {
        this.CONSUME(Tokens.DollarSign);
        this.MANY(() => this.CONSUME(Tokens.WordSeparator));
        this.SUBRULE(this.dollarValue);
    });

    dollarValue = this.RULE('dollarValue', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.strict) },
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => this.CONSUME(Tokens.OpenParen));
                    this.MANY(() => this.CONSUME(Tokens.WordSeparator));
                    this.SUBRULE2(this.strict);
                    this.MANY2(() => this.CONSUME(Tokens.WordSeparator));
                    this.AT_LEAST_ONE2(() => this.CONSUME(Tokens.CloseParen));
                },
            },
            { ALT: () => this.SUBRULE(this.loose) },
        ]);
    });

    strict = this.RULE('strict', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.state) },
            { ALT: () => this.SUBRULE(this.ruling) },
            { ALT: () => this.SUBRULE(this.image) },
            { ALT: () => this.SUBRULE(this.seal) },
        ]);
    });

    loose = this.RULE('loose', () => {
        this.CONSUME(Tokens.OpenParen);
        this.SUBRULE(this.freeText);
        this.CONSUME(Tokens.CloseParen);
    });

    state = this.RULE('state', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.qualification);
                    this.OPTION1(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE(this.extent);
                    });
                    this.OPTION2(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE(this.scope);
                    });
                    this.OPTION3(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE(this.stateKeyword);
                    });
                    this.OPTION4(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE(this.dollarStatus);
                    });
                },
            },
            {
                ALT: () => {
                    this.SUBRULE(this.extent);
                    this.OPTION5(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE2(this.scope);
                    });
                    this.OPTION6(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE2(this.stateKeyword);
                    });
                    this.OPTION7(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE2(this.dollarStatus);
                    });
                },
            },
            {
                ALT: () => {
                    this.SUBRULE2(this.scope);
                    this.OPTION8(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE3(this.stateKeyword);
                    });
                    this.OPTION9(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE3(this.dollarStatus);
                    });
                },
            },
            {
                ALT: () => {
                    this.SUBRULE3(this.stateKeyword);
                    this.MANY(() => {
                        this.CONSUME(Tokens.WordSeparator);
                        this.SUBRULE4(this.dollarStatus);
                    });
                },
            },
            { ALT: () => this.SUBRULE4(this.dollarStatus) },
        ]);
    });


    // state = this.RULE('state', () => {
    //     this.OR([
    //         {
    //             ALT: () => {
    //                 this.SUBRULE(this.qualification);
    //                 this.OPTION1(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE(this.extent);
    //                 });
    //                 this.OPTION2(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE(this.scope);
    //                 });
    //                 this.OPTION3(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE(this.stateKeyword);
    //                 });
    //                 this.OPTION4(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE(this.dollarStatus);
    //                 });
    //             },
    //         },
    //         {
    //             ALT: () => {
    //                 this.SUBRULE(this.extent);
    //                 this.OPTION5(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE2(this.scope);
    //                 });
    //                 this.OPTION6(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE2(this.stateKeyword);
    //                 });
    //                 this.OPTION7(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE2(this.dollarStatus);
    //                 });
    //             },
    //         },
    //         {
    //             ALT: () => {
    //                 this.SUBRULE2(this.scope);
    //                 this.OPTION8(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE3(this.stateKeyword);
    //                 });
    //                 this.OPTION9(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE3(this.dollarStatus);
    //                 });
    //             },
    //         },
    //         {
    //             ALT: () => {
    //                 this.SUBRULE3(this.stateKeyword);
    //                 this.OPTION10(() => {
    //                     this.CONSUME(Tokens.WordSeparator);
    //                     this.SUBRULE4(this.dollarStatus);
    //                 });
    //             },
    //         },
    //         { ALT: () => this.SUBRULE4(this.dollarStatus) },
    //     ]);
    // });

    qualification = this.RULE('qualification', () => {
        this.CONSUME(Tokens.Qualification);
    });

    extent = this.RULE('extent', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Int) },
            { ALT: () => this.SUBRULE(this.range) },
            { ALT: () => this.CONSUME(Tokens.Extent) },
        ]);
    });

    range = this.RULE('range', () => {
        this.CONSUME(Tokens.Int);
        this.OPTION(() => this.CONSUME(Tokens.WordSeparator));
        this.CONSUME(Tokens.Dash);
        this.OPTION2(() => this.CONSUME(Tokens.WordSeparator));
        this.CONSUME(Tokens.Int);
    });

    scope = this.RULE('scope', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Scope) },
            { ALT: () => this.CONSUME(Tokens.Column) }, // added because column was removed from Tokens.Scope
            { ALT: () => this.CONSUME(Tokens.Surface) }, // added because surface was removed from Tokens.Scope
            { ALT: () => this.SUBRULE(this.object) },
            { ALT: () => this.SUBRULE(this.surface) },
        ]);
    });

    stateKeyword = this.RULE('stateKeyword', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Blank) },
            { ALT: () => this.CONSUME(Tokens.Broken) },
            { ALT: () => this.CONSUME(Tokens.Effaced) },
            { ALT: () => this.CONSUME(Tokens.Illegible) },
            { ALT: () => this.CONSUME(Tokens.Missing) },
            { ALT: () => this.CONSUME(Tokens.Traces) },
            { ALT: () => this.CONSUME(Tokens.Omitted) },
            { ALT: () => this.CONSUME(Tokens.Continues) },
        ]);
    });

    dollarStatus = this.RULE('dollarStatus', () => {
        this.OR([
            { ALT: () => { this.CONSUME(Tokens.Uncertain); this.CONSUME(Tokens.Correction) } },
            { ALT: () => this.CONSUME(Tokens.Collation) },
            { ALT: () => this.CONSUME(Tokens.Uncertain) },
            { ALT: () => this.CONSUME(Tokens.Correction) },
            { ALT: () => this.CONSUME(Tokens.Degree) }, // NoLongerVisible
        ]);
    });

    ruling = this.RULE('ruling', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.rulingNumber);
                    this.CONSUME(Tokens.RulingKeyword);
                    this.OPTION(() => {
                        this.OPTION2(() => this.CONSUME(Tokens.WordSeparator));
                        this.SUBRULE(this.dollarStatus);
                    });
                },
            },
            { ALT: () => this.SUBRULE(this.legacySingleRuling) },
        ]);
    });

    rulingNumber = this.RULE('rulingNumber', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.SingleRuling) },
            { ALT: () => this.CONSUME(Tokens.DoubleRuling) },
            { ALT: () => this.CONSUME(Tokens.TripleRuling) },
        ]);
    });

    image = this.RULE('image', () => {
        this.CONSUME(Tokens.OpenParen);
        this.OPTION1(() => this.CONSUME(Tokens.WordSeparator));
        this.CONSUME(Tokens.ImageKeyword);
        this.CONSUME(Tokens.WordSeparator);
        this.CONSUME(Tokens.Int);
        this.OPTION2(() => this.CONSUME(Tokens.LcaseLetter));
        this.CONSUME(Tokens.WordSeparator);
        this.CONSUME(Tokens.EqualsSign);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
        this.CONSUME(Tokens.CloseParen);
    });

    seal = this.RULE('seal', () => {
        this.CONSUME(Tokens.Seal);
        this.CONSUME(Tokens.Int);
    });

    object = this.RULE('object', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Tablet) },
            { ALT: () => this.CONSUME(Tokens.Envelope) },
            { ALT: () => this.CONSUME(Tokens.Prism) },
            { ALT: () => this.CONSUME(Tokens.Bulla) },
        ]);
    });

    surface = this.RULE('surface', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Obverse) },
            { ALT: () => this.CONSUME(Tokens.Reverse) },
            { ALT: () => this.CONSUME(Tokens.Left) },
            { ALT: () => this.CONSUME(Tokens.Right) },
            { ALT: () => this.CONSUME(Tokens.Top) },
            { ALT: () => this.CONSUME(Tokens.Bottom) },
        ]);
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });

    legacySingleRuling = this.RULE('legacySingleRuling', () => {
        this.MANY(() => this.CONSUME(Tokens.WordSeparator));
        this.CONSUME(Tokens.RulingKeyword);
        this.MANY2(() => this.CONSUME(Tokens.WordSeparator));
        this.OPTION(() => this.SUBRULE(this.dollarStatus));
    });
}


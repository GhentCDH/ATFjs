import * as Tokens from '../tokens/textLineTokens';

import {CommonRules} from './commonRules';

export const textLineLexerTokens = [
    // Multi-character patterns (most specific)
    Tokens.EllipsisDots,
    Tokens.EllipsisUnicode,
    Tokens.NormalizedAkkadianShift,
    Tokens.GreekShift,
    Tokens.LanguageShift,
    Tokens.DividerSymbol,
    Tokens.CommentaryProtocol,

    // Character sets and ranges (specific patterns)
    Tokens.GreekUTF8,
    Tokens.UAkkadianUTF8,
    Tokens.LAkkadianUTF8,
    Tokens.Fraction,
    Tokens.SubscriptInt,

    // Extended character ranges
    Tokens.UCaseAtoZwithoutX,
    Tokens.LCaseAtoZwithoutX,

    // Brackets and grouping
    Tokens.OpenCurly,
    Tokens.CloseCurly,
    Tokens.OpenBracket,
    Tokens.CloseBracket,
    Tokens.OpenParen,
    Tokens.CloseParen,
    Tokens.OpenAngle,
    Tokens.CloseAngle,

    // Status and damage markers
    Tokens.Damage,
    Tokens.Degree,
    // Tokens.NoLongerVisible,

    // Modifiers and flags
    Tokens.Uncertain,
    Tokens.Correction,
    // Tokens.Collation,

    // Operators (frequent tokens)
    Tokens.Plus,
    Tokens.Minus,
    Tokens.Dot,
    Tokens.Colon,
    Tokens.Semicolon,
    Tokens.Comma,
    Tokens.Slash,
    Tokens.Pipe,
    Tokens.EnDash,
    Tokens.Multiplication,

    // Special characters
    Tokens.Tilde,
    Tokens.DollarSign,
    Tokens.Backslash,
    Tokens.Tabulation,
    Tokens.WordOmitted,
    Tokens.At,
    Tokens.Ampersand,
    Tokens.Bullet,
    Tokens.Asterisk,

    // Whitespace
    Tokens.WordSeparator,

    // Numbers and letters (generic)
    Tokens.SingleQuote,
    Tokens.Int,

    // Legacy patterns
    Tokens.LegacyOpenHalfBracket,
    Tokens.LegacyCloseHalfBracket,
    Tokens.LegacyPrime,

    // Catch-all for single characters (least specific)
    Tokens.X,
    Tokens.x,

    // Newline
    Tokens.Newline,
];


/**
 * Text line rules
 * Mirrors: ebl_atf_text_line.lark
 */
export class TextLineRules extends CommonRules {
    // constructor() {
    //     super();
    // }


    // textLine rule
    textLine = this.RULE('textLine', () => {
        this.SUBRULE(this.lineNumber);
        this.CONSUME(Tokens.Dot);
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.WordSeparator);
        });
        this.SUBRULE(this.text);
        this.MANY(() => {
            this.CONSUME2(Tokens.WordSeparator);
        });
    });

    // text rule
    text = this.RULE('text', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.shiftedText)},
            {ALT: () => this.SUBRULE(this.nonNormalizedText)},
        ]);
        this.MANY(() => {
            this.AT_LEAST_ONE(() => {
                this.CONSUME(Tokens.WordSeparator);
            });
            this.SUBRULE2(this.shiftedText);
        });
    });

    // shiftedText rule
    shiftedText = this.RULE('shiftedText', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.normalizedAkkadianShift);
                    this.AT_LEAST_ONE(() => {
                        this.CONSUME(Tokens.WordSeparator);
                    });
                    this.SUBRULE(this.normalizedAkkadian);
                },
            },
            {
                ALT: () => {
                    this.SUBRULE(this.greekShift);
                    this.AT_LEAST_ONE2(() => {
                        this.CONSUME2(Tokens.WordSeparator);
                    });
                    this.SUBRULE(this.greek);
                },
            },
            {
                ALT: () => {
                    this.SUBRULE(this.languageShift);
                    this.AT_LEAST_ONE3(() => {
                        this.CONSUME3(Tokens.WordSeparator);
                    });
                    this.SUBRULE(this.nonNormalizedText);
                },
            },
        ]);
    });

    // nonNormalizedText rule
    nonNormalizedText = this.RULE('nonNormalizedText', () => {
        this.SUBRULE(this.head);
        this.MANY(() => {
            this.SUBRULE(this.tail);
        });
    });

    // head rule
    head = this.RULE('head', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.haveBoth)},
            {ALT: () => this.SUBRULE(this.requireBoth)},
            {ALT: () => this.SUBRULE(this.omitLeft)},
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.omitRight);
                    });
                    this.OPTION(() => {
                        this.SUBRULE2(this.haveBoth);
                    });
                },
            },
        ]);
    });

    // tail rule
    tail = this.RULE('tail', () => {
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(Tokens.WordSeparator);
                    this.MANY(() => {
                        this.SUBRULE(this.omitRight);
                    });
                    this.OPTION(() => {
                        this.SUBRULE(this.haveBoth);
                    });
                },
            },
            {
                ALT: () => {
                    this.OPTION2(() => {
                        this.CONSUME2(Tokens.WordSeparator);
                    });
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.omitLeft);
                    });
                },
            },
            {
                ALT: () => {
                    this.CONSUME3(Tokens.WordSeparator);
                    this.SUBRULE(this.requireBoth);
                },
            },
            {
                ALT: () => {
                    this.SUBRULE(this.requireBothOptionalWs);
                },
            },
        ]);
    });

    // requireBoth rule
    requireBoth = this.RULE('requireBoth', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.commentaryProtocol)},
            {ALT: () => this.SUBRULE(this.dividerVariant)},
            {ALT: () => this.SUBRULE(this.divider)},
            {ALT: () => this.SUBRULE(this.lineBreak)},
        ]);
    });

    // requireBothOptionalWs rule
    requireBothOptionalWs = this.RULE('requireBothOptionalWs', () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.WordSeparator);
        });
        this.OR([
            {ALT: () => this.SUBRULE(this.dividerVariant)},
            {ALT: () => this.SUBRULE(this.divider)},
        ]);
    });

    // haveBoth rule
    haveBoth = this.RULE('haveBoth', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.wordOmitted)},        // Most specific: single token
            {ALT: () => this.SUBRULE(this.tabulation)},         // Single token
            {ALT: () => this.SUBRULE(this.columnToken)},        // Single token
            {ALT: () => this.SUBRULE(this.erasure)},            // Starts with Degree token
            {ALT: () => this.SUBRULE(this.loneDeterminative)},  // Determinative only (must come before word)
            {ALT: () => this.SUBRULE(this.word)},               // Generic word (can include determinative)
        ]);
    });

    // omitLeft rule
    omitLeft = this.RULE('omitLeft', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.closeBrokenAway)},
            {ALT: () => this.SUBRULE(this.closePerhapsBrokenAway)},
            {ALT: () => this.SUBRULE(this.closeAccidentalOmission)},
            {ALT: () => this.SUBRULE(this.closeIntentionalOmission)},
            {ALT: () => this.SUBRULE(this.closeRemoval)},
            {ALT: () => this.SUBRULE(this.closeDocumentOrientedGloss)},
        ]);
    });

    // omitRight rule
    omitRight = this.RULE('omitRight', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.openBrokenAway)},
            {ALT: () => this.SUBRULE(this.openPerhapsBrokenAway)},
            {ALT: () => this.SUBRULE(this.openAccidentalOmission)},
            {ALT: () => this.SUBRULE(this.openIntentionalOmission)},
            {ALT: () => this.SUBRULE(this.openRemoval)},
            {ALT: () => this.SUBRULE(this.openDocumentOrientedGloss)},
        ]);
    });

    // divider rule
    divider = this.RULE('divider', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.DividerSymbol)},
            {ALT: () => this.CONSUME(Tokens.Colon)},
            {ALT: () => this.CONSUME(Tokens.Semicolon)},
            {ALT: () => this.CONSUME(Tokens.Slash)},
        ]);
        // this.CONSUME(Tokens.DividerSymbol);
        this.SUBRULE(this.modifiers);
        this.SUBRULE(this.flags);
    });

    // dividerVariant rule
    dividerVariant = this.RULE('dividerVariant', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.divider);
                    this.CONSUME(Tokens.Pipe);
                    this.SUBRULE2(this.divider);
                },
            },
            {
                ALT: () => {
                    this.SUBRULE3(this.divider);
                    this.CONSUME3(Tokens.Pipe);
                    this.SUBRULE(this.variantPart);
                },
            },
            {
                ALT: () => {
                    this.SUBRULE2(this.variantPart);
                    this.CONSUME4(Tokens.Pipe);
                    this.SUBRULE4(this.divider);
                },
            },
        ]);
    });

    // lineBreak rule
    lineBreak = this.RULE('lineBreak', () => {
        this.CONSUME(Tokens.Pipe);
    });

    // word rule
    word = this.RULE('word', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.anyOpen);
        });
        this.SUBRULE(this.wordBody);
        this.OPTION2(() => {
            this.SUBRULE(this.anyClose);
        });
    });

    // wordBody rule
    wordBody = this.RULE('wordBody', () => {
        this.MANY1(() => {
            this.SUBRULE(this.inlineErasure);
            this.OPTION1(() => {
                this.SUBRULE(this.looseJoiner);
            });
        });
        this.SUBRULE(this.parts);
        this.MANY2(() => {
            this.SUBRULE2(this.looseJoiner);
            this.SUBRULE2(this.inlineErasure);
            this.OPTION2(() => {
                this.SUBRULE3(this.looseJoiner);
                this.SUBRULE2(this.parts);
            });
        });
    });

    // inlineErasure rule
    inlineErasure = this.RULE('inlineErasure', () => {
        this.CONSUME(Tokens.Degree);
        this.SUBRULE(this.inlineErasurePart);
        this.CONSUME(Tokens.Backslash);
        this.SUBRULE2(this.inlineErasurePart);
        this.CONSUME2(Tokens.Degree);
    });

    // inlineErasurePart rule
    inlineErasurePart = this.RULE('inlineErasurePart', () => {
        this.OPTION(() => {
            this.SUBRULE(this.parts);
        });
    });

    // parts rule
    parts = this.RULE('parts', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.partsPattern)},
            {ALT: () => this.SUBRULE(this.partsPatternGloss)},
        ]);
    });

    // partsPatternGloss rule
    partsPatternGloss = this.RULE('partsPatternGloss', () => {
        this.SUBRULE(this.gloss);
        this.OPTION(() => {
            this.OPTION2(() => {
                this.SUBRULE(this.looseJoiner);
            });
            this.SUBRULE(this.value);
        });
        this.MANY(() => {
            this.SUBRULE(this.partsTail);
        });
    });

    // partsPattern rule
    partsPattern = this.RULE('partsPattern', () => {
        this.SUBRULE(this.value);
        this.MANY(() => {
            this.SUBRULE(this.partsTail);
        });
    });

    // partsTail rule
    // todo: check again, made some changes!
    partsTail = this.RULE('partsTail', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.strictJoiner);
                    this.SUBRULE(this.value);
                },
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.SUBRULE(this.looseJoiner);
                    });
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.gloss);
                        this.OPTION2(() => {
                            this.SUBRULE2(this.looseJoiner);
                        });
                    });
                    this.OPTION3(() => {
                        this.SUBRULE2(this.value);
                    });
                },
            },
        ]);
    });

    // gloss rule
    gloss = this.RULE('gloss', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.linguisticGloss)},
            {ALT: () => this.SUBRULE(this.phoneticGloss)},
            {ALT: () => this.SUBRULE(this.determinative)},
        ]);
    });

    // linguisticGloss rule
    linguisticGloss = this.RULE('linguisticGloss', () => {
        // this.CONSUME(Tokens.LinguisticGlossOpen);
        this.CONSUME(Tokens.OpenCurly);
        this.CONSUME2(Tokens.OpenCurly);
        this.SUBRULE(this.glossBody);
        this.CONSUME3(Tokens.CloseCurly);
        this.CONSUME4(Tokens.CloseCurly);
        // this.CONSUME(Tokens.LinguisticGlossClose);
    });

    // phoneticGloss rule
    phoneticGloss = this.RULE('phoneticGloss', () => {
        // this.CONSUME(Tokens.PhoneticGlossOpen);
        this.CONSUME(Tokens.OpenCurly);
        this.CONSUME(Tokens.Plus);
        this.SUBRULE(this.glossBody);
        this.CONSUME2(Tokens.Plus);
        this.CONSUME2(Tokens.CloseCurly);
        // this.CONSUME(Tokens.PhoneticGlossClose);
    });

    // determinative rule
    determinative = this.RULE('determinative', () => {
        this.CONSUME(Tokens.OpenCurly); // todo: duplicate with curly
        this.SUBRULE(this.glossBody);
        this.CONSUME(Tokens.CloseCurly); // todo: duplicate with curly
    });

    // glossBody rule
    glossBody = this.RULE('glossBody', () => {
        this.MANY(() => {
            this.SUBRULE(this.openOmissionOrRemoval);
        });
        this.SUBRULE(this.value);
        this.MANY2(() => {
            this.SUBRULE(this.strictJoiner);
            this.SUBRULE2(this.value);
        });
        this.MANY3(() => {
            this.SUBRULE(this.closeOmissionOrRemoval);
        });
    });

    // value rule
    value = this.RULE('value', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.unidentifiedSign)},
            {ALT: () => this.SUBRULE(this.unclearSign)},
            {ALT: () => this.SUBRULE(this.unknownNumberOfSigns)},
            {ALT: () => this.SUBRULE(this.legacyUncertainSign)},
            {ALT: () => this.SUBRULE(this.reading)},
            {ALT: () => this.SUBRULE(this.number)},
            {ALT: () => this.SUBRULE(this.logogram)},
            {ALT: () => this.SUBRULE(this.surrogate)},
            {ALT: () => this.SUBRULE(this.compoundGrapheme)},
            {ALT: () => this.SUBRULE(this.variant)},
            {ALT: () => this.SUBRULE(this.egyptianMetricalFeetSeparator)},
        ]);
    });

    // variant rule
    variant = this.RULE('variant', () => {
        this.SUBRULE(this.variantPart);
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.Pipe); // todo: change to Token.VariantSeparator ?
            this.SUBRULE2(this.variantPart);
        });
    });

    // variantPart rule
    variantPart = this.RULE('variantPart', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.unidentifiedSign)},
            {ALT: () => this.SUBRULE(this.unclearSign)},
            {ALT: () => this.SUBRULE(this.legacyUncertainSign)},
            {ALT: () => this.SUBRULE(this.reading)},
            {ALT: () => this.SUBRULE(this.logogram)},
            {ALT: () => this.SUBRULE(this.surrogate)},
            {ALT: () => this.SUBRULE(this.number)},
            {ALT: () => this.SUBRULE(this.compoundGrapheme)},
        ]);
    });

    // Placeholder rules - these would need detailed implementation

    normalizedAkkadianShift = this.RULE('normalizedAkkadianShift', () => {
        this.CONSUME(Tokens.NormalizedAkkadianShift);
    });

    greekShift = this.RULE('greekShift', () => {
        this.CONSUME(Tokens.GreekShift);
    });

    languageShift = this.RULE('languageShift', () => {
        this.CONSUME(Tokens.LanguageShift);
    });

    commentaryProtocol = this.RULE('commentaryProtocol', () => {
        this.CONSUME(Tokens.CommentaryProtocol);
    });

    wordOmitted = this.RULE('wordOmitted', () => {
        this.CONSUME(Tokens.WordOmitted);
    });

    tabulation = this.RULE('tabulation', () => {
        this.CONSUME(Tokens.Tabulation);
    });

    columnToken = this.RULE('columnToken', () => {
        this.CONSUME(Tokens.Ampersand);
        this.OPTION(() => {
            this.SUBRULE(this.columnNumber);
        });
    });

    columnNumber = this.RULE('columnNumber', () => {
        this.CONSUME(Tokens.Int);
        // this.MANY(() => {
        //     this.CONSUME(Tokens.Digit);
        // });
    });

    erasure = this.RULE('erasure', () => {
        this.CONSUME(Tokens.Degree);
        this.SUBRULE(this.erasurePart);
        this.CONSUME(Tokens.Backslash);
        this.SUBRULE2(this.erasurePart);
        this.CONSUME2(Tokens.Degree);
    });

    erasurePart = this.RULE('erasurePart', () => {
        this.OPTION(() => {
            this.OR([
                {ALT: () => this.SUBRULE(this.divider)},
                {ALT: () => this.SUBRULE(this.word)},
                {ALT: () => this.SUBRULE(this.loneDeterminative)},
            ]);
            this.MANY(() => {
                this.CONSUME(Tokens.WordSeparator);
                this.OR2([
                    {ALT: () => this.SUBRULE2(this.divider)},
                    {ALT: () => this.SUBRULE2(this.word)},
                    {ALT: () => this.SUBRULE2(this.loneDeterminative)},
                ]);
            });
        });
    });

    loneDeterminative = this.RULE('loneDeterminative', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.anyOpen);
        });
        this.OR([
            {ALT: () => this.SUBRULE(this.phoneticGloss)},
            {ALT: () => this.SUBRULE(this.determinative)},
        ]);
        this.OPTION2(() => {
            this.SUBRULE(this.anyClose);
        });
    });

    brokenAway = this.RULE('brokenAway', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.openBrokenAway)},
            {ALT: () => this.SUBRULE(this.closeBrokenAway)},
        ]);
    });

    closeBrokenAway = this.RULE('closeBrokenAway', () => {
        this.CONSUME(Tokens.CloseBracket);
    });

    openBrokenAway = this.RULE('openBrokenAway', () => {
        this.CONSUME(Tokens.OpenBracket);
    });

    closePerhapsBrokenAway = this.RULE('closePerhapsBrokenAway', () => {
        this.CONSUME(Tokens.CloseParen);
    });

    openPerhapsBrokenAway = this.RULE('openPerhapsBrokenAway', () => {
        this.CONSUME(Tokens.OpenParen);
    });

    closeAccidentalOmission = this.RULE('closeAccidentalOmission', () => {
        this.CONSUME(Tokens.CloseAngle);
    });

    openAccidentalOmission = this.RULE('openAccidentalOmission', () => {
        this.CONSUME(Tokens.OpenAngle);
    });

    closeIntentionalOmission = this.RULE('closeIntentionalOmission', () => {
        // this.CONSUME(Tokens.CloseAngleParen);
        this.CONSUME(Tokens.CloseParen);
        this.CONSUME(Tokens.CloseAngle);
    });

    openIntentionalOmission = this.RULE('openIntentionalOmission', () => {
        // this.CONSUME(Tokens.OpenAngleParen);
        this.CONSUME(Tokens.OpenAngle);
        this.CONSUME(Tokens.OpenParen);
    });

    closeRemoval = this.RULE('closeRemoval', () => {
        this.CONSUME(Tokens.CloseAngle);
        this.CONSUME2(Tokens.CloseAngle);
        // this.CONSUME(Tokens.CloseDoubleAngle);
    });

    openRemoval = this.RULE('openRemoval', () => {
        // this.CONSUME(Tokens.OpenDoubleAngle);
        this.CONSUME(Tokens.OpenAngle);
        this.CONSUME2(Tokens.OpenAngle);
    });

    closeDocumentOrientedGloss = this.RULE('closeDocumentOrientedGloss', () => {
        // this.CONSUME(Tokens.DocumentOrientedGlossClose);
        this.CONSUME(Tokens.CloseParen);
        this.CONSUME(Tokens.CloseCurly);
    });

    openDocumentOrientedGloss = this.RULE('openDocumentOrientedGloss', () => {
        // this.CONSUME(Tokens.DocumentOrientedGlossOpen);
        this.CONSUME(Tokens.OpenCurly);
        this.CONSUME(Tokens.OpenParen);

    });

    closeOmissionOrRemoval = this.RULE('closeOmissionOrRemoval', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.closeAccidentalOmission)},
            {ALT: () => this.SUBRULE(this.closeIntentionalOmission)},
            {ALT: () => this.SUBRULE(this.closeRemoval)},
        ]);
    });

    openOmissionOrRemoval = this.RULE('openOmissionOrRemoval', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.openAccidentalOmission)},
            {ALT: () => this.SUBRULE(this.openIntentionalOmission)},
            {ALT: () => this.SUBRULE(this.openRemoval)},
        ]);
    });

    anyOpen = this.RULE('anyOpen', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                {ALT: () => this.SUBRULE(this.openIntentionalOmission)},
                {ALT: () => this.SUBRULE(this.openAccidentalOmission)},
                {ALT: () => this.SUBRULE(this.openRemoval)},
                {ALT: () => this.SUBRULE(this.openBrokenAway)},
                {ALT: () => this.SUBRULE(this.openPerhapsBrokenAway)},
                {ALT: () => this.SUBRULE(this.openLegacyDamage)},
            ]);
        });
    });

    anyClose = this.RULE('anyClose', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                {ALT: () => this.SUBRULE(this.closeIntentionalOmission)},
                {ALT: () => this.SUBRULE(this.closeAccidentalOmission)},
                {ALT: () => this.SUBRULE(this.closeRemoval)},
                {ALT: () => this.SUBRULE(this.closeBrokenAway)},
                {ALT: () => this.SUBRULE(this.closePerhapsBrokenAway)},
                {ALT: () => this.SUBRULE(this.closeLegacyDamage)},
            ]);
        });
    });

    openLegacyDamage = this.RULE('openLegacyDamage', () => {
        this.CONSUME(Tokens.LegacyOpenHalfBracket);
    });

    closeLegacyDamage = this.RULE('closeLegacyDamage', () => {
        this.CONSUME(Tokens.LegacyCloseHalfBracket);
    });


    // todo: check subrule numbers!
    looseJoiner = this.RULE('looseJoiner', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.strictJoiner)},
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.SUBRULE(this.inWordNewline);
                    });
                    this.SUBRULE(this.anyClose);
                    this.OPTION2(() => {
                        this.SUBRULE(this.joiner);
                    });
                    this.OPTION3(() => {
                        this.SUBRULE(this.anyOpen);
                    });
                },
            },
            {
                ALT: () => {
                    this.OPTION4(() => {
                        this.SUBRULE2(this.inWordNewline);
                    });
                    this.OPTION5(() => {
                        this.SUBRULE2(this.anyClose);
                    });
                    this.OPTION6(() => {
                        this.SUBRULE2(this.joiner);
                    });
                    this.OPTION7(() => {
                        this.SUBRULE2(this.anyOpen);
                    });
                },
            },
        ]);
    });

    strictJoiner = this.RULE('strictJoiner', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.inWordNewline);
        });
        this.OPTION2(() => {
            this.SUBRULE(this.anyClose);
        });
        this.SUBRULE(this.joiner);
        this.OPTION3(() => {
            this.SUBRULE(this.anyOpen);
        });
    });

    joiner = this.RULE('joiner', () => {
        this.MANY(() => {
            this.CONSUME(Tokens.WordSeparator);
        });
        this.OR([
            {ALT: () => this.CONSUME(Tokens.Minus)},
            {ALT: () => this.CONSUME(Tokens.Plus)},
            {ALT: () => this.CONSUME(Tokens.Dot)},
            {ALT: () => this.CONSUME(Tokens.Colon)},
            {ALT: () => this.CONSUME(Tokens.Semicolon)},
            {ALT: () => this.CONSUME(Tokens.Comma)},
            {ALT: () => this.SUBRULE(this.legacyOraccJoiner)},
        ]);
        this.MANY2(() => {
            this.CONSUME2(Tokens.WordSeparator);
        });
    });

    legacyOraccJoiner = this.RULE('legacyOraccJoiner', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.EnDash)},
            {ALT: () => {
                    this.CONSUME(Tokens.Minus)
                    this.CONSUME2(Tokens.Minus)
                }
            }
        ])
    })

    flags = this.RULE('flags', () => {
        this.MANY(() => {
            this.OR([
                {ALT: () => this.CONSUME(Tokens.Uncertain)},
                {ALT: () => this.CONSUME(Tokens.Correction)},
                {ALT: () => this.CONSUME(Tokens.Asterisk, { 'LABEL': 'Collation' })},
                {ALT: () => this.CONSUME(Tokens.Degree, {'LABEL': 'NoLongerVisible'})},
                {ALT: () => this.CONSUME(Tokens.Damage)},
            ]);
        });
    });


    egyptianMetricalFeetSeparator = this.RULE('egyptianMetricalFeetSeparator', () => {
        this.CONSUME(Tokens.Bullet);
        this.SUBRULE(this.flags);
    });

    // legacyUncertainSign rule
    legacyUncertainSign = this.RULE('legacyUncertainSign', () => {
        this.CONSUME(Tokens.DollarSign, {LABEL: 'LegacyUncertainSignPrefix'}); // "$"
        this.SUBRULE(this.logogram);
    });

    // number rule
    number = this.RULE('number', () => {
        this.SUBRULE(this.numberName);
        this.SUBRULE(this.modifiers);
        this.SUBRULE(this.flags);
        this.OPTION(() => {
            this.CONSUME(Tokens.OpenParen);
            this.SUBRULE(this.anyGrapheme);
            this.CONSUME(Tokens.CloseParen);
        });
    });

    // reading rule
    reading = this.RULE('reading', () => {
        this.SUBRULE(this.valueName);
        this.OPTION1(() => {
            this.SUBRULE(this.subIndex);
        });
        this.OPTION2(() => {
            this.SUBRULE(this.modifiers);
        });
        this.OPTION3(() => {
            this.SUBRULE(this.flags);
        });
        this.OPTION4(() => {
            this.CONSUME(Tokens.OpenParen);
            this.SUBRULE(this.anyGrapheme);
            this.CONSUME(Tokens.CloseParen);
        });
    });

    // logogram rule
    logogram = this.RULE('logogram', () => {
        this.SUBRULE(this.logogramName);
        this.SUBRULE(this.subIndex);
        this.SUBRULE(this.modifiers);
        this.SUBRULE(this.flags);
        this.OPTION(() => {
            this.CONSUME(Tokens.OpenParen);
            this.SUBRULE(this.anyGrapheme);
            this.CONSUME(Tokens.CloseParen);
        });
    });

    // surrogate rule
    surrogate = this.RULE('surrogate', () => {
        this.SUBRULE(this.logogramName);
        this.SUBRULE(this.subIndex);
        this.SUBRULE(this.modifiers);
        this.SUBRULE(this.flags);
        // this.CONSUME(Tokens.OpenAngleParen);
        this.CONSUME(Tokens.OpenAngle);
        this.CONSUME(Tokens.OpenParen);
        this.SUBRULE(this.surrogateText);
        this.CONSUME(Tokens.CloseParen);
        this.CONSUME(Tokens.CloseAngle);
        // this.CONSUME(Tokens.CloseAngleParen);
    });

    // surrogateText rule
    surrogateText = this.RULE('surrogateText', () => {
        this.SUBRULE(this.reading);
        this.MANY(() => {
            this.SUBRULE(this.joiner);
            this.SUBRULE2(this.reading);
        });
    });

    // numberName rule
    numberName = this.RULE('numberName', () => {
        this.SUBRULE(this.numberNameHead);
        this.MANY(() => {
            this.SUBRULE(this.brokenAway);
            this.SUBRULE(this.numberNamePart);
        });
    });

    // numberNameHead rule
    // todo: check, probably incorrect!
    numberNameHead = this.RULE('numberNameHead', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.Int)}, // Integer part
            {ALT: () => this.CONSUME(Tokens.Fraction)}, // Fractions like ½, ⅓, etc.
        ]);
    });

    // numberNamePart rule
    numberNamePart = this.RULE('numberNamePart', () => {
        this.CONSUME(Tokens.Int);
    });

    // valueName rule
    valueName = this.RULE('valueName', () => {
        this.SUBRULE(this.valueNamePart);
        this.MANY(() => {
            this.SUBRULE(this.brokenAway);
            this.SUBRULE2(this.valueNamePart);
        });
    });

    // valueNamePart rule
    valueNamePart = this.RULE('valueNamePart', () => {
        this.AT_LEAST_ONE(() => {
            this.SUBRULE(this.valueCharacterMain); // todo: check!
        });
    });

    // create valueCharacterMain rule that matches lowercase characters or akkadian diacritics if needed
    valueCharacterMain = this.RULE('valueCharacterMain', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.LCaseAtoZwithoutX)},
            {ALT: () => this.CONSUME(Tokens.LAkkadianUTF8)},
            // Add more token types if needed
        ]);
    });

    // logogramName rule
    logogramName = this.RULE('logogramName', () => {
        this.OR([
            {
                ALT: () => {
                    this.SUBRULE(this.logogramNamePart);
                    this.MANY(() => {
                        this.SUBRULE(this.brokenAway);
                        this.SUBRULE2(this.logogramNamePart);
                    });
                },
            },
            {ALT: () => this.CONSUME(Tokens.Asterisk, { 'LABEL': 'LegacyDishDivider' })}, // *
        ]);
    });

    // logogramNamePart rule
    logogramNamePart = this.RULE('logogramNamePart', () => {
        this.AT_LEAST_ONE(() => {
            // this.CONSUME(Tokens.LogogramCharacterMain); // todo: check!
            this.SUBRULE(this.logogramCharacterMain); // todo: check!
        });
    });

    logogramCharacterMain = this.RULE('logogramCharacterMain', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.UCaseAtoZwithoutX)},
            {ALT: () => this.CONSUME(Tokens.UAkkadianUTF8)},
        ]);
    });

    // anyGrapheme rule
    anyGrapheme = this.RULE('anyGrapheme', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.compoundGrapheme)},
            {ALT: () => this.SUBRULE(this.grapheme)},
        ]);
    });

    // compoundGrapheme rule
    compoundGrapheme = this.RULE('compoundGrapheme', () => {
        this.CONSUME(Tokens.Pipe);
        this.SUBRULE(this.compoundFragment);
        this.MANY(() => {
            this.CONSUME(Tokens.Dot);
            this.SUBRULE2(this.compoundFragment);
        });
        this.CONSUME2(Tokens.Pipe);
    });

    // compoundFragment rule
    compoundFragment = this.RULE('compoundFragment', () => {
        this.SUBRULE(this.subCompound);
        this.MANY(() => {
            this.SUBRULE(this.compoundOperator);
            this.SUBRULE2(this.subCompound);
        });
    })

    // subCompound rule
    // todo: check again!
    subCompound = this.RULE('subCompound', () => {
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(Tokens.OpenParen)
                    this.SUBRULE(this.compoundPart);
                    this.MANY(() => {
                        this.SUBRULE(this.compoundOperator);
                        this.SUBRULE2(this.compoundPart);
                    });
                    this.CONSUME(Tokens.CloseParen)
                }
            },
            {ALT: () => this.SUBRULE3(this.compoundPart)},
        ])
    });

    // compoundPart rule (referenced in compoundGrapheme)
    compoundPart = this.RULE('compoundPart', () => {
        this.SUBRULE(this.grapheme);
        this.MANY(() => {
            this.CONSUME(Tokens.Slash, {LABEL: 'variantSeparator'});
            this.SUBRULE2(this.grapheme);
        });
    });

    // compoundOperator rule
    compoundOperator = this.RULE('compoundOperator', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.Multiplication)},
            {ALT: () => this.CONSUME(Tokens.Percent)},
            {ALT: () => this.CONSUME(Tokens.Ampersand)},
            {ALT: () => this.CONSUME(Tokens.Plus)},
            {ALT: () => this.CONSUME(Tokens.Dot)}, // todo: check if needed
        ]);
    });


    // grapheme rule
    grapheme = this.RULE('grapheme', () => {
        this.SUBRULE(this.graphemeName);
        this.SUBRULE(this.subIndex);
        this.SUBRULE(this.modifiers);
        this.SUBRULE(this.flags);
    });

    // graphemeName rule
    graphemeName = this.RULE('graphemeName', () => {
        this.SUBRULE(this.graphemeNamePart);
    });

    // graphemeNamePart rule
    graphemeNamePart = this.RULE('graphemeNamePart', () => {
        this.OR([
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.valueCharacterMain);
                    });
                },
            },
            {
                ALT: () => {
                    this.AT_LEAST_ONE2(() => {
                        this.SUBRULE2(this.logogramCharacterMain);
                    });
                },
            },
            {
                ALT: () => {
                    this.SUBRULE(this.numberNameHead);
                    this.MANY(() => {
                        this.SUBRULE(this.numberNamePart);
                    });
                },
            },
        ]);
    });

    // subIndex rule
    // todo: check allowed characters!
    subIndex = this.RULE('subIndex', () => {
        this.OPTION(() => {
            this.OR([
                {ALT: () => this.CONSUME(Tokens.Int)},
                {ALT: () => this.CONSUME(Tokens.SubscriptInt)}, // Subscript characters like ₁, ₂, etc.
            ]);
        });
    });

    // unidentifiedSign rule
    unidentifiedSign = this.RULE('unidentifiedSign', () => {
        this.CONSUME(Tokens.X); // "X"
        this.SUBRULE(this.flags);
    });

    // unclearSign rule
    unclearSign = this.RULE('unclearSign', () => {
        this.CONSUME(Tokens.x); // "x"
        this.SUBRULE(this.flags);
    });

    // unknownNumberOfSigns rule
    unknownNumberOfSigns = this.RULE('unknownNumberOfSigns', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.EllipsisDots)}, // "..."
            {ALT: () => this.CONSUME(Tokens.EllipsisUnicode)}, // "…"
        ])
    });

    // add missing rules below

    // modifiers rule
    modifiers = this.RULE('modifiers', () => {
        this.MANY(() => {
            this.SUBRULE(this.modifier);
        });
    });

    // modifier rule
    // todo: modifier characters are to be checked again!
    modifier = this.RULE('modifier', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.At, {LABEL: 'ModifierPrefix'})}, // MODIFIER_PREFIX "@"
            {ALT: () => this.CONSUME(Tokens.Tilde, {LABEL: 'LegacyModifierPrefix'})}, // LEGACY_MODIFIER_PREFIX "~"
        ]);
        this.OR2([
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.valueCharacterMain, {LABEL: 'ModifierCharacter'}); // MODIFIER_CHARACTER: "c" | "f" | "g" | "s" | "t" | "n" | "z" | "k" | "r" | "h" | "v" | "aš"
                    });
                }
            },
            {
                ALT: () => {
                    this.CONSUME(Tokens.Int);
                }
            },
        ]);
    });

    // in_word_newline rule
    inWordNewline = this.RULE('inWordNewline', () => {
        this.CONSUME(Tokens.Semicolon);
    });

    normalizedAkkadian = this.RULE('normalizedAkkadian', () => {
        this.SUBRULE(this.normalizedText)
        this.MANY(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.break);
            this.CONSUME2(Tokens.WordSeparator);
            this.SUBRULE2(this.normalizedText);
        });
    });

    // _normalized_text rule
    normalizedText = this.RULE('normalizedText', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.akkadianWord)},
            {ALT: () => this.SUBRULE(this.lacuna)},
        ]);
        this.MANY(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.OR2([
                {ALT: () => this.SUBRULE2(this.akkadianWord)},
                {ALT: () => this.SUBRULE2(this.lacuna)},
            ]);
        });
    });

    // ?break rule
    break = this.RULE('break', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.certainCaesura)},
            {ALT: () => this.SUBRULE(this.uncertainCaesura)},
            {ALT: () => this.SUBRULE(this.certainFootSeparator)},
            {ALT: () => this.SUBRULE(this.uncertainFootSeparator)},
        ]);
    });

    // certain_caesura rule
    certainCaesura = this.RULE('certainCaesura', () => {
        this.CONSUME(Tokens.Pipe);
        this.CONSUME2(Tokens.Pipe);
    });

    // uncertain_caesura rule
    uncertainCaesura = this.RULE('uncertainCaesura', () => {
        this.CONSUME(Tokens.OpenParen);
        this.CONSUME(Tokens.Pipe, {LABEL: 'FootSeparator'});
        this.CONSUME2(Tokens.Pipe, {LABEL: 'FootSeparator'});
        this.CONSUME(Tokens.CloseParen);
    });

    // certain_foot_separator rule
    certainFootSeparator = this.RULE('certainFootSeparator', () => {
        this.CONSUME(Tokens.Pipe, {LABEL: 'FootSeparator'});
    });

    // uncertain_foot_separator rule
    uncertainFootSeparator = this.RULE('uncertainFootSeparator', () => {
        this.CONSUME(Tokens.OpenParen);
        this.CONSUME(Tokens.Pipe, {LABEL: 'FootSeparator'});
        this.CONSUME(Tokens.CloseParen);
    });

    // _lacuna rule
    lacuna = this.RULE('lacuna', () => {
        this.MANY(() => {
            this.SUBRULE(this.enclosureOpen);
        });
        this.SUBRULE(this.unknownNumberOfSigns);
        this.MANY2(() => {
            this.SUBRULE(this.enclosureClose);
        });
    });

    // akkadian_word rule
    akkadianWord = this.RULE('akkadianWord', () => {
        this.SUBRULE(this.akkadianParts);
        this.SUBRULE(this.normalizedModifiers);
        this.SUBRULE(this.closingEnclosures);
    });

    // parts rule (akkadian)
    akkadianParts = this.RULE('akkadianParts', () => {
        this.SUBRULE(this.akkadianWordHead);
        this.MANY(() => {
            this.SUBRULE(this.akkadianWordBody);
        });
    });

    // _akkadian_word_head rule
    akkadianWordHead = this.RULE('akkadianWordHead', () => {
        this.MANY(() => {
            this.SUBRULE(this.enclosureOpen);
        });
        this.OPTION(() => {
            this.SUBRULE(this.unknownNumberOfSigns);
            this.SUBRULE(this.betweenStrings);
        });
        this.SUBRULE(this.akkadianPartSequence);
    });

    // _akkadian_word_body rule
    akkadianWordBody = this.RULE('akkadianWordBody', () => {
        this.SUBRULE(this.betweenStrings);
        this.OR([
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.OR2([
                            {ALT: () => this.SUBRULE(this.akkadianString)},
                            {ALT: () => this.SUBRULE(this.unknownNumberOfSigns)},
                        ]);
                    });
                    this.OPTION1(() => {
                        this.SUBRULE2(this.akkadianString);
                    });
                }
            },
            {
                ALT: () => {
                    this.AT_LEAST_ONE2(() => {
                        this.OR3([
                            {ALT: () => this.SUBRULE2(this.unknownNumberOfSigns)},
                            {ALT: () => this.SUBRULE3(this.akkadianString)},
                        ]);
                    });
                    this.OPTION2(() => {
                        this.SUBRULE3(this.unknownNumberOfSigns);
                    });
                }
            },
            {
                ALT: () => {
                    this.SUBRULE4(this.akkadianString);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE4(this.unknownNumberOfSigns);
                }
            },
        ]);
    });

    // _part_sequence rule
    akkadianPartSequence = this.RULE('akkadianPartSequence', () => {
        this.OR([
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.akkadianString);
                        this.SUBRULE(this.unknownNumberOfSigns);
                    });
                    this.OPTION1(() => {
                        this.SUBRULE2(this.akkadianString);
                    });
                }
            },
            {
                ALT: () => {
                    this.AT_LEAST_ONE2(() => {
                        this.SUBRULE2(this.unknownNumberOfSigns);
                        this.SUBRULE3(this.akkadianString);
                    });
                    this.OPTION2(() => {
                        this.SUBRULE3(this.unknownNumberOfSigns);
                    });
                }
            },
            {
                ALT: () => {
                    this.SUBRULE4(this.akkadianString);
                }
            },
        ]);
    });

    // normalized_modifiers rule
    normalizedModifiers = this.RULE('normalizedModifiers', () => {
        this.MANY(() => {
            this.SUBRULE(this.normalizedModifier);
        });
    });

    // normalized_modifier rule
    normalizedModifier = this.RULE('normalizedModifier', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.Damage)}, // DAMAGE "#"
            {ALT: () => this.CONSUME(Tokens.Uncertain)}, // UNCERTAIN "?"
            {ALT: () => this.CONSUME(Tokens.Correction)}, // CORRECTION "!"
        ]);
    });

    // _between_strings rule
    betweenStrings = this.RULE('betweenStrings', () => {
        this.OR([
            {
                ALT: () => {
                    this.AT_LEAST_ONE(() => {
                        this.SUBRULE(this.enclosure);
                    });
                    this.SUBRULE(this.akkadianSeparator);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE2(this.akkadianSeparator);
                    this.AT_LEAST_ONE2(() => {
                        this.SUBRULE2(this.enclosure);
                    });
                }
            },
            {
                ALT: () => {
                    this.AT_LEAST_ONE3(() => {
                        this.SUBRULE3(this.enclosure);
                    });
                }
            },
            {
                ALT: () => {
                    this.SUBRULE3(this.akkadianSeparator);
                }
            },
        ]);
    });

    // separator rule
    akkadianSeparator = this.RULE('akkadianSeparator', () => {
        this.CONSUME(Tokens.Minus, {LABEL: 'Separator'});
    });

    // closing_enclosures rule
    closingEnclosures = this.RULE('closingEnclosures', () => {
        this.MANY(() => {
            this.SUBRULE(this.enclosureClose);
        });
    });

    // ?enclosure rule
    enclosure = this.RULE('enclosure', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.enclosureOpen)},
            {ALT: () => this.SUBRULE(this.enclosureClose)},
        ]);
    });

    // ?enclosure_open rule
    enclosureOpen = this.RULE('enclosureOpen', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.openBrokenAway)},
            {ALT: () => this.SUBRULE(this.openPerhapsBrokenAway)},
            {ALT: () => this.SUBRULE(this.openEmendation)},
        ]);
    });

    // ?enclosure_close rule
    enclosureClose = this.RULE('enclosureClose', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.closeBrokenAway)},
            {ALT: () => this.SUBRULE(this.closePerhapsBrokenAway)},
            {ALT: () => this.SUBRULE(this.closeEmendation)},
        ]);
    });

    // open_emendation rule
    openEmendation = this.RULE('openEmendation', () => {
        this.CONSUME(Tokens.OpenAngle);
    });

    // close_emendation rule
    closeEmendation = this.RULE('closeEmendation', () => {
        this.CONSUME(Tokens.CloseAngle);
    });

    // akkadian_string rule
    // todo: check allowed characters!
    akkadianString = this.RULE('akkadianString', () => {
        this.AT_LEAST_ONE(() => {
            this.OR([
                {ALT: () => this.CONSUME(Tokens.UCaseAtoZwithoutX)},
                {ALT: () => this.CONSUME(Tokens.LCaseAtoZwithoutX)},
                {ALT: () => this.CONSUME(Tokens.UAkkadianUTF8)},
                {ALT: () => this.CONSUME(Tokens.LAkkadianUTF8)},
            ])
        });
    });

    // _greek rule
    greek = this.RULE('greek', () => {
        this.SUBRULE(this.greekToken)
        this.MANY(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE2(this.greekToken)
        });
    });

    // ?greek_token rule
    greekToken = this.RULE('greekToken', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.greekWord)},
            {ALT: () => this.SUBRULE(this.columnToken)},
        ]);
    });

    // greek_word rule
    greekWord = this.RULE('greekWord', () => {
        this.MANY(() => {
            this.OR([
                {ALT: () => this.SUBRULE(this.greekEnclosure)},
                {ALT: () => this.SUBRULE(this.greekWordPart)},
            ]);
        });
        this.SUBRULE2(this.greekWordPart);
        this.MANY2(() => {
            this.OR2([
                {ALT: () => this.SUBRULE2(this.greekEnclosure)}, // todo: check subrule numbers!
                {ALT: () => this.SUBRULE3(this.greekWordPart)},
            ]);
        });
    });

    // ?greek_word_part rule
    greekWordPart = this.RULE('greekWordPart', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.greekLetter)},
            {ALT: () => this.SUBRULE(this.unidentifiedSign)},
            {ALT: () => this.SUBRULE(this.unclearSign)},
            {ALT: () => this.SUBRULE(this.unknownNumberOfSigns)},
        ]);
    });

    // ?greek_enclosure rule
    greekEnclosure = this.RULE('greekEnclosure', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.anyOpen)},
            {ALT: () => this.SUBRULE(this.anyClose)},
        ]);
    });

    // greek_letter rule
    greekLetter = this.RULE('greekLetter', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.GreekUTF8)},
            {ALT: () => this.SUBRULE(this.letter)},
        ]);
        this.SUBRULE(this.flags);
    });

    letter = this.OVERRIDE_RULE('letter', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.UCaseAtoZwithoutX)},
            {ALT: () => this.CONSUME(Tokens.X)},
            {ALT: () => this.CONSUME(Tokens.LCaseAtoZwithoutX)},
            {ALT: () => this.CONSUME(Tokens.x)},
        ]);
    });

    lCaseLetter = this.RULE('lCaseLetter', () => {
        this.OR([
            {ALT: () => this.CONSUME(Tokens.LCaseAtoZwithoutX)},
            {ALT: () => this.CONSUME(Tokens.x)},
        ]);
    });

}

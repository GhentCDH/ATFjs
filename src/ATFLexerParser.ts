import { Lexer, CstParser, type IToken } from 'chevrotain';
import * as Tokens from './tokens';
import {CommonRules} from "@/rules/commonRules";

/**
 * ATF Lexer using Chevrotain
 * Combines all tokens defined in tokens.ts
 *
 * Mirrors the structure of the Lark parser files:
 * - ebl_atf_common.lark
 * - ebl_atf_text_line.lark
 * - ebl_atf_dollar_line.lark
 * - ebl_atf_control_line.lark
 * - ebl_atf_at_line.lark
 * - ebl_atf_translation_line.lark
 * - ebl_atf_note_line.lark
 * - ebl_atf_parallel_line.lark
 * - ebl_atf_manuscript_line.lark
 * - ebl_atf_chapter.lark
 */
export class ATFLexer {
    private lexer: Lexer;

    constructor() {

        const allTokens = [
            // Multi-character sequences FIRST (most specific)
            Tokens.LinguisticGlossOpen,      // {{
            Tokens.LinguisticGlossClose,     // }}
            Tokens.PhoneticGlossOpen,        // {%
            Tokens.PhoneticGlossClose,       // %}
            Tokens.DocumentOrientedGlossOpen,  // {#
            Tokens.DocumentOrientedGlossClose, // #}
            Tokens.OpenDoubleAngle,          // <<
            Tokens.CloseDoubleAngle,         // >>
            Tokens.OpenAngleParen,           // <(
            Tokens.CloseAngleParen,          // )>
            // Tokens.OpenDoubleCurly,          // {{ - DUPLICATE, remove
            // Tokens.CloseDoubleCurly,         // }} - DUPLICATE, remove
            Tokens.EllipsisDots,             // ...
            Tokens.EllipsisUnicode,          // …
            Tokens.Tabulation,               // \t

            // Line markers (multi-char, must come before single char versions)
            Tokens.ParallelLineMarker,       // &
            Tokens.TranslationMarker,        // #
            Tokens.NoteMarker,               // #
            // Tokens.DollarLineMarker,         // $
            // Tokens.AtLineMarker,             // @
            // Tokens.ControlMarker,            // & or =:

            // Keywords (longer strings before shorter ones)
            Tokens.Signatures,               // BEFORE Signature
            Tokens.Signature,
            Tokens.RulingKeyword,
            Tokens.SingleRuling,
            Tokens.DoubleRuling,
            Tokens.TripleRuling,
            Tokens.ImageKeyword,
            Tokens.Qualification,
            Tokens.Extent,
            Tokens.Scope,
            Tokens.Blank,
            Tokens.Broken,
            Tokens.Effaced,
            Tokens.Illegible,
            Tokens.Missing,
            Tokens.Traces,
            Tokens.Omitted,
            Tokens.Continues,
            Tokens.Seal,
            Tokens.Column,
            Tokens.Heading,
            Tokens.Catchline,
            Tokens.Colophon,
            Tokens.Date,
            Tokens.Summary,
            Tokens.Witnesses,
            Tokens.Division,
            Tokens.Div,
            Tokens.End,
            Tokens.Composite,
            Tokens.Locator,
            Tokens.Tablet,
            Tokens.Envelope,
            Tokens.Prism,
            Tokens.Bulla,
            Tokens.Fragment,
            Tokens.Object,
            Tokens.Obverse,
            Tokens.Reverse,
            Tokens.Left,
            Tokens.Right,
            Tokens.Top,
            Tokens.Bottom,
            Tokens.Face,
            Tokens.Edge,
            Tokens.Surface,
            Tokens.Std,
            Tokens.Lex,
            Tokens.Med,
            Tokens.Mag,
            Tokens.Sui,
            Tokens.MarkupLanguage,
            Tokens.MarkupToken,
            Tokens.TranslationLanguage,
            Tokens.CfMarker,
            Tokens.Duplicates,

            // Character sets (patterns)
            Tokens.ValueCharacterMain,
            Tokens.LogogramCharacterMain,
            Tokens.GreekUTF8,
            Tokens.LegacyValueCharacterAccented,
            Tokens.LegacyLogogramCharacterAccented,
            Tokens.LegacyOpenHalfBracket,
            Tokens.LegacyCloseHalfBracket,
            // Tokens.LegacyValueCharacter,      // Single char, comes after specific ones

            // Single character operators (LAST, least specific)
            // Tokens.LegacyPrime,              // ' - BEFORE Prime if different
            Tokens.SingleQuote,                    // ' - DUPLICATE with LegacyPrime?
            Tokens.DividerSymbol,            // : or ;
            Tokens.OpenCurly,                // {
            Tokens.CloseCurly,               // }
            Tokens.OpenBracket,              // [
            Tokens.CloseBracket,             // ]
            Tokens.OpenParen,                // (
            Tokens.CloseParen,               // )
            Tokens.OpenAngle,                // <
            Tokens.CloseAngle,               // >
            Tokens.Degree,                   // ° - BEFORE NoLongerVisible if different
            // Tokens.NoLongerVisible,          // ° - DUPLICATE?
            Tokens.Uncertain,                // ?
            Tokens.Correction,               // !
            Tokens.Collation,                // ||
            Tokens.Bullet,                   // •
            Tokens.Backslash,                // \
            Tokens.Pipe,                     // |
            Tokens.Dash,                     // -
            Tokens.Plus,                     // +
            Tokens.Dot,                      // .
            Tokens.Colon,                    // : - duplicate with DividerSymbol?
            Tokens.Semicolon,                // ; - duplicate with DividerSymbol?
            Tokens.Comma,                    // ,
            Tokens.EqualsSign,               // =
            Tokens.At,                       // @ - DUPLICATE with AtLineMarker
            Tokens.Ampersand,                // & - DUPLICATE with ParallelLineMarker/ControlMarker
            Tokens.DollarSign,               // $ - DUPLICATE with DollarLineMarker
            Tokens.Hash,                     // # - DUPLICATE with TranslationMarker/NoteMarker
            Tokens.Percent,                  // %
            Tokens.Tilde,                    // ~
            Tokens.WordOmitted,              // —

            // Numbers and letters (catch broader patterns)
            Tokens.Int,
            Tokens.Digit,
            Tokens.LcaseLetter,
            Tokens.Letter,

            // Whitespace (skipped)
            Tokens.WhiteSpace,
            Tokens.Newline,

            // Catch-all (MUST be last)
            Tokens.AnyText,
        ]

        // Token order matters! More specific patterns should come first
        const _allTokens = [
            // Multi-character sequences first
            Tokens.LinguisticGlossOpen,
            Tokens.LinguisticGlossClose,
            Tokens.PhoneticGlossOpen,
            Tokens.PhoneticGlossClose,
            Tokens.DocumentOrientedGlossOpen,
            Tokens.DocumentOrientedGlossClose,
            Tokens.OpenDoubleAngle,
            Tokens.CloseDoubleAngle,
            Tokens.OpenAngleParen,
            Tokens.CloseAngleParen,
            Tokens.OpenDoubleCurly,
            Tokens.CloseDoubleCurly,
            Tokens.EllipsisDots,
            Tokens.EllipsisUnicode,
            Tokens.Tabulation,
            Tokens.ParallelLineMarker,
            Tokens.TranslationMarker,
            Tokens.NoteMarker,
            Tokens.DollarLineMarker,
            Tokens.AtLineMarker,
            Tokens.ControlMarker,

            // Keywords (must come before single letters)
            Tokens.Qualification,
            Tokens.Extent,
            Tokens.Scope,
            Tokens.RulingKeyword,
            Tokens.SingleRuling,
            Tokens.DoubleRuling,
            Tokens.TripleRuling,
            Tokens.ImageKeyword,
            Tokens.Blank,
            Tokens.Broken,
            Tokens.Effaced,
            Tokens.Illegible,
            Tokens.Missing,
            Tokens.Traces,
            Tokens.Omitted,
            Tokens.Continues,
            Tokens.Seal,
            Tokens.Column,
            Tokens.Heading,
            Tokens.Catchline,
            Tokens.Colophon,
            Tokens.Date,
            Tokens.Signature,
            Tokens.Signatures,
            Tokens.Summary,
            Tokens.Witnesses,
            Tokens.Division,
            Tokens.Div,
            Tokens.End,
            Tokens.Composite,
            Tokens.Locator,
            Tokens.Tablet,
            Tokens.Envelope,
            Tokens.Prism,
            Tokens.Bulla,
            Tokens.Fragment,
            Tokens.Object,
            Tokens.Obverse,
            Tokens.Reverse,
            Tokens.Left,
            Tokens.Right,
            Tokens.Top,
            Tokens.Bottom,
            Tokens.Face,
            Tokens.Edge,
            Tokens.Surface,
            Tokens.Std,
            Tokens.Lex,
            Tokens.Med,
            Tokens.L,
            Tokens.D,
            Tokens.Mag,
            Tokens.Sui,
            Tokens.MarkupLanguage,
            Tokens.MarkupToken,
            Tokens.TranslationLanguage,
            Tokens.CfMarker,
            Tokens.Duplicates,

            // Character sets
            Tokens.ValueCharacterMain,
            Tokens.LogogramCharacterMain,
            Tokens.GreekUTF8,
            Tokens.LegacyValueCharacterAccented,
            Tokens.LegacyLogogramCharacterAccented,
            Tokens.LegacyOpenHalfBracket,
            Tokens.LegacyCloseHalfBracket,

            // Single character operators (must come after multi-char)
            Tokens.LegacyPrime,
            Tokens.SingleQuote,
            Tokens.DividerSymbol,
            Tokens.OpenCurly,
            Tokens.CloseCurly,
            Tokens.OpenBracket,
            Tokens.CloseBracket,
            Tokens.OpenParen,
            Tokens.CloseParen,
            Tokens.OpenAngle,
            Tokens.CloseAngle,
            Tokens.Degree,
            Tokens.Uncertain,
            Tokens.Correction,
            Tokens.Collation,
            Tokens.NoLongerVisible,
            Tokens.Bullet,
            Tokens.Backslash,
            Tokens.Pipe,
            Tokens.Dash,
            Tokens.Plus,
            Tokens.Dot,
            Tokens.Colon,
            Tokens.Semicolon,
            Tokens.Comma,
            Tokens.EqualsSign,
            Tokens.At,
            Tokens.Ampersand,
            Tokens.DollarSign,
            Tokens.Hash,
            Tokens.Percent,
            Tokens.Tilde,
            Tokens.WordOmitted,
            Tokens.LegacyValueCharacter,

            // Numbers and letters
            Tokens.Int,
            Tokens.Digit,
            Tokens.LcaseLetter,
            Tokens.Letter,

            // Whitespace (skipped)
            Tokens.WhiteSpace,
            Tokens.Newline,

            // Catch-all (must be last)
            Tokens.AnyText,
        ];

        this.lexer = new Lexer(allTokens);
    }

    tokenize(text: string): IToken[] {
        const result = this.lexer.tokenize(text);
        return result.tokens;
    }

    getErrors(): string[] {
        // This should be called after tokenize()
        return [];
    }
}

/**
 * Main ATF Parser using Chevrotain
 * Mirrors: ebl_atf.lark (the main grammar file)
 */
export class ATFParser extends CommonRules {
    constructor() {
        super(getAllTokens());
        this.performSelfAnalysis();
    }

    start = this.RULE('start', () => {
        this.SUBRULE(this.line);
    });

    line = this.RULE('line', () => {
        this.OR([
            // { ALT: () => this.SUBRULE(this.emptyLine) },
            { ALT: () => this.SUBRULE(this.noteLine) },
            { ALT: () => this.SUBRULE(this.textLine) },
            { ALT: () => this.SUBRULE(this.dollarLine) },
            { ALT: () => this.SUBRULE(this.atLine) },
            { ALT: () => this.SUBRULE(this.parallelLine) },
            { ALT: () => this.SUBRULE(this.translationLine) },
            { ALT: () => this.SUBRULE(this.controlLine) },
            // { ALT: () => this.SUBRULE(this.legacyControlLine) },
        ]);
    });

    // Placeholder implementations - these would be filled in with real rules
    emptyLine = this.RULE('emptyLine', () => {
        this.MANY(() => this.CONSUME(Tokens.WhiteSpace));
        this.OPTION(() => this.CONSUME(Tokens.Newline)); // @flamsens: added
    });

    noteLine = this.RULE('noteLine', () => {
        this.CONSUME(Tokens.Hash);
        this.AT_LEAST_ONE(() => this.CONSUME(Tokens.AnyText));
    });

    textLine = this.RULE('textLine', () => {
        this.SUBRULE(this.lineNumber);
        this.CONSUME(Tokens.Dot);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    dollarLine = this.RULE('dollarLine', () => {
        this.CONSUME(Tokens.DollarLineMarker);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    atLine = this.RULE('atLine', () => {
        this.CONSUME(Tokens.AtLineMarker);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    parallelLine = this.RULE('parallelLine', () => {
        this.CONSUME(Tokens.ParallelLineMarker);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    translationLine = this.RULE('translationLine', () => {
        this.CONSUME(Tokens.TranslationMarker);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    controlLine = this.RULE('controlLine', () => {
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(Tokens.EqualsSign);
                    this.CONSUME(Tokens.Colon);
                },
            },
            { ALT: () => this.CONSUME(Tokens.Ampersand) },
        ]);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    legacyControlLine = this.RULE('legacyControlLine', () => {
        this.CONSUME(Tokens.Hash);
        this.MANY(() => this.CONSUME(Tokens.AnyText));
    });

    lineNumber = this.RULE('lineNumber', () => {
        this.MANY(() => this.CONSUME(Tokens.Digit));
    });
}

/**
 * Get all tokens for the parser
 */
function getAllTokens() {
    return [
        Tokens.LinguisticGlossOpen,
        Tokens.LinguisticGlossClose,
        Tokens.PhoneticGlossOpen,
        Tokens.PhoneticGlossClose,
        Tokens.DocumentOrientedGlossOpen,
        Tokens.DocumentOrientedGlossClose,
        Tokens.OpenDoubleAngle,
        Tokens.CloseDoubleAngle,
        Tokens.OpenAngleParen,
        Tokens.CloseAngleParen,
        Tokens.OpenDoubleCurly,
        Tokens.CloseDoubleCurly,
        Tokens.EllipsisDots,
        Tokens.EllipsisUnicode,
        Tokens.Tabulation,
        Tokens.ParallelLineMarker,
        Tokens.TranslationMarker,
        Tokens.NoteMarker,
        Tokens.DollarLineMarker,
        Tokens.AtLineMarker,
        Tokens.ControlMarker,
        Tokens.Qualification,
        Tokens.Extent,
        Tokens.Scope,
        Tokens.RulingKeyword,
        Tokens.SingleRuling,
        Tokens.DoubleRuling,
        Tokens.TripleRuling,
        Tokens.ImageKeyword,
        Tokens.Blank,
        Tokens.Broken,
        Tokens.Effaced,
        Tokens.Illegible,
        Tokens.Missing,
        Tokens.Traces,
        Tokens.Omitted,
        Tokens.Continues,
        Tokens.Seal,
        Tokens.Column,
        Tokens.Heading,
        Tokens.Catchline,
        Tokens.Colophon,
        Tokens.Date,
        Tokens.Signature,
        Tokens.Signatures,
        Tokens.Summary,
        Tokens.Witnesses,
        Tokens.Division,
        Tokens.Div,
        Tokens.End,
        Tokens.Composite,
        Tokens.Locator,
        Tokens.Tablet,
        Tokens.Envelope,
        Tokens.Prism,
        Tokens.Bulla,
        Tokens.Fragment,
        Tokens.Object,
        Tokens.Obverse,
        Tokens.Reverse,
        Tokens.Left,
        Tokens.Right,
        Tokens.Top,
        Tokens.Bottom,
        Tokens.Face,
        Tokens.Edge,
        Tokens.Surface,
        Tokens.Std,
        Tokens.Lex,
        Tokens.Med,
        Tokens.L,
        Tokens.D,
        Tokens.Mag,
        Tokens.Sui,
        Tokens.MarkupLanguage,
        Tokens.MarkupToken,
        Tokens.TranslationLanguage,
        Tokens.CfMarker,
        Tokens.Duplicates,
        Tokens.ValueCharacterMain,
        Tokens.LogogramCharacterMain,
        Tokens.GreekUTF8,
        Tokens.LegacyValueCharacterAccented,
        Tokens.LegacyLogogramCharacterAccented,
        Tokens.LegacyOpenHalfBracket,
        Tokens.LegacyCloseHalfBracket,
        Tokens.LegacyPrime,
        Tokens.SingleQuote,
        Tokens.DividerSymbol,
        Tokens.OpenCurly,
        Tokens.CloseCurly,
        Tokens.OpenBracket,
        Tokens.CloseBracket,
        Tokens.OpenParen,
        Tokens.CloseParen,
        Tokens.OpenAngle,
        Tokens.CloseAngle,
        Tokens.Degree,
        Tokens.Uncertain,
        Tokens.Correction,
        Tokens.Collation,
        Tokens.NoLongerVisible,
        Tokens.Bullet,
        Tokens.Backslash,
        Tokens.Pipe,
        Tokens.Dash,
        Tokens.Plus,
        Tokens.Dot,
        Tokens.Colon,
        Tokens.Semicolon,
        Tokens.Comma,
        Tokens.EqualsSign,
        Tokens.At,
        Tokens.Ampersand,
        Tokens.DollarSign,
        Tokens.Hash,
        Tokens.Percent,
        Tokens.Tilde,
        Tokens.WordOmitted,
        Tokens.LegacyValueCharacter,
        Tokens.Int,
        Tokens.Digit,
        Tokens.LcaseLetter,
        Tokens.Letter,
        Tokens.WhiteSpace,
        Tokens.Newline,
        Tokens.AnyText,
    ];
}


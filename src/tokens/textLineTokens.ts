import {createToken} from "chevrotain";

// Re-export all tokens from commonTokens
export * from './commonTokens';

// ============================================================================
// TEXT LINE TOKENS (from ebl_atf_text_line.lark)
// ============================================================================

// Special bracket combinations
// export const OpenDoubleCurly = createToken({
//     name: 'OpenDoubleCurly',
//     pattern: /\{\{/,
// });
//
// export const CloseDoubleCurly = createToken({
//     name: 'CloseDoubleCurly',
//     pattern: /\}\}/,
// });

// export const OpenCurlyParen = createToken({
//     name: 'OpenCurlyParen',
//     pattern: /\{\(/,
// });
//
// export const CloseCurlyParen = createToken({
//     name: 'CloseCurlyParen',
//     pattern: /\)\}/,
// });

// export const OpenCurlyPlus = createToken({
//     name: 'OpenCurlyPlus',
//     pattern: /\{\+/,
// });
//
// export const CloseCurlyPlus = createToken({
//     name: 'CloseCurlyPlus',
//     pattern: /\+\}/,
// });


// export const OpenDoubleAngle = createToken({
//     name: 'OpenDoubleAngle',
//     pattern: /\<\</,
// });
//
// export const CloseDoubleAngle = createToken({
//     name: 'CloseDoubleAngle',
//     pattern: /\>\>/,
// });
//
// export const OpenAngleParen = createToken({
//     name: 'OpenAngleParen',
//     pattern: /\<\(/,
// });
//
// export const CloseAngleParen = createToken({
//     name: 'CloseAngleParen',
//     pattern: /\)\>/,
// });

// Gloss markers
// export const LinguisticGlossOpen = createToken({
//     name: 'LinguisticGlossOpen',
//     pattern: /\{\{/,
// });
//
// export const LinguisticGlossClose = createToken({
//     name: 'LinguisticGlossClose',
//     pattern: /\}\}/,
// });
//
// export const PhoneticGlossOpen = createToken({
//     name: 'PhoneticGlossOpen',
//     pattern: /\{\+/,
// });
//
// export const PhoneticGlossClose = createToken({
//     name: 'PhoneticGlossClose',
//     pattern: /\+\}/,
// });
//
// export const DeterminativeOpen = createToken({
//     name: 'DeterminativeOpen',
//     pattern: /\{/,
// });
//
// export const DeterminativeClose = createToken({
//     name: 'DeterminativeClose',
//     pattern: /\}/,
// });
//
// export const DocumentOrientedGlossOpen = createToken({
//     name: 'DocumentOrientedGlossOpen',
//     pattern: /\{\(/,
// });
//
// export const DocumentOrientedGlossClose = createToken({
//     name: 'DocumentOrientedGlossClose',
//     pattern: /\)\}/,
// });

// Special characters
export const LegacyOpenHalfBracket = createToken({
    name: 'LegacyOpenHalfBracket',
    pattern: /[⌈⸢]/,
});

export const LegacyCloseHalfBracket = createToken({
    name: 'LegacyCloseHalfBracket',
    pattern: /[⌉⸣]/,
});

export const WordOmitted = createToken({
    name: 'WordOmitted',
    pattern: /ø/,
});

export const Tabulation = createToken({
    name: 'Tabulation',
    pattern: /\(\$___\$\)/,
});

export const EllipsisUnicode = createToken({
    name: 'EllipsisUnicode',
    pattern: /…/,
});

export const EllipsisDots = createToken({
    name: 'EllipsisDots',
    pattern: /\.\.\./,
});

// Dividers
export const ColonQuote = createToken({
    name: 'ColonQuote',
    pattern: /:'|:"|:.|::|:|;|\//, // matches :' :" :. :: : ; /
});


export const DividerSymbol = createToken({
    name: 'DividerSymbol',
    // pattern: /:'|:"|:.|::|:|;|\//,
    pattern: /:'|:"|:.|::/, // removed : ; / from here to avoid conflict with other tokens
});

// Status and modifiers
export const Uncertain = createToken({
    name: 'Uncertain',
    pattern: /\?/,
});

export const Correction = createToken({
    name: 'Correction',
    pattern: /!/,
});

export const Collation = createToken({
    name: 'Collation',
    pattern: /\*/,
});

export const Damage = createToken({
    name: 'Damage',
    pattern: /#/,
});

export const NoLongerVisible = createToken({
    name: 'NoLongerVisible',
    pattern: /°/,
});

export const GreekShift = createToken({
    name: 'GreekShift',
    // pattern: /(?<=[ \t])%(grc|akkgrc|suxgrc)(?=[ \t])/,
    pattern: /%(grc|akkgrc|suxgrc)(?=[ \t])/,
})

export const NormalizedAkkadianShift = createToken({
    name: 'GreekShift',
    // pattern: /(?<=[ \t])%n(?=[ \t])/,
    pattern: /%n(?=[ \t])/,
})

export const LanguageShift = createToken({
    name: 'LanguageShift',
    // pattern: /(?<=[ \t])%[a-z]+(?=[ \t])/,
    pattern: /%[a-z]+(?=[ \t])/,
})

export const CommentaryProtocol = createToken({
    name: 'CommentaryProtocol',
    // pattern: /(?<=[ \t])!(qt|bs|cm|zz)(?=[ \t])/,
    pattern: /!(qt|bs|cm|zz)(?=[ \t])/,
})

export const Fraction = createToken({
    name: 'Fraction',
    pattern: /[½⅓¼⅕⅙⅔⅚]/,
});

// character sets
// Letters
export const LCaseAtoZwithoutX = createToken({
    name: 'LcaseLetterWithoutX',
    pattern: /[a-wyz]/,
});

export const UCaseAtoZwithoutX = createToken({
    name: 'UcaseLetterWithoutX',
    pattern: /[A-WYZ]/,
});

export const LAkkadianUTF8 = createToken({
    name: 'AkkadianUTF8',
    pattern: /[āâēêĝīîṣštṭūûḫʾ]/,
});

export const UAkkadianUTF8 = createToken({
    name: 'LogogramUTF8',
    pattern: /[ĀÂĒÊĜĪÎṢŠTṬŪÛḪʾ]/,
});

export const GreekUTF8 = createToken({
    name: 'GreekUTF8',
    pattern: /[αβΓγΔδεζΘθΙικΛλμνΞξΠπρΣσςτΦφΨψΩω]/,
});

// lowercase x
export const x = createToken({
    name: 'x',
    pattern: /x/,
});

// uppercase X
export const X = createToken({
    name: 'X',
    pattern: /X/,
});


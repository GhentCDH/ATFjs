import {createToken} from "chevrotain";

// Whitespace and newlines
export const WhiteSpace = createToken({
    name: 'WhiteSpace',
    pattern: /[ \t]+/,
    group: 'skipped',
});

export const Newline = createToken({
    name: 'Newline',
    pattern: /\n/,
    line_breaks: true,
});

// Digits and numbers
export const Int = createToken({
    name: 'Int',
    pattern: /[0-9]+/,
});

export const SubscriptInt = createToken({
    name: 'SubscriptInt',
    pattern: /[₀₁₂₃₄₅₆₇₈₉]+/,
});

export const Digit = createToken({
    name: 'Digit',
    pattern: /[0-9]/,
});

export const DigitNonZero = createToken({
    name: 'DigitNonZero',
    pattern: /[1-9]/,
});

// Punctuation and symbols
export const Dot = createToken({
    name: 'Dot',
    pattern: /\./,
});

export const WordSeparator = createToken({
    name: 'WordSeparator',
    pattern: / /,
});

export const Pipe = createToken({
    name: 'Pipe',
    pattern: /\|/,
});

export const Minus = createToken({
    name: 'Minus',
    pattern: /-/,
});

export const EnDash = createToken({
    name: 'EnDash',
    pattern: /–/,
});

export const Plus = createToken({
    name: 'Plus',
    pattern: /\+/,
});

export const Colon = createToken({
    name: 'Colon',
    pattern: /:/,
});

export const Semicolon = createToken({
    name: 'Semicolon',
    pattern: /;/,
});

// asterisk
export const Asterisk = createToken({
    name: 'Asterisk',
    pattern: /\*/,
});

export const Comma = createToken({
    name: 'Comma',
    pattern: /,/,
});

export const And = createToken({
    name: 'And',
    pattern: /&/,
});

export const At = createToken({
    name: 'At',
    pattern: /@/,
});

export const DollarSign = createToken({
    name: 'DollarSign',
    pattern: /\$/,
});

export const Tilde = createToken({
    name: 'Tilde',
    pattern: /~/,
});

export const Percent = createToken({
    name: 'Percent',
    pattern: /%/,
});

export const Hash = createToken({
    name: 'Hash',
    pattern: /#/,
});

export const Ampersand = createToken({
    name: 'Ampersand',
    pattern: /&/,
});

// ×
export const Multiplication = createToken({
    name: 'Multiplication',
    pattern: /×/,
})

// Brackets
export const OpenBracket = createToken({
    name: 'OpenBracket',
    pattern: /\[/,
});

export const CloseBracket = createToken({
    name: 'CloseBracket',
    pattern: /\]/,
});

export const OpenParen = createToken({
    name: 'OpenParen',
    pattern: /\(/,
});

export const CloseParen = createToken({
    name: 'CloseParen',
    pattern: /\)/,
});

export const OpenCurly = createToken({
    name: 'OpenCurly',
    pattern: /\{/,
});

export const CloseCurly = createToken({
    name: 'CloseCurly',
    pattern: /\}/,
});

export const OpenAngle = createToken({
    name: 'OpenAngle',
    pattern: /</,
});

export const CloseAngle = createToken({
    name: 'CloseAngle',
    pattern: />/,
});

export const Degree = createToken({
    name: 'Degree',
    pattern: /°/,
});

export const Backslash = createToken({
    name: 'Backslash',
    pattern: /\\/,
});

export const Bullet = createToken({
    name: 'Bullet',
    pattern: /•/,
});

export const Slash = createToken({
    name: 'Slash',
    pattern: /\//,
});

export const EqualsSign = createToken({
    name: 'EqualsSign',
    pattern: /=/,
});

export const SingleQuote = createToken({
    name: 'SingleQuote',
    pattern: /'/,
});

export const LegacyPrime = createToken({
    name: 'LegacyPrime',
    pattern: /′|'|ʾ/,
});

// characters
export const Letter = createToken({
    name: 'Letter',
    pattern: /[a-zA-Z]/,
});
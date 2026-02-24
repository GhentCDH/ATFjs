import {createToken} from "chevrotain";

// ============================================================================
// DOLLAR LINE TOKENS (from ebl_atf_dollar_line.lark)
// ============================================================================

// export const DollarLineMarker = createToken({
//     name: 'DollarLineMarker',
//     pattern: /\$/,
// });
//
// export const LeftParen = createToken({
//     name: 'LeftParen',
//     pattern: /\(/,
// });
//
// export const RightParen = createToken({
//     name: 'RightParen',
//     pattern: /\)/,
// });


export const Blank = createToken({
    name: 'Blank',
    pattern: /blank/,
});

export const Broken = createToken({
    name: 'Broken',
    pattern: /broken/,
});

export const Effaced = createToken({
    name: 'Effaced',
    pattern: /effaced/,
});

export const Illegible = createToken({
    name: 'Illegible',
    pattern: /illegible/,
});

export const Missing = createToken({
    name: 'Missing',
    pattern: /missing/,
});

export const Traces = createToken({
    name: 'Traces',
    pattern: /traces/,
});

export const Omitted = createToken({
    name: 'Omitted',
    pattern: /omitted/,
});

export const Continues = createToken({
    name: 'Continues',
    pattern: /continues/,
});

export const Qualification = createToken({
    name: 'Qualification',
    pattern: /at least|at most|about/,
});

export const Extent = createToken({
    name: 'Extent',
    pattern: /several|some|rest of|start of|beginning of|middle of|end of/,
});

// column & surface are declared separately
export const Scope = createToken({
    name: 'Scope',
    pattern: /columns|lines|line|cases|case|side|excerpt/,
});

export const RulingKeyword = createToken({
    name: 'RulingKeyword',
    pattern: /ruling/,
});

export const SingleRuling = createToken({
    name: 'SingleRuling',
    pattern: /single/,
});

export const DoubleRuling = createToken({
    name: 'DoubleRuling',
    pattern: /double/,
});

export const TripleRuling = createToken({
    name: 'TripleRuling',
    pattern: /triple/,
});

export const ImageKeyword = createToken({
    name: 'ImageKeyword',
    pattern: /image/,
});
import {createToken} from "chevrotain";

// ============================================================================
// PARALLEL LINE TOKENS (from ebl_atf_parallel_line.lark)
// ============================================================================

export const ParallelLineMarker = createToken({
    name: 'ParallelLineMarker',
    pattern: /\/\/ /,
});

export const CfMarker = createToken({
    name: 'CfMarker',
    pattern: /cf\. /,
});

export const Duplicates = createToken({
    name: 'Duplicates',
    pattern: /&d/,
});

export const Lex = createToken({
    name: 'Lex',
    pattern: /Lex/,
});

export const Med = createToken({
    name: 'Med',
    pattern: /Med/,
});

export const L = createToken({
    name: 'L',
    pattern: /L/,
});

export const D = createToken({
    name: 'D',
    pattern: /D/,
});

export const Mag = createToken({
    name: 'Mag',
    pattern: /Mag/,
});

export const Sui = createToken({
    name: 'Sui',
    pattern: /Šui/,
});

import {createToken} from "chevrotain";

// ============================================================================
// TRANSLATION LINE TOKENS (from ebl_atf_translation_line.lark)
// ============================================================================

export const TranslationMarker = createToken({
    name: 'TranslationMarker',
    pattern: /#tr/,
});

export const TranslationLanguage = createToken({
    name: 'TranslationLanguage',
    pattern: /[a-z]{2}/,
});
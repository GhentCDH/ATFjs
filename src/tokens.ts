import { createToken } from 'chevrotain';

// ============================================================================
// COMMON TOKENS
// ============================================================================









// ============================================================================
// CHARACTER SETS (from ebl_atf_common.lark)
// ============================================================================

// export const ValueCharacterMain = createToken({
//     name: 'ValueCharacterMain',
//     pattern: /[aāâbdeēêfgĝhiīîyklmnpqrsṣštṭuūûwzḫʾ]/,
// });

export const LAkkadianUTF8 = createToken({
    name: 'AkkadianUTF8',
    pattern: /[āâēêĝīîṣštṭūûḫʾ]/,
});


// export const LogogramCharacterMain = createToken({
//     name: 'LogogramCharacterMain',
//     pattern: /[AĀÂBDEĒÊGĜHIĪÎYKLMNPQRSṢŠTṬUŪÛWZḪʾ]/,
// });

export const UAkkadianUTF8 = createToken({
    name: 'LogogramUTF8',
    pattern: /[ĀÂĒÊĜĪÎṢŠTṬŪÛḪʾ]/,
});

export const GreekUTF8 = createToken({
    name: 'GreekUTF8',
    pattern: /[αβΓγΔδεζΘθΙικΛλμνΞξΠπρΣσςτΦφΨψΩω]/,
});

// Legacy support

export const LegacyValueCharacter = createToken({
    name: 'LegacyValueCharacter',
    pattern: /'/,
});

export const LegacyValueCharacterAccented = createToken({
    name: 'LegacyValueCharacterAccented',
    pattern: /[áàéèíìúù]/,
});

export const LegacyLogogramCharacterAccented = createToken({
    name: 'LegacyLogogramCharacterAccented',
    pattern: /[ÁÀÉÈÍÌÚÙ]/,
});











// ============================================================================
// CONTROL LINE TOKENS (from ebl_atf_control_line.lark)
// ============================================================================

export const ControlMarker = createToken({
    name: 'ControlMarker',
    pattern: /=:|&/,
});


// ============================================================================
// CATCH-ALL TOKEN
// ============================================================================

export const AnyText = createToken({
    name: 'AnyText',
    pattern: /[^\s]+/,
});


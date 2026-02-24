// ============================================================================
// AT LINE TOKENS (from ebl_atf_at_line.lark)
// ============================================================================

import {createToken} from "chevrotain";

export const AtLineMarker = createToken({
    name: 'AtLineMarker',
    pattern: /@/,
});

export const Seal = createToken({
    name: 'Seal',
    pattern: /seal /,
});

export const Column = createToken({
    name: 'Column',
    pattern: /column/,
});

export const Heading = createToken({
    name: 'Heading',
    pattern: /h/,
});

export const Catchline = createToken({
    name: 'Catchline',
    pattern: /catchline/,
});

export const Colophon = createToken({
    name: 'Colophon',
    pattern: /colophon/,
});

export const Date = createToken({
    name: 'Date',
    pattern: /date/,
});

export const Signature = createToken({
    name: 'Signature',
    pattern: /signature/,
});

export const Signatures = createToken({
    name: 'Signatures',
    pattern: /signatures/,
});

export const Summary = createToken({
    name: 'Summary',
    pattern: /summary/,
});

export const Witnesses = createToken({
    name: 'Witnesses',
    pattern: /witnesses/,
});

export const Division = createToken({
    name: 'Division',
    pattern: /m=division/,
});

export const Div = createToken({
    name: 'Div',
    pattern: /div/,
});

export const End = createToken({
    name: 'End',
    pattern: /end/,
});

export const Composite = createToken({
    name: 'Composite',
    pattern: /composite/,
});

export const Locator = createToken({
    name: 'Locator',
    pattern: /m=locator/,
});






// ============================================================================
// COMMON LINE TOKENS
// ============================================================================

export const Tablet = createToken({
    name: 'Tablet',
    pattern: /tablet/,
});

export const Envelope = createToken({
    name: 'Envelope',
    pattern: /envelope/,
});

export const Prism = createToken({
    name: 'Prism',
    pattern: /prism/,
});

export const Bulla = createToken({
    name: 'Bulla',
    pattern: /bulla/,
});

export const Fragment = createToken({
    name: 'Fragment',
    pattern: /fragment/,
});

export const Object = createToken({
    name: 'Object',
    pattern: /object/,
});

export const Obverse = createToken({
    name: 'Obverse',
    pattern: /obverse/,
});

export const Reverse = createToken({
    name: 'Reverse',
    pattern: /reverse/,
});

export const Left = createToken({
    name: 'Left',
    pattern: /left/,
});

export const Right = createToken({
    name: 'Right',
    pattern: /right/,
});

export const Top = createToken({
    name: 'Top',
    pattern: /top/,
});

export const Bottom = createToken({
    name: 'Bottom',
    pattern: /bottom/,
});

export const Face = createToken({
    name: 'Face',
    pattern: /face/,
});

export const Edge = createToken({
    name: 'Edge',
    pattern: /edge/,
});

export const Surface = createToken({
    name: 'Surface',
    pattern: /surface/,
});


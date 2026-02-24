# ATFjs

A JavaScript/TypeScript implementation of a ATF (Atf Text Format) parser using [Chevrotain](https://chevrotain.io/).

The parser is based on the [Lark ATF parser](https://github.com/ElectronicBabylonianLiterature/ebl-api/tree/master/ebl/transliteration/domain/atf_parsers/lark_parser) that is part of the [Electronic Babylonian Literature](https://www.ebl.lmu.de/) API.

[!NOTE]
This parser is in early Alpha state and not fully usable yet.

## Usage

```typescript
import { ATFLexer, ATFParser } from '@ghentcdh/atfjs';

// Create lexer and tokenize
const lexer = new ATFLexer();
const tokens = lexer.tokenize(atfText);

// Check for lexing errors
const lexErrors = lexer.getErrors();
if (lexErrors.length > 0) {
    console.error('Lexing errors:', lexErrors);
}

// Create parser and parse tokens
const parser = new ATFParser();
const parseResult = parser.parse(tokens);

// Access the CST (Concrete Syntax Tree)
if (parseResult.errors.length > 0) {
    console.error('Parse errors:', parseResult.errors);
} else {
    console.log('CST:', parseResult.value);
}
```

## Structure


```
chevrotain_parser/
├── ATFLexerParser.ts           # Main lexer and parser classes
└── rules/
    ├── commonRules.ts          # Common rules (objects, surfaces, line numbers)
    ├── textLineRules.ts        # Text line parsing rules
    ├── dollarLineRules.ts      # Dollar line rules
    ├── controlLineRules.ts     # Control line rules
    ├── atLineRules.ts          # @-line rules
    ├── translationLineRules.ts # Translation rules
    ├── noteLineRules.ts        # Note line rules
    ├── parallelLineRules.ts    # Parallel line rules
    ├── manuscriptLineRules.ts  # Manuscript line rules
    └── chapterRules.ts         # Chapter rules
└── tokens/                     # All token definitions
```

## Mapping to Lark Files

| Chevrotain File | Lark File(s) | Purpose |
|---|---|---|
| `tokens.ts` | `ebl_atf_common.lark`, `ebl_atf_*_line.lark` | Token definitions |
| `commonRules.ts` | `ebl_atf_common.lark` | Shared grammar rules |
| `textLineRules.ts` | `ebl_atf_text_line.lark` | Text line parsing |
| `dollarLineRules.ts` | `ebl_atf_dollar_line.lark` | Dollar line parsing |
| `controlLineRules.ts` | `ebl_atf_control_line.lark` | Control line parsing |
| `atLineRules.ts` | `ebl_atf_at_line.lark` | @-line parsing |
| `translationLineRules.ts` | `ebl_atf_translation_line.lark` | Translation parsing |
| `noteLineRules.ts` | `ebl_atf_note_line.lark` | Note line parsing |
| `parallelLineRules.ts` | `ebl_atf_parallel_line.lark` | Parallel line parsing |
| `manuscriptLineRules.ts` | `ebl_atf_manuscript_line.lark` | Manuscript line parsing |
| `chapterRules.ts` | `ebl_atf_chapter.lark` | Chapter-level parsing |
| `ATFLexerParser.ts` | `ebl_atf.lark` | Main entry point |



## Token Categories

Tokens are organized by category (all in `tokens.ts`):

- **Common**: Whitespace, newlines, digits, letters
- **Character Sets**: Value and logogram characters, Greek alphabet
- **Text Line**: Brackets, operators, gloss markers
- **Structural**: Line markers (@, $, #), dividers
- **Keywords**: Object types, surface names, state keywords
- **Special**: Primes, flags, status markers

## Implementation Notes

### Token Ordering
Token order is critical in the lexer:
1. Multi-character sequences (e.g., `{{`, `}}`, `//`) come first
2. Keywords next (before single letters)
3. Single character operators
4. Character sets
5. Catch-all pattern last

### Rule Implementation
Each rule file extends `CstParser` and implements grammar rules using Chevrotain's DSL:
- `RULE()` - Define a parsing rule
- `CONSUME()` - Match a token
- `SUBRULE()` - Call another rule
- `OR()` - Alternative paths
- `MANY()` - Zero or more repetitions
- `AT_LEAST_ONE()` - One or more repetitions
- `OPTION()` - Optional elements

## Future Improvements

- [ ] Add proper error recovery
- [ ] Performance optimization for large documents
- [ ] Add visitor pattern for CST traversal


import { Lexer, type IToken } from 'chevrotain';

import { TextLineRules, textLineLexerTokens } from './rules/textLineRules';
import {LLStarLookaheadStrategy} from "chevrotain-allstar";


export class TextLineLexer {
    private lexer: Lexer;

    constructor() {
        this.lexer = new Lexer(textLineLexerTokens);
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
export class TextLineParser extends TextLineRules {
    constructor() {
        super(textLineLexerTokens, {
            lookaheadStrategy: new LLStarLookaheadStrategy()
        });
        this.performSelfAnalysis();
    }
}



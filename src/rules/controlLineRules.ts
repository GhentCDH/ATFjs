import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Control line rules
 * Mirrors: ebl_atf_control_line.lark
 */
export class ControlLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    controlLine = this.RULE('controlLine', () => {
        this.OR([
            { ALT: () => { this.CONSUME(Tokens.EqualsSign); this.CONSUME(Tokens.Colon) } },
            { ALT: () => this.CONSUME(Tokens.Ampersand) },
        ]);
        this.OPTION(() => {
            this.SUBRULE(this.freeText);
        });
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


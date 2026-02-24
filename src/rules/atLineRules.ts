import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens/atLineTokens';

/**
 * At line rules
 * Mirrors: ebl_atf_at_line.lark
 */
export class AtLineRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    atLine = this.RULE('atLine', () => {
        this.CONSUME(Tokens.At);
        this.SUBRULE(this.atLineValue);
    });

    atLineValue = this.RULE('atLineValue', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.seal) },
            { ALT: () => this.SUBRULE(this.column) },
            { ALT: () => this.SUBRULE(this.legacyColumn) },
            { ALT: () => this.SUBRULE(this.heading) },
            { ALT: () => this.SUBRULE(this.discourse) },
            { ALT: () => this.SUBRULE(this.objectWithStatus) },
            { ALT: () => this.SUBRULE(this.surfaceWithStatus) },
            { ALT: () => this.SUBRULE(this.divisions) },
            { ALT: () => this.SUBRULE(this.composite) },
        ]);
    });

    seal = this.RULE('seal', () => {
        this.CONSUME(Tokens.Seal);
        this.CONSUME(Tokens.Int);
    });

    column = this.RULE('column', () => {
        this.CONSUME(Tokens.Column);
        this.CONSUME(Tokens.WordSeparator);
        this.CONSUME(Tokens.Int);
        this.OPTION1(() => this.CONSUME(Tokens.WordSeparator));
        this.SUBRULE(this.status);
    });

    legacyColumn = this.RULE('legacyColumn', () => {
        this.CONSUME(Tokens.Column);
    });

    heading = this.RULE('heading', () => {
        this.CONSUME(Tokens.Heading);
        this.CONSUME(Tokens.Int);
        this.OPTION(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.SUBRULE(this.markup);
        });
    });

    discourse = this.RULE('discourse', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Catchline) },
            { ALT: () => this.CONSUME(Tokens.Colophon) },
            { ALT: () => this.CONSUME(Tokens.Date) },
            { ALT: () => this.CONSUME(Tokens.Signature) },
            { ALT: () => this.CONSUME(Tokens.Signatures) },
            { ALT: () => this.CONSUME(Tokens.Summary) },
            { ALT: () => this.CONSUME(Tokens.Witnesses) },
        ]);
    });

    objectWithStatus = this.RULE('objectWithStatus', () => {
        this.SUBRULE(this.object);
        this.OPTION1(() => this.CONSUME(Tokens.WordSeparator));
        this.SUBRULE(this.status);
    });

    surfaceWithStatus = this.RULE('surfaceWithStatus', () => {
        this.SUBRULE(this.surface);
        this.OPTION1(() => this.CONSUME(Tokens.WordSeparator));
        this.SUBRULE(this.status);
    });

    divisions = this.RULE('divisions', () => {
        this.CONSUME(Tokens.Division);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
        this.OPTION(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.CONSUME(Tokens.Int);
        });
    });

    composite = this.RULE('composite', () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.compositeComposite) },
            { ALT: () => this.SUBRULE(this.compositeStart) },
            { ALT: () => this.SUBRULE(this.compositeEnd) },
            { ALT: () => this.SUBRULE(this.compositeMilestone) },
        ]);
    });

    compositeStart = this.RULE('compositeStart', () => {
        this.CONSUME(Tokens.Div);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
        this.OPTION(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.CONSUME(Tokens.Int);
        });
    });

    compositeEnd = this.RULE('compositeEnd', () => {
        this.CONSUME(Tokens.End);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
    });

    compositeComposite = this.RULE('compositeComposite', () => {
        this.CONSUME(Tokens.Composite);
    });

    compositeMilestone = this.RULE('compositeMilestone', () => {
        this.CONSUME(Tokens.Locator);
        this.CONSUME(Tokens.WordSeparator);
        this.SUBRULE(this.freeText);
        this.OPTION(() => {
            this.CONSUME(Tokens.WordSeparator);
            this.CONSUME(Tokens.Int);
        });
    });

    object = this.RULE('object', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Tablet) },
            { ALT: () => this.CONSUME(Tokens.Envelope) },
            { ALT: () => this.CONSUME(Tokens.Prism) },
            { ALT: () => this.CONSUME(Tokens.Bulla) },
        ]);
    });

    surface = this.RULE('surface', () => {
        this.OR([
            { ALT: () => this.CONSUME(Tokens.Obverse) },
            { ALT: () => this.CONSUME(Tokens.Reverse) },
            { ALT: () => this.CONSUME(Tokens.Left) },
            { ALT: () => this.CONSUME(Tokens.Right) },
            { ALT: () => this.CONSUME(Tokens.Top) },
            { ALT: () => this.CONSUME(Tokens.Bottom) },
        ]);
    });

    status = this.RULE('status', () => {
        this.MANY(() => {
            this.OR([
                { ALT: () => this.CONSUME(Tokens.SingleQuote) },
                { ALT: () => this.CONSUME(Tokens.LegacyPrime) },
                { ALT: () => this.CONSUME(Tokens.Uncertain) },
                { ALT: () => this.CONSUME(Tokens.Correction) },
                { ALT: () => this.CONSUME(Tokens.Collation) },
                { ALT: () => this.CONSUME(Tokens.Degree) }, // NoLongerVisible
            ]);
        });
    });

    markup = this.RULE('markup', () => {
        this.SUBRULE(this.markupToken);
    });

    markupToken = this.RULE('markupToken', () => {
        this.CONSUME(Tokens.AnyText);
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


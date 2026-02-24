import { CstParser } from 'chevrotain';
import * as Tokens from '../tokens';

/**
 * Chapter rules
 * Mirrors: ebl_atf_chapter.lark
 */
export class ChapterRules extends CstParser {
    constructor() {
        super([]);
        this.performSelfAnalysis();
    }

    chapter = this.RULE('chapter', () => {
        this.SUBRULE(this.chapterLine);
        this.MANY(() => {
            this.AT_LEAST_ONE(() => {
                this.CONSUME(Tokens.Newline);
            });
            this.SUBRULE2(this.chapterLine);
        });
    });

    chapterLine = this.RULE('chapterLine', () => {
        this.OPTION1(() => {
            this.SUBRULE(this.chapterTranslation);
        });
        this.SUBRULE(this.lineVariant);
        this.MANY(() => {
            this.CONSUME(Tokens.Newline);
            this.SUBRULE2(this.lineVariant);
        });
    });

    chapterTranslation = this.RULE('chapterTranslation', () => {
        this.AT_LEAST_ONE(() => {
            this.SUBRULE(this.translationLine);
            this.CONSUME(Tokens.Newline);
        });
    });

    lineVariant = this.RULE('lineVariant', () => {
        this.SUBRULE(this.reconstruction);
        this.MANY(() => {
            this.CONSUME(Tokens.Newline);
            this.SUBRULE(this.manuscriptLine);
        });
    });

    reconstruction = this.RULE('reconstruction', () => {
        this.SUBRULE(this.textLine);
        this.OPTION1(() => {
            this.CONSUME(Tokens.Newline);
            this.SUBRULE(this.noteLine);
        });
        this.MANY(() => {
            this.CONSUME(Tokens.Newline);
            this.SUBRULE(this.parallelLine);
        });
    });

    textLine = this.RULE('textLine', () => {
        this.SUBRULE(this.freeText);
    });

    noteLine = this.RULE('noteLine', () => {
        this.SUBRULE(this.freeText);
    });

    parallelLine = this.RULE('parallelLine', () => {
        this.SUBRULE(this.freeText);
    });

    manuscriptLine = this.RULE('manuscriptLine', () => {
        this.SUBRULE(this.freeText);
    });

    translationLine = this.RULE('translationLine', () => {
        this.SUBRULE(this.freeText);
    });

    freeText = this.RULE('freeText', () => {
        this.AT_LEAST_ONE(() => {
            this.CONSUME(Tokens.AnyText);
        });
    });
}


/**
 * custom TSLint rule: Import Destructuring Spacing Rule
 * rules written in TypeScript must be compiled to JavaScript before invoking TSLint. to compile:
 * tsc -m commonjs --noImplicitAny importDestructuringSpacingRule.ts ../../node_modules/tslint/lib/tslint.d.ts
 *
 * enforces Angular Style Guide Rule 03-05: Import Destructuring Spacing
 * -- Do leave one whitespace character inside of the import statements' curly braces when destructuring.
 * -- Why? Whitespace makes it easier to read the imports.
 */

import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "Style 03-05 Import Destructuring Spacing";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ImportDestructuringSpacingWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class ImportDestructuringSpacingWalker extends Lint.SkippableTokenAwareRuleWalker {
  private scanner: ts.Scanner;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, sourceFile.text);
  }

  public visitImportDeclaration(node: ts.ImportDeclaration) {
    const importClause = node.importClause;
    if (importClause != null && importClause.namedBindings != null) {
      const text = importClause.namedBindings.getText();

      if (!this.checkForWhiteSpace(text)) {
        this.addFailure(this.createFailure(importClause.namedBindings.getStart(), importClause.namedBindings.getWidth(), Rule.FAILURE_STRING));
      }
    }
    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node);
  }

  private checkForWhiteSpace(text: string) {
    return /{\s[^]*\s}/.test(text);
  }
}

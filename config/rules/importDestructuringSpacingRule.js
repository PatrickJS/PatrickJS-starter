/**
 * custom TSLint rule: Import Destructuring Spacing Rule
 * rules written in TypeScript must be compiled to JavaScript before invoking TSLint. to compile:
 * tsc -m commonjs --noImplicitAny importDestructuringSpacingRule.ts ../../node_modules/tslint/lib/tslint.d.ts
 *
 * enforces Angular Style Guide Rule 03-05: Import Destructuring Spacing
 * -- Do leave one whitespace character inside of the import statements' curly braces when destructuring.
 * -- Why? Whitespace makes it easier to read the imports.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ImportDestructuringSpacingWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "Style 03-05 Import Destructuring Spacing";
    return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
// The walker takes care of all the work.
var ImportDestructuringSpacingWalker = (function (_super) {
    __extends(ImportDestructuringSpacingWalker, _super);
    function ImportDestructuringSpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, sourceFile.text);
    }
    ImportDestructuringSpacingWalker.prototype.visitImportDeclaration = function (node) {
        var importClause = node.importClause;
        if (importClause != null && importClause.namedBindings != null) {
            var text = importClause.namedBindings.getText();
            if (!this.checkForWhiteSpace(text)) {
                this.addFailure(this.createFailure(importClause.namedBindings.getStart(), importClause.namedBindings.getWidth(), Rule.FAILURE_STRING));
            }
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    ImportDestructuringSpacingWalker.prototype.checkForWhiteSpace = function (text) {
        return /{\s[^]*\s}/.test(text);
    };
    return ImportDestructuringSpacingWalker;
})(Lint.SkippableTokenAwareRuleWalker);

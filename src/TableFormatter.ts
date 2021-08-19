import { Editor } from "codemirror";
import { CliPrettify } from 'markdown-table-prettify';

module.exports = {
	default: function(_context: any) {

		const plugin = function(CodeMirror) {
			CodeMirror.defineExtension('formatTable', function() {
				const cm: Editor = this; // to get autocomplete working

				const cursor = cm.getCursor();
				let startLine = cursor.line;
				while (startLine >=0 && cm.getLine(startLine).trimStart().charAt(0) === '|') startLine--;
				startLine++;

				let endLine = cursor.line;
				while (!!cm.getLine(endLine) && cm.getLine(endLine).trimStart().charAt(0) === '|') endLine++;
				
				const table = cm.getRange({line: startLine, ch: 0}, {line: endLine, ch: 0});
				const formatted = CliPrettify.prettify(table);
				cm.replaceRange(formatted, {line: startLine, ch: 0}, {line: endLine, ch: 0})
            });
		}

		return {
			plugin: plugin,
        }
    }
}
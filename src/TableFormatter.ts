import { Editor } from "codemirror";
import formatTable from "../lib/FormatTable";

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
				
				const formatted = formatTable(startLine, endLine - startLine, i => cm.getLine(i));
				cm.replaceRange(formatted, {line: startLine, ch: 0}, {line: endLine, ch: 0})
            });
		}

		return {
			plugin: plugin,
        }
    }
}
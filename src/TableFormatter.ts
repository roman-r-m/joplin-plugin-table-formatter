import { Editor } from "codemirror";
import formatTable from "../lib/FormatTable";


module.exports = {
	default: function(_context: any) {

		const plugin = function(CodeMirror) {
			CodeMirror.defineExtension('formatTable', function() {
				const cm: Editor = this; // to get autocomplete working

				const cursor = cm.getCursor();
				let startLine = cursor.line;
				while (cm.getLine(startLine).trimStart().charAt(0) === '|') startLine--;
				startLine++;

				let endLine = cursor.line;
				while (cm.getLine(endLine).trimStart().charAt(0) === '|') endLine++;
				
				cm.extendSelection(
					{line: startLine, ch: 0},
					{line: endLine, ch: 0});

				// const table = [];
				// const columnWidths = [];

				// for (let i = startLine; i < endLine; i++) {
				// 	if (i === startLine + 1) continue;

				// 	const line: string = cm.getLine(i);
				// 	// split into columns, \| is escape
				// 	const cols = line.split(/[^/]\|/);
				// 	table.push(cols);
				// 	for (let j = 0; j < cols.length; j++) {
				// 		if (j >= columnWidths.length) {
				// 			columnWidths.push(cols[j].length);
				// 		} else {
				// 			columnWidths[j] = Math.max(columnWidths[i], cols[j].length);
				// 		}
				// 	}
				// }

				// for (let row = 0; row < table.length; row++) {
				// 	for (let col = 0; col < columnWidths.length; col++) {
				// 		table[row][col] = (table[row][col] as string).padEnd(columnWidths[col]);
				// 	}
				// }
				// 	if (table[row].length < columnWidths[row]) {
				// 		// TODO symmetric pad
				// 	}
				// }

				// for (let i = 0; i < table.length; i++) {
				// 	// format row
				// }

				const formatted = formatTable(endLine - startLine, cm.getLine);

				cm.replaceSelection(formatted, 'end');
            });
		}

		return {
			plugin: plugin,
        }
    }
}
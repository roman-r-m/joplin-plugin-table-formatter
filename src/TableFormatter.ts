module.exports = {
	default: function(_context: any) {

		const plugin = function(CodeMirror) {
			CodeMirror.defineExtension('formatTable', function() {
				const cursor = this.getCursor();
				let startLine = cursor.line;
				while (this.getLine(startLine).trimStart().charAt(0) === '|') startLine--;
				startLine++;

				let endLine = cursor.line;
				while (this.getLine(endLine).trimStart().charAt(0) === '|') endLine++;
				endLine--;
				

				this.extendSelection(
					{line: startLine, ch: 0},
					{line: endLine, ch: this.getLine(endLine).length});
            });
		}

		return {
			plugin: plugin,
        }
    }
}
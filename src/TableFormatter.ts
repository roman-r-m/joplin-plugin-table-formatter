//import * as cm from 'codemirror';


module.exports = {
	default: function(context: any) {

		const plugin = function(CodeMirror) {
            CodeMirror.defineExtension('formatTable', function() {

            });
		};

		return {
			plugin: plugin,
        }
    }
}
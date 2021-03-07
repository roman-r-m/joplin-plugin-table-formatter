import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		joplin.contentScripts.register(ContentScriptType.CodeMirrorPlugin, "TableFormatter", "./TableFormatter.js");
		joplin.commands.register({
			name: 'formatTable',
			label: 'Format Table',
			execute: async () => {
				await joplin.commands.execute('editor.execCommand', { name: 'formatTable', });
			}
		});
	},
});

import joplin from 'api';
import { ContentScriptType, MenuItemLocation } from 'api/types';

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
		joplin.views.menuItems.create("Format Table", "formatTable", MenuItemLocation.Edit);
		joplin.views.menuItems.create("Format Table", "formatTable", MenuItemLocation.EditorContextMenu);
	},
});

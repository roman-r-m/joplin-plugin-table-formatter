import joplin from 'api';
import {ContentScriptType, MenuItemLocation, ToolbarButtonLocation} from 'api/types';

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
		joplin.views.menuItems.create("Format Table Context", "formatTable", MenuItemLocation.EditorContextMenu);

		await initTableAutoFormatter();
	},
});

async function initTableAutoFormatter() {
	await joplin.contentScripts.register(
		ContentScriptType.CodeMirrorPlugin,
		'auto_table_formatter',
		'./tableAutoFormatter/index.js'
	);

	await joplin.commands.register({
		name: 'auto_table_alignColumnLeft',
		label: 'Align current column to left',
		iconName: 'fas fa-align-left',
		execute: async () => {
			await joplin.commands.execute('editor.execCommand', {
				name: 'auto_table_alignColumns',
				args: [[':', '-']]
			});
		},
	});

	await joplin.commands.register({
		name: 'auto_table_alignColumnRight',
		label: 'Align current column to right',
		iconName: 'fas fa-align-right',
		execute: async () => {
			await joplin.commands.execute('editor.execCommand', {
				name: 'auto_table_alignColumns',
				args: [['-', ':']]
			});
		},
	});

	await joplin.commands.register({
		name: 'auto_table_alignColumnCenter',
		label: 'Align current column to center',
		iconName: 'fas fa-align-center',
		execute: async () => {
			await joplin.commands.execute('editor.execCommand', {
				name: 'auto_table_alignColumns',
				args: [[':', ':']]
			});
		},
	});

	await joplin.commands.register({
		name: 'auto_table_alignColumnSlash',
		label: 'Remove the alignment of current column',
		iconName: 'fas fa-align-justify',
		execute: async () => {
			await joplin.commands.execute('editor.execCommand', {
				name: 'auto_table_alignColumns',
				args: [['-', '-']]
			});
		},
	});

	await joplin.views.toolbarButtons.create(
		'auto_table_align-column-left',
		'auto_table_alignColumnLeft',
		ToolbarButtonLocation.EditorToolbar,
	);

	await joplin.views.toolbarButtons.create(
		'auto_table_align-column-center',
		'auto_table_alignColumnCenter',
		ToolbarButtonLocation.EditorToolbar,
	);

	await joplin.views.toolbarButtons.create(
		'auto_table_align-column-right',
		'auto_table_alignColumnRight',
		ToolbarButtonLocation.EditorToolbar,
	);

	await joplin.views.toolbarButtons.create(
		'auto_table_align-column-slash',
		'auto_table_alignColumnSlash',
		ToolbarButtonLocation.EditorToolbar,
	);
}
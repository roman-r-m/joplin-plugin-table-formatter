import {navigateCell, insertColumn, insertRow, deleteColume} from "./tableCommands";
import TableFormatterBridge from "./tableFormatterBridge";


module.exports = {
    default: function(_context) {
        return {
            plugin: function (CodeMirror) {
                CodeMirror.defineOption("auto_table_tableFormatter", [], async function(cm, val, old) {
                    if (old && old != CodeMirror.Init) {
                        cm.off('keyup', tabPressed);
                    }
                    cm.on('keyup', tabPressed);

                    const commandBridge = new TableFormatterBridge(cm);
                    CodeMirror.defineExtension('auto_table_alignColumns', commandBridge.alignColumnsCommand.bind(commandBridge));
                });

                function tabPressed(cm, event) {
                    if (event.code === 'Tab' && !event.shiftKey) {
                        navigateCell(cm, true, false);
                    } else if (event.code === 'Tab' && event.shiftKey) {
                        navigateCell(cm, true, true);
                    } else if (event.shiftKey && event.ctrlKey && !event.metaKey) {
                        switch (event.code) {
                            case 'ArrowLeft':
                                insertColumn(cm, true);
                                break;
                            case 'ArrowRight':
                                insertColumn(cm, false);
                                break;
                            case 'ArrowUp':
                                insertRow(cm, true);
                                break;
                            case 'ArrowDown':
                                insertRow(cm, false);
                                break;
                            case 'Backspace':
                                deleteColume(cm);
                                break;
                            default:break;
                        }
                    }
                }
            },
            codeMirrorOptions: { 'auto_table_tableFormatter': true },
            assets: function() {
                return [ ];
            }
        }
    },
}

import {Editor} from 'codemirror'
import formatTable from '../lib/FormatTable'
import prettier from 'prettier'

module.exports = {
  default: function (_context: any) {

    const plugin = function (CodeMirror) {
      CodeMirror.defineExtension('formatTable', function () {
        const editor: Editor = this // to get autocomplete working

        let parser = 'markdown' // for JS. Other values: json, typescript, css, scss, less, html (also for xml), yaml or php

        const prettierVersion = prettier.formatWithCursor(
          editor.getValue(),
          {
            parser: parser,
            // plugins: prettierPlugins,
            tabWidth: 2,
            useTabs: false,
            cursorOffset: editor.indexFromPos(editor.getCursor()),
          },
        )

        editor.setValue(prettierVersion.formatted)

        if (false === editor.somethingSelected()) {
          editor.setCursor(editor.posFromIndex(prettierVersion.cursorOffset))
        }
      })
    }

    return {
      plugin: plugin,
    }
  },
}

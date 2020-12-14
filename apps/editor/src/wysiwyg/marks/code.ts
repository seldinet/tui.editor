import { Mark as ProsemirrorMark, DOMOutputSpecArray } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

import Mark from '@/spec/mark';

import { EditorCommand } from '@t/spec';

export class Code extends Mark {
  get name() {
    return 'code';
  }

  get defaultSchema() {
    return {
      attrs: {
        htmlToken: { default: null }
      },
      parseDOM: [{ tag: 'code' }],
      toDOM({ attrs }: ProsemirrorMark): DOMOutputSpecArray {
        return [attrs.htmlToken || 'code'];
      }
    };
  }

  commands(): EditorCommand {
    return () => (state, dispatch) => toggleMark(state.schema.marks.code)(state, dispatch);
  }

  keymaps() {
    const codeCommand = this.commands()();

    return {
      'Shift-Mod-c': codeCommand,
      'Shift-Mod-C': codeCommand
    };
  }
}

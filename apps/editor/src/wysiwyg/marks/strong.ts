import { Mark as ProsemirrorMark, DOMOutputSpecArray } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

import Mark from '@/spec/mark';

import { EditorCommand } from '@t/spec';

export class Strong extends Mark {
  get name() {
    return 'strong';
  }

  get defaultSchema() {
    return {
      attrs: {
        htmlString: { default: false }
      },
      parseDOM: [{ tag: 'b' }, { tag: 'strong' }],
      toDOM({ attrs }: ProsemirrorMark): DOMOutputSpecArray {
        const { htmlString } = attrs;

        return [
          'strong',
          {
            ...(htmlString && { 'data-pass': 'true' })
          }
        ];
      }
    };
  }

  private bold(): EditorCommand {
    return () => (state, dispatch) => toggleMark(state.schema.marks.strong)(state, dispatch);
  }

  commands() {
    return { bold: this.bold() };
  }

  keymaps() {
    const boldCommand = this.bold()();

    return {
      'Mod-b': boldCommand,
      'Mod-B': boldCommand
    };
  }
}

import EditTable from 'slate-edit-table'
import SoftBreak from 'slate-soft-break'

import AlignPlugin from './plugins/AlignPlugin'
import EditListPlugin from './plugins/EditListPlugin'
import KeyPlugin from './plugins/KeyPlugin'
import RenderPlugin from './plugins/RenderPlugin'
import TablePlugin from './plugins/TablePlugin'
import VoidPlugin from './plugins/VoidPlugin'

const TopicConfiguration = {
  plugins: [
    KeyPlugin({
      hotkeys: {
        bold: 'mod+b',
        italic: 'mod+i',
        underline: 'mod+u',
        color_red: 'mod+shift+1',
      },
    }),
    TablePlugin(),
    AlignPlugin(),
    VoidPlugin({ type: 'horizontal-rule', tag: 'hr' }),
    VoidPlugin({ type: 'underbar', tag: 'span', attributes: { className: 'underbar' } }),
    VoidPlugin({ type: 'underbar_l', tag: 'span', attributes: { className: 'underbar_l' } }),
    VoidPlugin({ type: 'underbar_xl', tag: 'span', attributes: { className: 'underbar_xl' } }),
    RenderPlugin(),
    SoftBreak({ shift: true, onlyIn: ['paragraph', 'table_cell'] }),
    EditTable(),
    EditListPlugin,
  ],

  // Enforce no marks on a header
  schema: {
    blocks: {
      'heading-one': {
        marks: [{}],
        nodes: [{ objects: ['text'] }],
      },
      'heading-two': {
        marks: [{}],
        nodes: [{ objects: ['text'] }],
      },
    },
  },
}

export default TopicConfiguration

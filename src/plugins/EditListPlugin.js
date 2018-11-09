import EditList from '@gitbook/slate-edit-list'

const EditListPlugin = EditList({
  types: [
    'ol_list',
    'ul_list',
    'pattern__examples',
    'pattern__conversation',
    'pattern__center',
    'pattern__watchout',
    'pattern__cultural',
    'pattern__note',
  ],
})

export default EditListPlugin

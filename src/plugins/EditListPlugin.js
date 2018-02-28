import EditList from 'slate-edit-list'

const EditListPlugin = EditList({
  types: ['ol_list', 'ul_list', 'pattern_examples', 'pattern_conversation', 'pattern_aside']
})

export default EditListPlugin

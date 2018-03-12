import EditListPlugin from '../plugins/EditListPlugin'

const { unwrapList } = EditListPlugin.changes

const ClearStrategy = (value, mark) => unwrapList(value
  .change()
  .unwrapBlock('heading-one')
  .unwrapBlock('heading-two')
  .setBlock('paragraph'))

export default ClearStrategy

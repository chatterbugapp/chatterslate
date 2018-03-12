const MarkStrategy = (value, mark) => value
  .change()
  .toggleMark(mark)
  .focus()

export default MarkStrategy

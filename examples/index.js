const Chatterslate = require("../dist")
const React = require("react")
const ReactDOM = require("react-dom")

document.addEventListener('DOMContentLoaded', function (event) {
  const props = { ref: (editor) => { global.editor = editor } }
  const element = document.getElementById("example")
  const editor = React.createElement(Chatterslate.TopicEditor, props)
  ReactDOM.render(editor, element)

  const link = document.getElementById('serialize')
  link.onclick = () => {
    const raw = global.editor.serializeHTML()
    console.log(raw)
  }
})

const Chatterslate = require("../dist")
const React = require("react")
const ReactDOM = require("react-dom")

const jsonString = "{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"hi\",\"marks\":[{\"kind\":\"mark\",\"type\":\"bold\",\"data\":{}}]}]}]}]}}"

document.addEventListener('DOMContentLoaded', function (event) {
  const props = {
    className: 'topic-explanation',
    ref: (editor) => { global.editor = editor },
    handleError: (error, info) => { console.warn(error) },
    initialValue: JSON.parse(jsonString),
  }
  const element = document.getElementById("example")
  const editor = React.createElement(Chatterslate.TopicEditor, props)
  ReactDOM.render(editor, element)

  const serializeLink = document.getElementById('serialize')
  serializeLink.onclick = () => {
    const raw = global.editor.serializeHTML()
    console.log(raw)
  }

  const clearLink = document.getElementById('clear')
  clearLink.onclick = () => {
    global.editor.clearStorage()
    window.location.reload()
  }
})

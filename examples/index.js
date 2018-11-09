const Chatterslate = require('../dist')
const Title = require('./Title')
const React = require('react')
const ReactDOM = require('react-dom')

document.addEventListener('DOMContentLoaded', event => {
  const props = {
    initialValue,
    title: React.createElement(Title),
    ref: editor => { global.editor = editor },
    handleError: (error, info) => { console.warn(error) },
    handleEditorChanged: (key) => { console.log("Some changed the editor's data!") },
  }
  const element = document.getElementById('example')
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
    global.editor.setValue(initialValue).then(() => console.log("Loaded!"))
  }
})

const initialValue = {
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [{
      object: 'block', type: 'paragraph', isVoid: false, data: {}, nodes: [{ object: 'text', leaves: [{ object: 'leaf', text: 'hi', marks: [{ object: 'mark', type: 'bold', data: {} }] }] }],
    }],
  },
}

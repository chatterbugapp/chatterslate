const Chatterslate = require('../dist')
const Title = require('./Title')
const React = require('react')
const ReactDOM = require('react-dom')

document.addEventListener('DOMContentLoaded', event => {
  const props = {
    initialValue,
    title: React.createElement(Title),
    ref: editor => { global.editor = editor },
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
    window.location.reload()
  }
})

const initialValue = {
  kind: 'value',
  document: {
    kind: 'document',
    data: {},
    nodes: [{
      kind: 'block', type: 'paragraph', isVoid: false, data: {}, nodes: [{ kind: 'text', leaves: [{ kind: 'leaf', text: 'hi', marks: [{ kind: 'mark', type: 'bold', data: {} }] }] }],
    }],
  },
}

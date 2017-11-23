const Chatterslate = require("../dist")
const React = require("react")
const ReactDOM = require("react-dom")

document.addEventListener('DOMContentLoaded', function (event) {
  const props = {}
  const element = document.getElementById("example")
  ReactDOM.render(React.createElement(Chatterslate.TopicEditor, props), element)
})

import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@gitbook/slate-react'
import { Value } from '@gitbook/slate'

import TopicConfiguration from './TopicConfiguration'
import TopicToolbar from './components/TopicToolbar'
import ErrorBoundary from './components/ErrorBoundary'

const LocalStorageKey = `chatterslate:v1:content:${window.location.pathname}`
const DefaultValue = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [],
      },
    ],
  },
}

class TopicEditor extends React.Component {
  static propTypes = {
    initialValue: PropTypes.object,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.element,
    onError: PropTypes.func,
    onEditorChanged: PropTypes.func,
  }

  static defaultProps = {
    placeholder: 'Teach a topic...',
  }

  constructor (props) {
    super(props)

    this.state = {
      mobileView: false,
      value: Value.fromJSON(props.initialValue || DefaultValue),
      menus: {},
      debug: false,
    }
  }

  /**
   * Load a value into the editor, for example when clearing changes
   *
   * @param {object} value - parsed into a SlateJS {Value}
   * @return {Promise} - fired after the editor has finished setting this value
   */
  setValue (value) {
    return new Promise(resolve => {
      this.setState({ value: Value.fromJSON(value) }, () => { resolve() })
    })
  }

  /**
   * On change, save the new `value`, and hide the color menu
   *
   * @param {Change} change
   */
  handleChange = ({ value }) => {
    const jsonContent = JSON.stringify(value.toJSON())

    if (this.state.debug) {
      console.log(jsonContent)
    }

    if (value.document !== this.state.value.document) {
      if (this.props.onEditorChanged) {
        this.props.onEditorChanged.call(LocalStorageKey)
      }
    }

    this.setState({
      value,
      menus: {},
    })
  }

  handleClickUndo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().undo()
    this.handleChange(change)
  }

  handleClickRedo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().redo()
    this.handleChange(change)
  }

  handleMenuToggle = (event, type) => {
    event.preventDefault()
    const menus = {}
    if (!this.state.menus[type]) {
      menus[type] = true
    }
    this.setState({ menus })
  }

  handleMobileToggle = event => {
    event.preventDefault()
    this.setState({ mobileView: !this.state.mobileView })
  }

  render () {
    const {
      title, onError, placeholder, className,
    } = this.props
    const { menus, mobileView, value } = this.state
    return (
      <ErrorBoundary onError={onError}>
        <div className={`chatterslate ${mobileView ? 'chatterslate_mobile' : ''}`}>
          <TopicToolbar
            menus={menus}
            mobileView={mobileView}
            value={value}
            onChange={this.handleChange}
            onMenuToggle={this.handleMenuToggle}
            onMobileToggle={this.handleMobileToggle}
            onClickUndo={this.handleClickUndo}
            onClickRedo={this.handleClickRedo}
          />
          {title}
          <div className="editor" ref={editor => { this.editor = editor }}>
            <Editor
              placeholder={placeholder}
              className={className}
              value={value}
              onChange={this.handleChange}
              plugins={TopicConfiguration.plugins}
              schema={TopicConfiguration.schema}
              autoFocus
              spellCheck
            />
          </div>
        </div>
      </ErrorBoundary>
    )
  }

  // Public: Export JSON!
  serializeJSON = () => {
    return this.state.value.toJSON()
  };

  // Public: Export HTML from what the editor renders.
  // Avoid using slate-html-serializer for now, but may need to soon.
  serializeHTML = () => {
    return this.editor.querySelector('[data-slate-editor]').innerHTML
  };

  // Deprecated! Public: Reset local storage, usually after the editor has saved via the DB
  clearStorage = () => {
    console.warn('Deprecated! No longer trusting localStorage.')
  }
}

export { TopicEditor }

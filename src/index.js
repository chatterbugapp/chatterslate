import { Editor } from 'slate-react'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import React from 'react'

const initialValue = {
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
}

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')

/**
 * The rich text example.
 *
 * @type {Component}
 */
class TopicEditor extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue),
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  };

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type)
      } else {
        change.setBlock('list-item').wrapBlock(type)
      }
    }

    this.onChange(change)
  };

  /**
   * When a void button is clicked, insert an element.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickVoid = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()

    change.insertInline({
      type,
      isVoid: true,
    })

    this.onChange(change)
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render () {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'bold', 'Bold')}
        {this.renderMarkButton('italic', 'italic', 'Italic')}
        {this.renderMarkButton('underlined', 'underline', 'Underline')}
        {this.renderBlockButton('block-quote', 'quote-right', 'Block Quote')}
        {this.renderBlockButton('numbered-list', 'list-ol', 'Numbered List')}
        {this.renderBlockButton('bulleted-list', 'list-ul', 'Bulleted List')}
        {this.renderBlockButton('heading-one', 'angle-double-up', 'Heading One')}
        {this.renderBlockButton('heading-two', 'angle-up', 'Heading Two')}
        {this.renderVoidButton('horizontal-rule', 'minus', 'Horizontal Rule')}
      </div>
    )
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon, title) => {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      <button className="button" title={title} onMouseDown={onMouseDown} data-active={isActive}>
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </button>
    )
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon, title) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = event => this.onClickBlock(event, type)

    return (
      <button className="button" title={title} onMouseDown={onMouseDown} data-active={isActive}>
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </button>
    )
  };

  /**
   * Render a void element toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderVoidButton = (type, icon, title) => {
    const onMouseDown = event => this.onClickVoid(event, type)

    return (
      <button className="button" title={title} onMouseDown={onMouseDown}>
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </button>
    )
  };

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          placeholder="Teach a topic..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          spellCheck
        />
      </div>
    )
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} nodeProps
   * @return {Element}
   */

  renderNode = nodeProps => {
    const { attributes, children, node } = nodeProps
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'horizontal-rule':
        return <hr />
      default:
        return null
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} markProps
   * @return {Element}
   */

  renderMark = markProps => {
    const { children, mark } = markProps
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
      default:
        return null
    }
  };
}

/**
 * Export.
 */

export { TopicEditor }

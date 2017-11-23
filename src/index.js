import { Editor } from 'slate-react'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import React from 'react'

import ToolbarButton from './components/ToolbarButton'

const initialValue = {
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: []
      },
    ],
  },
}

import Mark from './plugins/Mark'
const plugins = [
  Mark.MarkPlugin({ mark: 'bold', tag: 'strong', hotkey: 'mod+b' }),
  Mark.MarkPlugin({ mark: 'italic', tag: 'em', hotkey: 'mod+i' }),
  Mark.MarkPlugin({ mark: 'underline', tag: 'u', hotkey: 'mod+u' })
]

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'
const DEFAULT_COLOR = 'black'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

//const isBoldHotkey = isKeyHotkey('mod+b')
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
    displayColorMenu: 'none',
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

   /*
  onKeyDown = (event, change) => {
    let mark

    //if (isBoldHotkey(event)) {
      //mark = 'bold'
    //} else if (isItalicHotkey(event)) {
    if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
  };
  */

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
   * On undo in history.
   *
   */

  onClickUndo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().undo()
    this.onChange(change)
  }

  /**
   * On redo in history.
   *
   */

  onClickRedo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().redo()
    this.onChange(change)
  }

  /**
   * Check whether the current selection has a color in it.
   *
   * @return {Boolean} hasColor
   */

  hasAnyColor = () => {
    const { value } = this.state
    return value.marks.some(mark => mark.type === 'color')
  }

  hasColor = color => {
    const { value } = this.state
    return value.marks.some(mark => mark.type === 'color' && mark.data.get('color') === color)
  }

  onClickColorMenu = event => {
    event.preventDefault()
    const { displayColorMenu } = this.state
    if (displayColorMenu === 'none') {
      this.setState({ displayColorMenu: 'block' })
    } else {
      this.setState({ displayColorMenu: 'none' })
    }
  }

  /**
   * When clicking a color block, if the selection has a color in it, remove it.
   * Otherwise, add a new color!
   * @param {Event} event
   */
  onClickColor = (event, color) => {
    event.preventDefault()
    const { value } = this.state
    const hasAnyColor = this.hasAnyColor()
    const change = value.change()

    // Adapted from https://github.com/nossas/slate-editor/blob/master/lib/plugins/slate-color-plugin/ColorUtils.js
    if (hasAnyColor) {
      if (value.isExpanded) {
        value.marks.filter(mark => mark.type === 'color').forEach(mark => {
          change.removeMark(mark)
        })

        if (color !== DEFAULT_COLOR) {
          change.addMark({ type: 'color', data: { color } }).focus()
        }
      }
    } else if (value.isExpanded && color !== DEFAULT_COLOR) {
      change.addMark({ type: 'color', data: { color } }).focus()
    }

    // hide menu
    this.setState({ displayColorMenu: 'none' })
    this.onChange(change)
  }

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
        {this.renderBlockButton('block-quote', 'quote-right', 'Block Quote')}
        {this.renderBlockButton('numbered-list', 'list-ol', 'Numbered List')}
        {this.renderBlockButton('bulleted-list', 'list-ul', 'Bulleted List')}
        {this.renderBlockButton('heading-one', 'angle-double-up', 'Heading One')}
        {this.renderBlockButton('heading-two', 'angle-up', 'Heading Two')}
        <ToolbarButton icon="eyedropper" title="Font Color" onMouseDown={this.onClickColorMenu} />
        <div className="color-menu" style={{ display: this.state.displayColorMenu }}>
          <div className="menu">
            {this.renderColorButton(DEFAULT_COLOR, 'font', 'Black')}
            {this.renderColorButton('#cccccc', 'font', 'Grey')}
            {this.renderColorButton('#555555', 'font', 'Dark Grey')}
          </div>
          <div className="menu">
            {this.renderColorButton('#FD4242', 'font', 'Red')}
            {this.renderColorButton('#FEDA32', 'font', 'Yellow')}
            {this.renderColorButton('#25CCED', 'font', 'Blue')}
          </div>
          <div className="menu">
            {this.renderColorButton('#25CCED', 'mars', 'Male')}
            {this.renderColorButton('#FD426E', 'venus', 'Female')}
            {this.renderColorButton('#B3B3B3', 'neuter', 'Neuter')}
          </div>
          <div className="menu">
            {this.renderColorButton('#00E6C2', 'arrows-h', 'Dative')}
            {this.renderColorButton('#baa2ee', 'times', 'Accusative')}
          </div>
        </div>
        {this.renderVoidButton('horizontal-rule', 'minus', 'Horizontal Rule')}
        <ToolbarButton icon="undo" title="Undo" onMouseDown={this.onClickUndo} />
        <ToolbarButton icon="repeat" title="Redo" onMouseDown={this.onClickRedo} />
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        <Mark.MarkButton mark="bold" icon="bold" title="Bold" value={this.state.value} onChange={this.onChange} />
        <Mark.MarkButton mark="italic" icon="italic" title="Italic" value={this.state.value} onChange={this.onChange} />
        <Mark.MarkButton mark="underline" icon="underline" title="Underline" value={this.state.value} onChange={this.onChange} />
      </div>
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

    return (<ToolbarButton
      icon={icon}
      title={title}
      onMouseDown={onMouseDown}
      data-active={isActive}
    />)
  };

  renderColorButton = (color, icon, title) => {
    const isActive = this.hasColor(color)
    const onMouseDown = event => this.onClickColor(event, color)

    return (<ToolbarButton
      icon={icon}
      title={title}
      onMouseDown={onMouseDown}
      style={{ color }}
      data-active={isActive}
    />)
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

    return <ToolbarButton icon={icon} title={title} onMouseDown={onMouseDown} />
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
          plugins={plugins}
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
      // case 'color': {
      //  const { data } = node
      //  const color = data.get('color')
      //  return <span {...attributes} style={{color}}>{children}</span>
      // }
      default:
        return null
    }
  };
}

/**
 * Export.
 */

export { TopicEditor }

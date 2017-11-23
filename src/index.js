import { Editor } from 'slate-react'
import { Value } from 'slate'
import React from 'react'
import ToolbarButton from './components/ToolbarButton'

import Mark from './plugins/Mark'
import Block from './plugins/Block'
const plugins = [
  Mark.MarkPlugin({ mark: 'bold', tag: 'strong', hotkey: 'mod+b' }),
  Mark.MarkPlugin({ mark: 'italic', tag: 'em', hotkey: 'mod+i' }),
  Mark.MarkPlugin({ mark: 'underline', tag: 'u', hotkey: 'mod+u' }),
  Block.BlockPlugin({ block: 'block-quote', tag: 'blockquote' }),
  Block.BlockPlugin({ block: 'numbered-list', tag: 'ol' }),
  Block.BlockPlugin({ block: 'bulleted-list', tag: 'ul' }),
  Block.BlockPlugin({ block: 'list-item', tag: 'li' }),
  Block.BlockPlugin({ block: 'heading-one', tag: 'h1' }),
  Block.BlockPlugin({ block: 'heading-two', tag: 'h2' }),
]

const DEFAULT_COLOR = 'black'
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


/**
 * Our editor!
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
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
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
        <Block.BlockButton block="block-quote" icon="quote-right" title="Block Quote" value={this.state.value} onChange={this.onChange} />
        <Block.BlockButton block="heading-one" icon="angle-double-up" title="Heading One" value={this.state.value} onChange={this.onChange} />
        <Block.BlockButton block="heading-two" icon="angle-up" title="Heading Two" value={this.state.value} onChange={this.onChange} />
        <Block.BlockButton block="numbered-list" icon="list-ol" title="Numbered List" value={this.state.value} onChange={this.onChange} />
        <Block.BlockButton block="bulleted-list" icon="list-ul" title="Bulleted List" value={this.state.value} onChange={this.onChange} />
      </div>
    )
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
}

/**
 * Export.
 */

export { TopicEditor }

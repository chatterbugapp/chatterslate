/* global localStorage */
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import EditTable from '@chatterbug/slate-edit-table'
import SoftBreak from 'slate-soft-break'

import ToolbarButton from './components/ToolbarButton'
import ToolbarMenu from './components/ToolbarMenu'
import TableToolbarMenu from './components/TableToolbarMenu'

import { MarkPlugin, MarkButton } from './plugins/Mark'
import { BlockPlugin, BlockButton } from './plugins/Block'
import { VoidPlugin, VoidButton } from './plugins/Void'
import { ColorButton } from './plugins/Color'
import { PlainButton } from './plugins/Plain'
import { TablePlugin, TableButton } from './plugins/Table'

const LocalStorageKey = `chatterslate:v1:content:${window.location.pathname}`
const EditTablePlugin = EditTable()

const plugins = [
  MarkPlugin({ hotkeys: { bold: 'mod+b', italic: 'mod+i', underline: 'mod+u' } }),
  BlockPlugin({ block: 'align-left', tag: 'div', attributes: { style: { textAlign: 'left' } } }),
  BlockPlugin({ block: 'align-center', tag: 'div', attributes: { style: { textAlign: 'center' } } }),
  BlockPlugin({ block: 'align-right', tag: 'div', attributes: { style: { textAlign: 'right' } } }),
  BlockPlugin({ block: 'numbered-list', tag: 'ol' }),
  BlockPlugin({ block: 'bulleted-list', tag: 'ul' }),
  BlockPlugin({ block: 'list-item', tag: 'li' }),
  BlockPlugin({ block: 'heading-one', tag: 'h1' }),
  BlockPlugin({ block: 'heading-two', tag: 'h2' }),
  VoidPlugin({ type: 'horizontal-rule', tag: 'hr' }),
  VoidPlugin({ type: 'underbar', tag: 'span', attributes: { className: 'underbar' } }),
  VoidPlugin({ type: 'underbar_l', tag: 'span', attributes: { className: 'underbar_l' } }),
  VoidPlugin({ type: 'underbar_xl', tag: 'span', attributes: { className: 'underbar_xl' } }),
  SoftBreak({ shift: true }),
  TablePlugin({ type: 'arrow' }),
  EditTablePlugin,
]

const defaultValue = {
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [],
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
  static propTypes = {
    initialValue: PropTypes.object,
  }

  constructor (props) {
    super(props)

    const existingValue = JSON.parse(localStorage.getItem(LocalStorageKey))
    this.state = {
      value: Value.fromJSON(existingValue || props.initialValue || defaultValue),
      menus: {},
      debug: false,
    }
  }

  /**
   * On change, save the new `value`, and hide the color menu
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    const jsonContent = JSON.stringify(value.toJSON())

    if (this.state.debug) {
      console.log(jsonContent)
    }

    if (value.document !== this.state.value.document) {
      localStorage.setItem(LocalStorageKey, jsonContent)
    }

    this.setState({
      value,
      menus: {},
    })
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
   * Keeping menu state top-level
   *
   */

  onMenuToggle = (event, type) => {
    event.preventDefault()
    const menus = {}
    if (!this.state.menus[type]) {
      menus[type] = true
    }
    this.setState({ menus })
  }

  /**
   * Render the toolbar.
   *

   * @return {Element}
   */

  renderToolbar = () => {
    const insideTable = EditTablePlugin.utils.isSelectionInTable(this.state.value)
    const sharedProps = { value: this.state.value, onChange: this.onChange, insideTable }
    const menuProps = { menus: this.state.menus, onMenuToggle: this.onMenuToggle }

    return (
      <div className="menu toolbar-menu">
        <MarkButton mark="bold" icon="bold" title="Bold" {...sharedProps} />
        <MarkButton mark="italic" icon="italic" title="Italic" {...sharedProps} />
        <MarkButton mark="underline" icon="underline" title="Underline" {...sharedProps} />
        <MarkButton mark="strikethrough" icon="strikethrough" title="Strikethrough" {...sharedProps} />
        <div className="separator" />
        <BlockButton block="align-left" icon="align-left" title="Left Align" {...sharedProps} />
        <BlockButton block="align-center" icon="align-center" title="Center Align" {...sharedProps} />
        <BlockButton block="align-right" icon="align-right" title="Right Align" {...sharedProps} />
        <BlockButton block="heading-one" icon="angle-double-up" title="Heading One" {...sharedProps} />
        <BlockButton block="heading-two" icon="angle-up" title="Heading Two" {...sharedProps} />
        <BlockButton block="numbered-list" icon="list-ol" title="Numbered List" {...sharedProps} />
        <BlockButton block="bulleted-list" icon="list-ul" title="Bulleted List" {...sharedProps} />
        <div className="separator" />
        <ToolbarMenu type="color" icon="eyedropper" title="Font Color" {...menuProps}>
          <div className="menu">
            <ColorButton color="black" icon="font" title="Block" {...sharedProps} />
            <ColorButton color="grey" icon="font" title="Grey" {...sharedProps} />
            <ColorButton color="darkgrey" icon="font" title="Dark Grey" {...sharedProps} />
          </div>
          <div className="menu">
            <ColorButton color="red" icon="font" title="Red" {...sharedProps} />
            <ColorButton color="yellow" icon="font" title="Yellow" {...sharedProps} />
            <ColorButton color="blue" icon="font" title="Blue" {...sharedProps} />
          </div>
          <div className="menu">
            <ColorButton color="male" icon="font" title="Male" {...sharedProps} />
            <ColorButton color="female" icon="font" title="Female" {...sharedProps} />
            <ColorButton color="neuter" icon="font" title="Neuter" {...sharedProps} />
          </div>
          <div className="menu">
            <ColorButton color="dative" icon="font" title="Dative" {...sharedProps} />
            <ColorButton color="accusative" icon="font" title="Accusative" {...sharedProps} />
          </div>
        </ToolbarMenu>
        <ToolbarMenu type="character" icon="keyboard-o" title="Character Map" {...menuProps}>
          <div className="menu">
            <PlainButton text="←" title="Left Arrow" {...sharedProps} />
            <PlainButton text="→" title="Right Arrow" {...sharedProps} />
            <PlainButton text="↔" title="Left Right Arrow" {...sharedProps} />
            <PlainButton text="⇐" title="Leftwards Double Arrow" {...sharedProps} />
            <PlainButton text="⇒" title="Rightwards Double Arrow" {...sharedProps} />
          </div>
          <div className="menu">
            <PlainButton text="…" title="Ellipsis" {...sharedProps} />
            <PlainButton text="«" title="Double Low Quote" {...sharedProps} />
            <PlainButton text="»" title="Double High Quote" {...sharedProps} />
            <PlainButton text="„" title="Double Angle Left Quote" {...sharedProps} />
            <PlainButton text="”" title="Double Angle Right Quote" {...sharedProps} />
          </div>
        </ToolbarMenu>
        <ToolbarMenu type="rule" icon="reorder" title="Rules" {...menuProps}>
          <VoidButton type="underbar" text="4: ____" title="Small Space" {...sharedProps} />
          <VoidButton type="underbar_l" text="6: ______" title="Medium Space" {...sharedProps} />
          <VoidButton type="underbar_xl" text="8: ________" title="Large Space" {...sharedProps} />
          <VoidButton type="horizontal-rule" text="HR: ———————" title="Horizontal Rule" {...sharedProps} />
        </ToolbarMenu>
        <ToolbarMenu type="patterns" icon="graduation-cap" title="Patterns" {...menuProps}>
          <TableButton type="arrow" icon="arrow-right" title="Arrow Table" {...sharedProps} />
          <TableButton type="conversation" icon="comments" title="Conversation" {...sharedProps} />
          <TableButton type="middle" icon="th-large" title="Middle Table" {...sharedProps} />
        </ToolbarMenu>
        <div className="separator" />
        <ToolbarButton icon="undo" title="Undo" onMouseDown={this.onClickUndo} />
        <ToolbarButton icon="repeat" title="Redo" onMouseDown={this.onClickRedo} />
        {insideTable && <TableToolbarMenu plugin={EditTablePlugin} {...sharedProps} />}
      </div>
    )
  };

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="editor" ref={editor => { this.editor = editor }}>
        <Editor
          placeholder="Teach a topic..."
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
          autoFocus
          spellCheck
        />
      </div>
    )
  };

  // Public: Export JSON!
  serializeJSON = () => {
    return this.state.value.toJSON()
  };

  // Public: Export HTML from what the editor renders.
  // Avoid using slate-html-serializer for now, but may need to soon.
  serializeHTML = () => {
    return this.editor.querySelector('[data-slate-editor]').innerHTML
  };

  // Public: Reset local storage, usually after the editor has saved via the DB
  clearStorage = () => {
    localStorage.removeItem(LocalStorageKey)
  }
}

/**
 * Export.
 */

export { TopicEditor }

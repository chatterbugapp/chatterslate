/* global localStorage */
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import EditTable from 'slate-edit-table'
import EditList from 'slate-edit-list'
import SoftBreak from 'slate-soft-break'
import TrailingBlock from 'slate-trailing-block'

import ToolbarButton from './components/ToolbarButton'
import ToolbarMenu from './components/ToolbarMenu'
import TableToolbarMenu from './components/TableToolbarMenu'
import PatternButton from './components/PatternButton'
import DefaultValue from './blocks/default'

import { MarkPlugin, MarkButton } from './plugins/Mark'
import { BlockPlugin, BlockButton } from './plugins/Block'
import { VoidPlugin, VoidButton } from './plugins/Void'
import { TablePlugin } from './plugins/Table'
import { ColorButton } from './plugins/Color'
import { PlainButton } from './plugins/Plain'
import { AlignButton, AlignPlugin } from './plugins/Align'
import { ListBlockButton } from './plugins/ListBlock'

const LocalStorageKey = `chatterslate:v1:content:${window.location.pathname}`
const EditTablePlugin = EditTable()
const EditListPlugin = EditList()

const plugins = [
  MarkPlugin({ hotkeys: { bold: 'mod+b', italic: 'mod+i', underline: 'mod+u' } }),
  TablePlugin(),
  AlignPlugin(),
  BlockPlugin({ block: 'ol_list', tag: 'ol' }),
  BlockPlugin({ block: 'ul_list', tag: 'ul' }),
  BlockPlugin({ block: 'list_item', tag: 'li' }),
  BlockPlugin({ block: 'heading-one', tag: 'h1' }),
  BlockPlugin({ block: 'heading-two', tag: 'h2' }),
  VoidPlugin({ type: 'horizontal-rule', tag: 'hr' }),
  VoidPlugin({ type: 'underbar', tag: 'span', attributes: { className: 'underbar' } }),
  VoidPlugin({ type: 'underbar_l', tag: 'span', attributes: { className: 'underbar_l' } }),
  VoidPlugin({ type: 'underbar_xl', tag: 'span', attributes: { className: 'underbar_xl' } }),
  SoftBreak({ shift: true }),
  EditListPlugin,
  EditTablePlugin,
  TrailingBlock(),
]

/**
 * Our editor!
 *
 * @type {Component}
 */
class TopicEditor extends React.Component {
  static propTypes = {
    initialValue: PropTypes.object,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.element,
  }

  static defaultProps = {
    placeholder: 'Teach a topic...',
  }

  constructor (props) {
    super(props)

    const existingValue = JSON.parse(localStorage.getItem(LocalStorageKey))
    this.state = {
      value: Value.fromJSON(existingValue || props.initialValue || DefaultValue),
      menus: {},
      debug: false,
    }
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

  handleClickUndo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().undo()
    this.handleChange(change)
  }

  /**
   * On redo in history.
   *
   */

  handleClickRedo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().redo()
    this.handleChange(change)
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render () {
    const { title } = this.props
    return (
      <div>
        {this.renderToolbar()}
        {title}
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
    const sharedProps = { value: this.state.value, onChange: this.handleChange, insideTable }
    const menuProps = { menus: this.state.menus, onMenuToggle: this.onMenuToggle }

    return (
      <div className="menu toolbar-menu">
        <MarkButton mark="bold" icon="bold" title="Bold" {...sharedProps} />
        <MarkButton mark="italic" icon="italic" title="Italic" {...sharedProps} />
        <MarkButton mark="underline" icon="underline" title="Underline" {...sharedProps} />
        <MarkButton mark="strikethrough" icon="strikethrough" title="Strikethrough" {...sharedProps} />
        <div className="separator" />
        <AlignButton align="left" icon="align-left" title="Left Align" {...sharedProps} />
        <AlignButton align="center" icon="align-center" title="Center Align" {...sharedProps} />
        <AlignButton align="right" icon="align-right" title="Right Align" {...sharedProps} />
        <BlockButton block="heading-one" icon="angle-double-up" title="Heading One" {...sharedProps} />
        <BlockButton block="heading-two" icon="angle-up" title="Heading Two" {...sharedProps} />
        <ListBlockButton block="ol_list" icon="list-ol" title="Numbered List" plugin={EditListPlugin} {...sharedProps} />
        <ListBlockButton block="ul_list" icon="list-ul" title="Bulleted List" plugin={EditListPlugin} {...sharedProps} />
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
          <PatternButton type="arrow" icon="arrow-right" title="Arrow Table" {...sharedProps} />
          <PatternButton type="middle" icon="th-large" title="Middle-Align Table" {...sharedProps} />
          <PatternButton type="three" icon="table" title="Three Column Table" {...sharedProps} />
          <PatternButton type="conversation" icon="comments" title="Conversation" {...sharedProps} />
          <PatternButton type="examples" icon="lightbulb-o" title="Examples" {...sharedProps} />
        </ToolbarMenu>
        <div className="separator" />
        <ToolbarButton icon="undo" title="Undo" onMouseDown={this.handleClickUndo} />
        <ToolbarButton icon="repeat" title="Redo" onMouseDown={this.handleClickRedo} />
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
    const { placeholder, className } = this.props
    return (
      <div className="editor" ref={editor => { this.editor = editor }}>
        <Editor
          placeholder={placeholder}
          className={className}
          value={this.state.value}
          onChange={this.handleChange}
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

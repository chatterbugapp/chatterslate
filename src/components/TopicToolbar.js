import React from 'react'
import PropTypes from 'prop-types'
import SlateEditTable from 'slate-edit-table'
import EditListPlugin from '../plugins/EditListPlugin'

import AlignButton from './AlignButton'
import BlockButton from './BlockButton'
import ColorButton from './ColorButton'
import ListItemButton from './ListItemButton'
import ListBlockButton from './ListBlockButton'
import MarkButton from './MarkButton'
import PlainButton from './PlainButton'
import ToolbarButton from './ToolbarButton'
import ToolbarMenu from './ToolbarMenu'
import TableToolbarMenu from './TableToolbarMenu'
import TableButton from './TableButton'
import VoidButton from './VoidButton'

const { isSelectionInTable } = SlateEditTable().utils
const { isSelectionInList, getCurrentList } = EditListPlugin.utils

const renderPatterns = sharedProps => {
  return (
    <div>
      <BlockButton block="paragraph" icon="paragraph" title="Paragraph" {...sharedProps} />
      <BlockButton block="heading-one" icon="angle-double-up" title="Header One" {...sharedProps} />
      <BlockButton block="heading-two" icon="angle-up" title="Header Two" {...sharedProps} />
      <ListBlockButton block="pattern_examples" icon="lightbulb-o" text="Examples" {...sharedProps} />
      <ListBlockButton block="pattern_conversation" icon="comments" text="Conversation" {...sharedProps} />
      <ListBlockButton block="pattern_aside" data={{ className: 'center' }} icon="book" text="Centered Aside" {...sharedProps} />
      <ListBlockButton block="pattern_aside" data={{ className: 'watchout' }} icon="exclamation-triangle" text="Watch Out Aside" {...sharedProps} />
      <ListBlockButton block="pattern_aside" data={{ className: 'cultural' }} icon="globe" text="Cultural Aside" {...sharedProps} />
      <ListBlockButton block="pattern_aside" data={{ className: 'note' }} icon="sticky-note" text="Note Aside" {...sharedProps} />
    </div>
  )
}

const renderInExamples = sharedProps => {
  return (
    <div>
      <ListItemButton data={{ className: 'text' }} icon="sign-language" title="Examples Text" {...sharedProps} />
      <ListItemButton data={{ className: 'translation' }} icon="american-sign-language-interpreting" title="Examples Translation" {...sharedProps} />
    </div>
  )
}

const renderInConversation = sharedProps => {
  return (
    <div>
      <ListItemButton data={{ className: 'student' }} icon="user" title="Student" {...sharedProps} />
      <ListItemButton data={{ className: 'tutor' }} icon="user" title="Tutor" {...sharedProps} />
    </div>
  )
}

const TopicToolbar = ({
  menus, value, mobileView, onChange, onMenuToggle, onMobileToggle, onClickUndo, onClickRedo,
}) => {
  const insideTable = isSelectionInTable(value)
  const insideList = isSelectionInList(value)
  let insideExamples = false
  let insideConversation = false
  if (insideList) {
    const currentList = getCurrentList(value)
    insideExamples = currentList.type === 'pattern_examples'
    insideConversation = currentList.type === 'pattern_conversation'
  }
  const sharedProps = {
    value, onChange, insideTable, insideList,
  }
  const menuProps = { menus, onMenuToggle }

  return (
    <div className="menu toolbar-menu">
      <div className="toolbar-menu__right">
        <ToolbarButton
          title="View as in mobile app"
          text="mobile"
          active={mobileView}
          onMouseDown={onMobileToggle}
        />
      </div>
      <div className="toolbar-menu__left">
        <MarkButton mark="bold" icon="bold" title="Bold" {...sharedProps} />
        <MarkButton mark="italic" icon="italic" title="Italic" {...sharedProps} />
        <MarkButton mark="underline" icon="underline" title="Underline" {...sharedProps} />
        <MarkButton mark="strikethrough" icon="strikethrough" title="Strikethrough" {...sharedProps} />
        <MarkButton mark="learningLanguage" icon="language" title="Learning Language" {...sharedProps} />
        <div className="separator" />
        <AlignButton align="left" icon="align-left" title="Left Align" {...sharedProps} />
        <AlignButton align="center" icon="align-center" title="Center Align" {...sharedProps} />
        <AlignButton align="right" icon="align-right" title="Right Align" {...sharedProps} />
        <ListBlockButton block="ol_list" icon="list-ol" title="Numbered List" {...sharedProps} />
        <ListBlockButton block="ul_list" icon="list-ul" title="Bulleted List" {...sharedProps} />
        <div className="separator" />
        <ToolbarMenu type="color" icon="eyedropper" title="Font Color" {...menuProps}>
          <div className="menu">
            <ColorButton color="black" icon="font" title="Black" {...sharedProps} />
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
        <ToolbarMenu type="tables" icon="table" title="Tables" {...menuProps}>
          <TableButton type="table_arrow" icon="arrow-right" title="Arrow Table" {...sharedProps} />
          <TableButton type="table_two" icon="th-large" title="Two Column Table" {...sharedProps} />
          <TableButton type="table_three" icon="table" title="Three Column Table" {...sharedProps} />
          {insideTable && <TableToolbarMenu {...sharedProps} />}
        </ToolbarMenu>
        <ToolbarMenu type="patterns" icon="paint-brush" title="Patterns" {...menuProps}>
          {insideExamples && renderInExamples(sharedProps)}
          {insideConversation && renderInConversation(sharedProps)}
          {!insideTable && !insideList && renderPatterns(sharedProps)}
        </ToolbarMenu>
        <div className="separator" />
        <ToolbarButton icon="undo" title="Undo" onMouseDown={onClickUndo} />
        <ToolbarButton icon="repeat" title="Redo" onMouseDown={onClickRedo} />
      </div>
    </div>
  )
}

TopicToolbar.propTypes = {
  menus: PropTypes.object.isRequired,
  mobileView: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  onMobileToggle: PropTypes.func.isRequired,
  onClickUndo: PropTypes.func.isRequired,
  onClickRedo: PropTypes.func.isRequired,
}

export default TopicToolbar

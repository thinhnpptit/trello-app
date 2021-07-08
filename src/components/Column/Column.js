import React, { useState, useEffect } from 'react'
import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'untilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'untilities/constants'
import {
  selectAllInlineText,
  saveContentAfterPressEnter
} from 'untilities/contentEditable'

export default function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const [columnTitle, setColumnTitle] = useState('')

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      // remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value)
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size='sm'
            type='text'
            placeholder='Enter column title...'
            className='content-editable'
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onClick={selectAllInlineText}
            spellCheck='false'
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle
              variant='primary'
              id='dropdown-basic'
              size='sm'
              className='dropdown-btn'
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column
              </Dropdown.Item>
              <Dropdown.Item>Move all cards in this column</Dropdown.Item>
              <Dropdown.Item>Archive all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <ul className='card-list'>
        <Container
          // onDragStart={(e) => console.log('drag started', e)}
          // onDragEnd={(e) => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id)
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id)
          // }}
          // onDropReady={(p) => console.log('Drop ready: ', p)}
          groupName='col'
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </ul>
      <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon'>Add another card</i>
        </div>
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title='Remove column'
        content={`Are you sure you want to remove <strong>${column.title}!</strong> <br/>All related cards will also be removed`}
      />
    </div>
  )
}

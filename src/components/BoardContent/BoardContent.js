import React, { useState, useEffect, useRef, useCallback } from 'react'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import {
  Container as BSContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'untilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from 'untilities/dragDrop'

export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const newColumnInputRef = useRef(null)

  const onNewColumnTitleChange = useCallback((e) => {
    setNewColumnTitle(e.target.value)
  }, [])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    if (boardFromDB) {
      setBoard(boardFromDB)
      //  sort column
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return (
      <div className='not-found' style={{ padding: '10px', color: 'white' }}>
        Board Not Found
      </div>
    )
  }

  const onColumnDrop = (dropResult) => {
    // console.log(dropResult)
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column.id)
    newBoard.columns = newColumns
    // console.log(newBoard)

    setColumns(newColumns)
    setBoard(newBoard)
  }
  // pass props onCardDrop from child to parent compenent
  const onCardDrop = (columnId, dropResult) => {
    // only processing columns is related to drag drop
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find((c) => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id)

      setColumns(newColumns)
      // console.log(currentColumn)
      // console.log(columnId)
      // console.log(dropResult)
    }
  }

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), // 5 random character will remove when implementing code api
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)
    // update new columns
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }

  return (
    <div className='board-content'>
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector='.column-drag-handle'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>

      <BSContainer className='trello-container'>
        {!openNewColumnForm && (
          <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
              <i className='fa fa-plus icon'>Add another card</i>
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Enter column title...'
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === 'Enter' && addNewColumn()}
              />
              <Button variant='success' size='sm' onClick={addNewColumn}>
                Add column
              </Button>
              <span
                className='cancel-new-column'
                onClick={toggleOpenNewColumnForm}
              >
                <i className='fa fa-trash icon'></i>
              </span>
            </Col>
          </Row>
        )}
      </BSContainer>
    </div>
  )
}

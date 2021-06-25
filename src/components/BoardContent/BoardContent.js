import React, { useState, useEffect } from 'react'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'untilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from 'untilities/dragDrop'

export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

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
      <div className='add-new-column'>
        <i className='fa fa-plus icon'>Add another card</i>
      </div>
    </div>
  )
}

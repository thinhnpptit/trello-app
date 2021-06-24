import React, { useState, useEffect } from 'react';
import './BoardContent.scss';
import Column from 'components/Column/Column';

import { initialData } from 'actions/initialData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'untilities/sorts';

export default function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      //  sort column
      // boardFromDB.columns.sort((a, b) => {
      //   return (
      //     boardFromDB.columnOrder.indexOf(a.id) -
      //     boardFromDB.columnOrder.indexOf(b.id)
      //   );
      // });
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
    }
  }, []);

  if (isEmpty(board)) {
    return (
      <div className='not-found' style={{ padding: '10px', color: 'white' }}>
        Board Not Found
      </div>
    );
  }

  return (
    <div className='board-content'>
      {columns?.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
}

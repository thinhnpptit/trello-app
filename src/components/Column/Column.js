import React from 'react';
import './Column.scss';
import Task from 'components/Task/Task';
import { mapOrder } from 'untilities/sorts';

export default function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  return (
    <div className='column'>
      <header>{column.title}</header>
      <ul>
        {cards.map((card, index) => (
          <Task key={index} card={card} />
        ))}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

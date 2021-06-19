import React from 'react';
import './Column.scss';
import Task from 'components/Task/Task';

export default function Column() {
  return (
    <div className='column'>
      <header>Brainstorm</header>
      <ul>
        <Task />
        <li>Add what you'd like to work on below</li>
        <li>Add what you'd like to work on below</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

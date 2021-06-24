import React from 'react';
import './Task.scss';

const Task = (props) => {
  const { card } = props;

  return (
    <li>
      {card.cover && (
        <img src={card.cover} className='card-cover' alt='image card' />
      )}
      {card.title}
    </li>
  );
};

export default Task;
